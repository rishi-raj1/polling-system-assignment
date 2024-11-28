Setup Instructions

1. Clone the Repository
clone https://github.com/yourusername/polling-system.git
cd polling-system


2. Environment Setup

# Install Dependencies
npm install

# Create .env File
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=polling_system
DB_USER=postgres
DB_PASSWORD=your_password

# Kafka Configuration
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=polling-app

# Zookeeper Configuration
ZOOKEEPER_CONNECT=localhost:2181


3. Database Setup
Manual Database Setup
sqlCopyCREATE DATABASE polling_system;

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


4. Kafka and Zookeeper Setup
Manual Kafka Setup

Download Kafka from Apache's website
Extract and configure Zookeeper and Kafka
Start Zookeeper: bin/zookeeper-server-start.sh config/zookeeper.properties
Start Kafka: bin/kafka-server-start.sh config/server.properties

5. Create Kafka Topics
# Create poll-votes topic
kafka-topics.sh --create --topic poll-votes \
    --bootstrap-server localhost:9092 \
    --partitions 3 \
    --replication-factor 1


6. Running the Application
# Development Mode
npm run dev

# Production Mode
npm start


# Testing Real-Time Features

Polling System Endpoints

Create Poll: POST /polls
jsonCopy{
  "title": "Favorite Programming Language",
  "options": ["JavaScript", "Python", "Java", "Go"]
}

Vote on Poll: POST /polls/:id/vote
jsonCopy{
  "optionId": 1,
  "userId": "user123"
}

Get Leaderboard: GET /leaderboard

# WebSocket Testing

Use WebSocket client (like Postman or custom frontend)
Connect to ws://localhost:3000
Subscribe to events:

jsonCopy{
  "type": "subscribe",
  "pollId": "poll_id_here"
}
