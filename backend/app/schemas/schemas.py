from pydantic import BaseModel


class PanelBase(BaseModel):
    power_w: float
    voltage_v: float
    current_a: float
    temperature_c: float
    irradiance_w_m2: float
    reading_at: str
    created_at: str
    updated_at: str


class PanelCreate(PanelBase):
    pass


class Panel(PanelBase):
    id: int

    class Config:
        orm_mode = True
