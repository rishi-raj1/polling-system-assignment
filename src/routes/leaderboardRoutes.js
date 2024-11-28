const express = require('express');
const router = express.Router();
const LeaderboardService = require('../services/leaderboardService');

router.get('/', async (req, res) => {
    try {
        const leaderboard = await LeaderboardService.getLeaderboard();
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;