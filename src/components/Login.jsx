import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';
import axios from 'axios';

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }
       console.log(email,password)
        try {
            const response = await axios.post("/api/auth/authenticate", {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            const data = response.data;
            if (response.status === 200) {
                localStorage.setItem("access", data.accessToken);
                localStorage.setItem("refresh", data.refresh);

                // Fetch user profile after authentication
                const user_info = await axios.get("/api/user/profile", {
                    headers: {
                        "Authorization": `Bearer ${data.accessToken}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (user_info.data) {
                    const result = user_info.data;
                    localStorage.setItem("user_id", result.id);
                    localStorage.setItem("username", result.username);
                    localStorage.setItem("email", result.email);
                    localStorage.setItem("role", result.role);
                    localStorage.setItem("user_profile", result.user_profile);

                    alert('User logged in successfully!');
                    navigate(result.role === "user" ? "/" : "/scrap-collector");
                    window.location.reload();
                }
            } else {
                setError(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        }

        setFormData({ email: '', password: '' });
    };

    const togglePassword = () => {
        const pwd = document.getElementById('password');
        pwd.type = pwd.type === 'password' ? 'text' : 'password';
    };

    return (
        <>
           
            <div className="home-card">
                <div className="user-login-card">
                    <div className="user-login-separator"></div>
                    <h2 className="user-login-title">Welcome Back</h2>
                    <div className="user-login-subtitle">
                        Log in to access your account
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="user-login-btn">
                            Login
                        </button>
                    </form>
                    <div className="user-options">
                        <a href="/forgot-password">Forgot Password?</a>
                        <Link to="/Signup">SignUp</Link>
                    </div>
                </div>
            </div>
        </>
    );
};