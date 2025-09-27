const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login API
app.post('/api/login', (req, res) => {
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

// Socket.io for real-time communication
io.on('connection', (socket) => {
    console.log('User connected');
    
    socket.emit('welcome', { 
        message: 'Connected to Smart Home!',
        time: new Date() 
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Smart Home Server running on port ${PORT}`);
});
