const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust Proxy (Required for Rate Limiting on Render/Heroku)
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size

// Sanitization middleware
app.use((req, res, next) => {
    if (req.body) {
        const sanitizeString = (str) => {
            if (typeof str !== 'string') return str;
            return str
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        };

        const sanitizeObject = (obj) => {
            if (typeof obj !== 'object' || obj === null) return sanitizeString(obj);
            const sanitized = {};
            for (const key in obj) {
                sanitized[key] = typeof obj[key] === 'string'
                    ? sanitizeString(obj[key])
                    : obj[key];
            }
            return sanitized;
        };

        req.body = sanitizeObject(req.body);
    }
    next();
});

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/newsletter', require('./routes/newsletter'));

// Base Route
app.get('/', (req, res) => {
    res.send('Admin Dashboard API is running securely');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
});
