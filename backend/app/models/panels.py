from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Panel(Base):
    __tablename__ = "panels"

    id = Column(Integer, primary_key=True, index=True)
    power_w = Column(Integer)
    voltage_v = Column(Integer)
    current_a = Column(Integer)
    temperature_c = Column(Integer)
    irradiance_w_m2 = Column(Integer)
    reading_at = Column(String)
    created_at = Column(String)
    updated_at = Column(String)
