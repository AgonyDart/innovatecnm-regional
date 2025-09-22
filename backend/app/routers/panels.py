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

router = APIRouter(
    prefix="/panels",
    tags=["panels"],
)

active_connections: list[WebSocket] = []


# --- Standard API Endpoints (no change) ---
@router.post("/", response_model=schemas.Panel)
def create_panel(panel: schemas.PanelCreate, db: Session = Depends(get_db)):
    db_panel = models.Panel(**panel.dict())
    db.add(db_panel)
    db.commit()
    db.refresh(db_panel)
    return db_panel


# --- Asynchronous Background Task and WebSocket Endpoint ---
_simulated_panels = [
    {
        "panel_id": f"{i}",
        "device_id": "f5ec0a1d-2d15-4f4b-9754-60596df062ea",
        "power_w": random.randint(140, 160),
        "voltage_v": random.randint(28, 32),
        "current_a": random.randint(4, 6),
        "temperature_c": random.randint(20, 30),
        "irradiance_w_m2": random.randint(750, 850),
        "reading_at": datetime.now(timezone.utc).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    for i in range(4)
]


async def _update_and_broadcast():
    """Updates the panel data and broadcasts it asynchronously."""
    while True:
        now = datetime.now(timezone.utc).isoformat()
        for panel in _simulated_panels:
            panel["power_w"] = random.randint(140, 160)
            panel["voltage_v"] = random.randint(28, 32)
            panel["current_a"] = random.randint(4, 6)
            panel["temperature_c"] = random.randint(20, 30)
            panel["irradiance_w_m2"] = random.randint(750, 850)
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


@router.on_event("startup")
async def startup_event():
    """Starts the background task on server startup."""
    asyncio.create_task(_update_and_broadcast())


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


@router.get("/")
def read_panels():
    return _simulated_panels


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
