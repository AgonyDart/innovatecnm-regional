from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import panels, weather, alexa

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(panels.router)
app.include_router(weather.router)
app.include_router(alexa.router)


@app.get("/")
def read_root():
    return {"Hello": "Next JS"}


@app.get("/health")
def get_health():
    return {"status": "ok"}
