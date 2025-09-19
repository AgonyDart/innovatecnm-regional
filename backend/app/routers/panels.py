from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
# from ..services import get_db

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


@router.get("/", response_model=list[schemas.Panel])
# def read_panels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     panels = db.query(models.Panel).offset(skip).limit(limit).all()
#     return panels
def read_panels():
    return [{"panel_id": 1, "name": "Test Panel"}]
