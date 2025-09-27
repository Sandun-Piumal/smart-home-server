// netlify/functions/server.js
const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());

app.post('/.netlify/functions/server/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'admin123') {
        res.json({ 
            success: true, 
            message: 'Login successful!',
            user: { username: 'admin' }
        });
    } else {
        res.json({ 
            success: false, 
            message: 'Invalid credentials!' 
        });
    }
});

module.exports.handler = serverless(app);
