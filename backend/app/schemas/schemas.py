from pydantic import BaseModel
from datetime import datetime


class PanelBase(BaseModel):
    power_w: float
    voltage_v: float
    current_a: float
    temperature_c: float
    irradiance_w_m2: float
    reading_at: datetime
    created_at: datetime
    updated_at: datetime


class PanelCreate(PanelBase):
    pass


class Panel(PanelBase):
    id: int

    class Config:
        orm_mode = True
