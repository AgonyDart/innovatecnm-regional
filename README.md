# ☀️ Solar Panel Monitoring Platform

A full-stack platform for monitoring and analyzing solar panel performance in real time.  
It combines IoT devices, MQTT messaging, backend services, and a frontend dashboard to provide live insights into solar energy generation.

---

## 📦 Stack Overview

- **Frontend**: Next.js dashboard for visualization  
- **Backend**: FastAPI for APIs, business logic, and data ingestion  
- **Messaging**: Eclipse Mosquitto (MQTT broker) for IoT communication  
- **Database**: PostgreSQL for persistent data storage  
- **Machine Learning**: Service for performance analytics and predictions  
- **IoT Device**: ESP32 microcontrollers connected to solar panels  

---

## 🏗️ Architecture

``` mermaid
flowchart LR
    %% ==== Clients ====
    subgraph Client
        C[💻 Monitoring Dashboard]
    end
    
    %% ==== IoT & Messaging ====
    subgraph IoT[Messaging Layer]
        ESP[🔌 ESP32]
        M[📡 MQTT Broker]
    end
    
    %% ==== Server Layer ====
    subgraph Server[Backend Server]
        A[🔗 API Gateway]
        L[⚙️ Business Logic Service]
        ML[🧠 Machine Learning]
    end

    %% ==== Database Layer ====
    subgraph DB[Data Layer]
        P[(🗄️ PostgreSQL)]
    end

    %% ==== Flows ====
    C -->|WebSockets / HTTPS| A
    A --> L
    L -->|Pub/Sub| M
    L --> ML
    L --> P
    ESP -->|MQTT| M
```

## ⚙️ Setup & Run

Start all services with:
`docker-compose up --build`

## 🔎 Use Case

- IoT devices (ESP32) collect solar panel metrics (voltage, current, power).

- Data is sent via MQTT to the broker.

- The backend ingests and processes the data, stores it in PostgreSQL, and feeds it into the machine learning service for performance prediction.

- The frontend dashboard provides real-time monitoring and analytics to users.
