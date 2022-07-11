//console.log('TODO:// Implement Login functionality');
const form = document.getElementById('loginForm');
const url = 'http://localhost:3030/users/login';

form.addEventListener('submit', login);

async function login(ev) {
    ev.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email.trim() || !password.trim()) {
        alert('Fill all fields!');
        return;
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!res.ok) {
        const error = await res.json();
        alert(`Error: ${error.message}`);
        return;
    }

    const data = await res.json();
    sessionStorage.setItem('userData', JSON.stringify({ token: data.accessToken, _id: data._id }));
    location.pathname = 'index.html';
}