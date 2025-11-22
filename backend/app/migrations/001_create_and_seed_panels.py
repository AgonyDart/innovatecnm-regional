from services.database import engine, SessionLocal
from models.panels import Base, Panel
from datetime import datetime, timezone

Base.metadata.create_all(bind=engine)

def create_panels():
    db = SessionLocal()
    try:
        now = datetime.now(timezone.utc)
        paneles = [
            Panel(
                power_w=150,
                voltage_v=30,
                current_a=5,
                temperature_c=25,
                irradiance_w_m2=800,
                reading_at=now,
                created_at=now,
                updated_at=now,
            ),
            Panel(
                power_w=155,
                voltage_v=29,
                current_a=5,
                temperature_c=26,
                irradiance_w_m2=810,
                reading_at=now,
                created_at=now,
                updated_at=now,
            ),
            Panel(
                power_w=160,
                voltage_v=31,
                current_a=5,
                temperature_c=27,
                irradiance_w_m2=820,
                reading_at=now,
                created_at=now,
                updated_at=now,
            ),
        ]
        db.add_all(paneles)
        db.commit()
        print("Paneles precargados correctamente.")
    finally:
        db.close()

if __name__ == "__main__":
    create_panels()
