const db = require('../config/database');

class PollModel {
    static async create(title, options) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            // Insert poll
            const pollResult = await client.query(
                'INSERT INTO polls (title) VALUES ($1) RETURNING id',
                [title]
            );
            const pollId = pollResult.rows[0].id;

            // Insert poll options
            const optionPromises = options.map(option =>
                client.query(
                    'INSERT INTO poll_options (poll_id, option_text) VALUES ($1, $2)',
                    [pollId, option]
                )
            );

            await Promise.all(optionPromises);
            await client.query('COMMIT');

            return pollId;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async getResults(pollId) {
        return db.query(
            `SELECT id, option_text, vote_count 
             FROM poll_options 
             WHERE poll_id = $1 
             ORDER BY vote_count DESC`,
            [pollId]
        );
    }
}

module.exports = PollModel;