from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone

router = APIRouter(
    prefix="/weather",
    tags=["weather"],
)


@router.get("/test")
def get_current_weather():
    return {
        "temperature": 22,
        "humidity": 60,
        "description": "Sunny",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/forecast")
def get_weather_forecast():
    return {
        "forecast": [
            {"day": "Monday", "temperature": 21, "description": "Partly Cloudy"},
            {"day": "Tuesday", "temperature": 19, "description": "Rainy"},
            {"day": "Wednesday", "temperature": 23, "description": "Sunny"},
        ],
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
