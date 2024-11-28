require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocketService = require('./services/websocketService');
const KafkaService = require('./services/kafkaService');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// Routes
app.use('/polls', require('./routes/pollRoutes'));
app.use('/polls', require('./routes/voteRoutes'));
app.use('/leaderboard', require('./routes/leaderboardRoutes'));

// WebSocket Initialization
WebSocketService.init(server);

// Start Kafka Consumer
KafkaService.startConsumer();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;