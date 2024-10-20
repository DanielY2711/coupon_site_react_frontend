// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {BASE} from './config';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await fetch(`${BASE}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data.message);
            
            // Store the token
            const token = data.access;
            console.log("token saved: ", token)
            localStorage.setItem('token', token);
            
            // Redirect using navigate
            navigate('/coupons'); // Use the route you want to navigate to
        }
        else {
            console.error("Login fail")
        }

    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username"  // Change this to Username
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
