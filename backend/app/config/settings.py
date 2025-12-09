import os

class Settings:
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_PORT: int = int(os.getenv("DB_PORT"))
    DB_HOST: str = os.getenv("DB_HOST")
    DB_NAME: str = os.getenv("DB_NAME")
    MQTT_BROKER_HOST: str = os.getenv("MQTT_BROKER_HOST")
    MQTT_BROKER_PORT: int = int(os.getenv("MQTT_BROKER_PORT"))
settings = Settings()
