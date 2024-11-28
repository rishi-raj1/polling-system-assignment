# Polling System

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/polling-system.git
cd polling-system
```

### 2. Environment Setup
Install Dependencies
```bash
npm install
```

Create .env File
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=polling_system
DB_USER=postgres
DB_PASSWORD=your_password

KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=polling-app

ZOOKEEPER_CONNECT=localhost:2181
```

### 3. Database Setup
```bash
CREATE DATABASE polling_system;

CREATE TABLE polls (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE poll_options (
    id SERIAL PRIMARY KEY,
    poll_id INTEGER REFERENCES polls(id),
    option_text TEXT NOT NULL,
    vote_count INTEGER DEFAULT 0
);
```

### 4. Kafka and Zookeeper Setup
Download and Configure

Download Kafka from Apache's website
Extract and configure Zookeeper and Kafka

Start Services
# Start Zookeeper
```bash
bin/zookeeper-server-start.sh config/zookeeper.properties
```

# Start Kafka
```bash
bin/kafka-server-start.sh config/server.properties
```

### 5. Create Kafka Topics
```bash
kafka-topics.sh --create --topic poll-votes \
    --bootstrap-server localhost:9092 \
    --partitions 3 \
    --replication-factor 1
```

### 6. Running the Application
Development Mode
```bash
npm run dev
```

Production Mode
```bash
npm start
```

API Endpoints
Create Poll

Endpoint: POST /polls
Request Body:
{
  "title": "Favorite Programming Language",
  "options": ["JavaScript", "Python", "Java", "Go"]
}

Vote on Poll

Endpoint: POST /polls/:id/vote
Request Body:
{
  "optionId": 1,
  "userId": "user123"
}

Get Leaderboard

Endpoint: GET /leaderboard

WebSocket Testing

Connect to ws://localhost:3000
Subscribe to events:
{
  "type": "subscribe",
  "pollId": "poll_id_here"
}
