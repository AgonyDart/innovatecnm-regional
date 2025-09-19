from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas import schemas
from ..services.database import get_db
from .. import models

# simulated data
import time
import threading
from datetime import datetime, timezone
import random
import uuid


router = APIRouter(
    prefix="/panels",
    tags=["panels"],
)


@router.post("/", response_model=schemas.Panel)
def create_panel(panel: schemas.PanelCreate, db: Session = Depends(get_db)):
    db_panel = models.Panel(**panel.dict())
    db.add(db_panel)
    db.commit()
    db.refresh(db_panel)
    return db_panel


@router.get("/{panel_id}", response_model=schemas.Panel)
def read_panel(panel_id: int, db: Session = Depends(get_db)):
    panel = db.query(models.Panel).filter(models.Panel.id == panel_id).first()
    if panel is None:
        raise HTTPException(status_code=404, detail="Panel not found")
    return panel


# Simulated panel data storage
_simulated_panels = [
    {
        "panel_id": str(uuid.uuid4()),
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


def _update_panels():
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
        time.sleep(3)


# Start background thread to update panels
threading.Thread(target=_update_panels, daemon=True).start()


@router.get("/")
def read_panels():
    return _simulated_panels
