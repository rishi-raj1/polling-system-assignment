const kafka = require('../config/kafka');
const VoteModel = require('../models/vote');
const LeaderboardService = require('./leaderboardService');

class KafkaService {
    static async startConsumer() {
        await kafka.consumer.connect();
        await kafka.consumer.subscribe({ topic: 'poll-votes', fromBeginning: true });

        await kafka.consumer.run({
            eachMessage: async ({ message }) => {
                const { pollId, optionId, userId } = JSON.parse(message.value.toString());

                try {
                    // Process vote
                    await VoteModel.processVote(pollId, optionId);

                    // Update leaderboard
                    await LeaderboardService.updateLeaderboard();
                } catch (error) {
                    console.error('Vote processing error:', error);
                }
            }
        });
    }
}

module.exports = KafkaService;