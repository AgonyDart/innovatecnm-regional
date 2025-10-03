from fastapi import APIRouter, Depends, HTTPException, WebSocket
from sqlalchemy.orm import Session
from ..schemas import schemas
from ..services.database import get_db
from .. import models

# simulated data
from datetime import datetime, timezone
import random
import uuid
import json
import asyncio

import paho.mqtt.client as mqtt

mqtt_messages = []
mqtt_connections: list[WebSocket] = []  # List for /ws/mqtt clients


# MQTT Client Setup
def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker with result code " + str(rc))
    client.subscribe("esp/topic")


def on_message(client, userdata, msg):
    payload = msg.payload.decode()
    try:
        # Parse the message payload from "key:value, key:value" format
        data = dict(
            (kv.split(":")[0].strip(), float(kv.split(":")[1]))
            for kv in payload.split(",")
        )
        # Convert the parsed data into the desired panel object format
        panel_obj = mqtt_to_panel(data)

        # Add to history
        mqtt_messages.append(panel_obj)

        # Broadcast to all active WebSocket clients on the /ws/mqtt endpoint
        loop = asyncio.get_event_loop()
        for ws in mqtt_connections:
            loop.create_task(ws.send_text(json.dumps(panel_obj)))

        print("Broadcasted to WS:", panel_obj)

    except Exception as e:
        print(f"Failed to parse/store MQTT message: {payload} -> {e}")


mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
mqtt_client.connect("mosquitto", 1883, 60)
mqtt_client.loop_start()

# --- Router and Helper Functions ---

router = APIRouter(
    prefix="/panels",
    tags=["panels"],
)

# Active connections for the main WebSocket endpoint
active_connections: list[WebSocket] = []


def mqtt_to_panel(data: dict) -> list[dict]:
    """Converts MQTT data into the panel data format."""
    return [
        {
            "panel_id": "0",
            "device_id": "f5ec0a1d-2d15-4f4b-9754-60596df062ea",
            "power_w": data.get("power_ref", 0),
            "voltage_v": data.get("voltage_ref", 0),
            "current_a": (
                round(data.get("power_ref", 0) / data.get("voltage_ref", 1), 2)
                if data.get("voltage_ref")
                else 0
            ),
            "efficiency_percent": (
                round((data.get("power_ref", 0) / 160) * 100, 2)
                if data.get("power_ref")
                else 0
            ),
            "savings_mxn": (
                round((data.get("power_ref", 0) / (1000 * 1200)) * 5, 8)
                if data.get("power_ref")
                else 0
            ),
            "reading_at": datetime.now(timezone.utc).isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        },
        {
            "panel_id": "1",
            "device_id": "f5ec0a1d-2d15-4f4b-9754-60596df062ea",
            "power_w": data.get("power_gen", 0),
            "voltage_v": data.get("voltage_gen", 0),
            "current_a": (
                round(data.get("power_gen", 0) / data.get("voltage_gen", 1), 2)
                if data.get("voltage_gen")
                else 0
            ),
            "efficiency_percent": (
                round((data.get("power_gen", 0) / 160) * 100, 2)
                if data.get("power_gen")
                else 0
            ),
            "savings_mxn": (
                round((data.get("power_gen", 0) / (1000 * 1200)) * 5, 8)
                if data.get("power_gen")
                else 0
            ),
            "reading_at": datetime.now(timezone.utc).isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        },
    ]


