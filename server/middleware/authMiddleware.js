const supabase = require('../config/supabaseClient');

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'No authorization header' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token with Supabase
        // Note: getUser is the recommended way to verify a token on the server
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Auth Error:', error);
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Middleware Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = requireAuth;
