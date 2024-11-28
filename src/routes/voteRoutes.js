const express = require('express');
const router = express.Router();
const VoteModel = require('../models/vote');

router.post('/:pollId/vote', async (req, res) => {
    const { pollId } = req.params;
    const { optionId, userId } = req.body;

    try {
        await VoteModel.recordVote(pollId, optionId, userId);
        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;