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

// Create a new project (Temporarily allowing all for testing)
router.post('/', async (req, res) => {
    console.log('=== POST /projects called ===');
    console.log('Request body:', req.body);

    const { title, description, image_url, live_link, repo_link, tags, category, status } = req.body;

    console.log('Attempting insert with supabase client...');

    const { data, error } = await supabase
        .from('projects')
        .insert([
            { title, description, image_url, live_link, repo_link, tags, category, status }
        ])
        .select();

    if (error) {
        console.error('Supabase insert error:', error);
        return res.status(500).json({ error: error.message });
    }

    console.log('Insert successful:', data);
    res.status(201).json(data);
});

// Delete a project (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Project deleted successfully' });
});

module.exports = router;
