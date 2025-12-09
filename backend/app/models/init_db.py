from app.services.database import engine
from app.models.panels import Base

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
