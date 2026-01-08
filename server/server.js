const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate Limiting Configuration
const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Max 20 requests per window for public endpoints
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false
});

const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Max 5 form submissions per hour
    message: { error: 'Too many submissions. Please try again in an hour.' },
    standardHeaders: true,
    legacyHeaders: false
});

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

// Routes with rate limiting
app.use('/api/projects', require('./routes/projects'));
app.use('/api/inquiries', strictLimiter, require('./routes/inquiries'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/reviews', strictLimiter, require('./routes/reviews'));

// Base Route
app.get('/', (req, res) => {
    res.send('Admin Dashboard API is running securely');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
});
