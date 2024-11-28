const express = require('express');
const router = express.Router();
const PollService = require('../services/pollService');

router.post('/', async (req, res) => {
    const { title, options } = req.body;
    try {
        const pollId = await PollService.createPoll(title, options);
        res.status(201).json({ pollId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/results', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await PollService.getPollResults(id);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;