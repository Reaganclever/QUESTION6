let allUsers = [];

// Load users from XML
async function loadUsersFromXML() {
    try {
        const response = await fetch('users.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const userNodes = xmlDoc.getElementsByTagName('user');
        allUsers = [];

        for (let user of userNodes) {
            allUsers.push({
                username: user.getElementsByTagName('username')[0].textContent,
                password: user.getElementsByTagName('password')[0].textContent,
                role: user.getElementsByTagName('role')[0].textContent,
                name: user.getElementsByTagName('fullname')[0].textContent,
                email: user.getElementsByTagName('email')[0] ? 
                       user.getElementsByTagName('email')[0].textContent : ''
            });
        }
    } catch (error) {
        console.error("Error loading XML:", error);
        // Fallback data
        allUsers = [
            { username: "admin", password: "admin123", role: "admin", name: "Alex Rivera", email: "admin@securevault.com" },
            { username: "joe", password: "joe123", role: "user", name: "Kalunji Joe Rodney", email: "rodney@gmail.com" },
            { username: "Lynet", password: "Lynet123", role: "user", name: "Nakawooya Jane Lynet", email: "lynet@gmail.com.com" }
        ];
    }
}

// Login Handler
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('message');

    if (!allUsers.length) await loadUsersFromXML();

    const user = allUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        messageDiv.className = 'message success';
        messageDiv.textContent = 'Login successful! Redirecting...';
        messageDiv.style.display = 'block';
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        setTimeout(() => {
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'user.html';
            }
        }, 1200);
    } else {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Invalid username or password.';
        messageDiv.style.display = 'block';
        
        const card = document.querySelector('.login-card');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);
    }
});

// Initialize
loadUsersFromXML();

// Shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
    }
    .shake { animation: shake 0.5s ease-in-out; }
`;
document.head.appendChild(style);