_simulated_panels = [
    {
        "panel_id": f"{i}",
        "device_id": str(uuid.uuid4()),
        "power_w": random.randint(140, 160),
        "voltage_v": random.randint(28, 32),
        "current_a": random.randint(4, 6),
        "temperature_c": random.randint(20, 30),
        "irradiance_w_m2": random.randint(750, 850),
        "efficiency_percent": round(random.uniform(65.0, 80.0), 2),
        "savings_mxn": round(random.uniform(100.0, 150.0), 2),
        "reading_at": datetime.now(timezone.utc).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    for i in range(4)
]


async def _update_and_broadcast():
    """Updates the simulated panel data and broadcasts it asynchronously."""
    while True:
        now = datetime.now(timezone.utc).isoformat()
        for panel in _simulated_panels:
            panel["power_w"] = random.randint(140, 160)
            panel["voltage_v"] = random.randint(28, 32)
            panel["current_a"] = random.randint(4, 6)
            panel["temperature_c"] = random.randint(20, 30)
            panel["irradiance_w_m2"] = random.randint(750, 850)
            panel["efficiency_percent"] = round(random.uniform(65.0, 80.0), 2)
            panel["savings_mxn"] = round(random.uniform(100.0, 150.0), 2)
            panel["reading_at"] = now
            panel["updated_at"] = now

        # Send data to all connected clients
        for connection in active_connections:
            try:
                await connection.send_text(json.dumps(_simulated_panels))
            except Exception as e:
                # Handle clients that have disconnected
                print(f"Error sending data to a client: {e}")

        await asyncio.sleep(3)  # Update every 3 seconds


# --- Endpoints ---


@router.on_event("startup")
async def startup_event():
    """Starts the background task on server startup."""
    asyncio.create_task(_update_and_broadcast())


@router.post("/", response_model=schemas.Panel)
def create_panel(panel: schemas.PanelCreate, db: Session = Depends(get_db)):
    db_panel = models.Panel(**panel.dict())
    db.add(db_panel)
    db.commit()
    db.refresh(db_panel)
    return db_panel


@router.get("/")
def read_panels():
    return _simulated_panels


@router.get("/mqtt")
def get_mqtt_messages():
    return mqtt_messages


@router.get("/mqtt/latest")
def get_latest_mqtt_message():
    if not mqtt_messages:
        raise HTTPException(status_code=404, detail="No MQTT messages received yet")
    return mqtt_messages[-1]


@router.get("/savings")
def read_savings():
    energy_generated = sum(p["power_w"] for p in _simulated_panels)
    daily = energy_generated * 5 / 1000  # kWh
    monthly = daily * 30  # kWh
    savings = monthly * 5  # 5mxn per kWh
    percentage_savings = (
        (savings / (monthly * 5 + savings)) * 100 if monthly * 5 + savings > 0 else 0
    )
    return {
        "energy_generated_w": energy_generated,
        "energy_generated_kwh_daily": daily,
        "energy_generated_kwh_monthly": monthly,
        "savings_mxn_monthly": savings,
        "percentage_savings": percentage_savings,
    }


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    print(f"WebSocket client connected. Total connections: {len(active_connections)}")
    try:
        # Keep the connection open indefinitely
        while True:
            await websocket.receive_text()
    except Exception as e:
        print(f"WebSocket client disconnected: {e}")
    finally:
        active_connections.remove(websocket)
        print(f"WebSocket client removed. Total connections: {len(active_connections)}")


@router.websocket("/ws/mqtt")
async def websocket_mqtt(websocket: WebSocket):
    """Realtime WebSocket stream of MQTT → Panel messages"""
    await websocket.accept()
    mqtt_connections.append(websocket)
    print(f"MQTT WS connected. Total: {len(mqtt_connections)}")
    try:
        while True:
            # Keep the socket alive, but ignore client messages
            await websocket.receive_text()
    except Exception as e:
        print(f"MQTT WS disconnected: {e}")
    finally:
        mqtt_connections.remove(websocket)
        print(f"MQTT WS removed. Total: {len(mqtt_connections)}")


@router.websocket("/ws/savings")
async def websocket_savings(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            energy_generated = sum(p["power_w"] for p in _simulated_panels)
            daily = energy_generated * 5 / 1000  # kWh
            monthly = daily * 30  # kWh
            savings = monthly * 5  # 5mxn per kWh
            percentage_savings = (
                (savings / (monthly * 5 + savings)) * 100
                if monthly * 5 + savings > 0
                else 0
            )
            data = {
                "energy_generated_w": energy_generated,
                "energy_generated_kwh_daily": daily,
                "energy_generated_kwh_monthly": monthly,
                "savings_mxn_monthly": savings,
                "percentage_savings": percentage_savings,
            }
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(3)
    except Exception as e:
        print(f"WebSocket savings client disconnected: {e}")
    finally:
        await websocket.close()
        print("WebSocket savings client connection closed.")
