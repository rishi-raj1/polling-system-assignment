const PollModel = require('../models/poll');
const WebSocketService = require('./websocketService');

class PollService {
    static async createPoll(title, options) {
        const pollId = await PollModel.create(title, options);
        return pollId;
    }

    static async getPollResults(pollId) {
        const results = await PollModel.getResults(pollId);

        // Broadcast results via WebSocket
        WebSocketService.broadcastPollUpdate(pollId, results.rows);

        return results.rows;
    }
}

module.exports = PollService;