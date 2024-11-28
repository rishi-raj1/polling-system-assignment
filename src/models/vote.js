const db = require('../config/database');
const kafka = require('../config/kafka');

class VoteModel {
    static async recordVote(pollId, optionId, userId) {
        try {
            // Send vote to Kafka
            await kafka.producer.send({
                topic: 'poll-votes',
                messages: [{
                    key: `${pollId}-${userId}`,
                    value: JSON.stringify({ pollId, optionId, userId })
                }]
            });
            return true;
        } catch (error) {
            console.error('Vote recording error:', error);
            throw new Error('Unable to record vote');
        }
    }

    static async processVote(pollId, optionId) {
        return db.query(
            'UPDATE poll_options SET vote_count = vote_count + 1 WHERE id = $1',
            [optionId]
        );
    }
}

module.exports = VoteModel;