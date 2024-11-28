const db = require('../config/database');
const WebSocketService = require('./websocketService');

class LeaderboardService {
    static async getLeaderboard() {
        const result = await db.query(`
            SELECT 
                p.id as poll_id, 
                p.title as poll_title,
                po.id as option_id, 
                po.option_text, 
                po.vote_count 
            FROM poll_options po
            JOIN polls p ON po.poll_id = p.id
            ORDER BY po.vote_count DESC
            LIMIT 10
        `);
        return result.rows;
    }

    static async updateLeaderboard() {
        const leaderboard = await this.getLeaderboard();

        // Broadcast leaderboard updates
        WebSocketService.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'leaderboard_update',
                    leaderboard
                }));
            }
        });
    }
}

module.exports = LeaderboardService;