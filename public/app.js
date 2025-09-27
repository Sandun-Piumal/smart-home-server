let socket = io();

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.querySelector('.login-container').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
        } else {
            document.getElementById('message').textContent = data.message;
        }
    });
}

function toggleLights() {
    alert('Light control would work in real server!');
}

// Socket.io events
socket.on('welcome', (data) => {
    console.log('Server:', data.message);
});
