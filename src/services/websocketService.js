const WebSocket = require('ws');

class WebSocketService {
    static wss = null;

    static init(server) {
        this.wss = new WebSocket.Server({ server });

        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                const { type, pollId } = JSON.parse(message);

                if (type === 'subscribe') {
                    // Logic to track poll-specific subscriptions
                }
            });
        });
    }

    static broadcastPollUpdate(pollId, results) {
        if (!this.wss) return;

        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'poll_update',
                    pollId,
                    results
                }));
            }
        });
    }
}

module.exports = WebSocketService;