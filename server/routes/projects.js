const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const requireAuth = require('../middleware/authMiddleware');

// Get all projects (Public)
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

// Create a new project (Protected)
router.post('/', requireAuth, async (req, res) => {
    const { title, description, image_url, live_link, repo_link, tags } = req.body;

    const { data, error } = await supabase
        .from('projects')
        .insert([
            { title, description, image_url, live_link, repo_link, tags }
        ])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
});

module.exports = router;
