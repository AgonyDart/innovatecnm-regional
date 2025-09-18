import paho.mqtt.client as mqtt
from .database import SessionLocal, SensorData

MQTT_BROKER = "localhost"
MQTT_PORT = 1883
MQTT_TOPIC = "esp/topic"


def on_connect(client, userdata, flags, rc):
    print(f"Connected to MQTT Broker with result code: {rc}")
    client.subscribe(MQTT_TOPIC)


# def save_to_db(message: str):
# db = SessionLocal()
# try:
#     new_data = SensorData(message=message, timestamp="some-timestamp")
#     db.add(new_data)
#     db.commit()
#     db.refresh(new_data)
#     print("Data saved to database.")
# finally:
#     db.close()


def on_message(client, userdata, msg):
    decoded_message = msg.payload.decode()
    print(f"Received message: {decoded_message}")
    # save_to_db(decoded_message)


def start_mqtt_listener():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    try:
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        client.loop_start()
    except Exception as e:
        print(f"Could not connect to MQTT broker: {e}")
