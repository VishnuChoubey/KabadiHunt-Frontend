import React, { useEffect, useState } from 'react';
import '../style/Signup.css';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        confirmPassword: '',
    });

    const [lengthError, setLengthError] = useState('');
    const [matchError, setMatchError] = useState('');
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (formData.password.length > 0 && formData.password.length < 8) {
            setLengthError('Password must be at least 8 characters.');
        } else {
            setLengthError('');
        }

        if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
            setMatchError('Passwords do not match.');
        } else {
            setMatchError('');
        }
    }, [formData.password, formData.confirmPassword]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setApiError('');
        setApiSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.role || !formData.password || !formData.confirmPassword) {
            setApiError('Please fill all fields.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setApiError('Invalid email format.');
            return;
        }

        if (lengthError || matchError) {
            setApiError('Please fix validation errors before submitting.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.name,
                    email: formData.email.toLowerCase(),
                    phone: formData.phone,
                    password: formData.password,
                    role: formData.role,
                }),
            });

            if (response.status === 201) {
                setApiSuccess('User registered successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    role: '',
                    password: '',
                    confirmPassword: '',
                });

                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                const result = await response.json();
                setApiError(result.message || 'Registration failed.');
            }
        } catch (error) {
            setApiError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="registration-bg">
            <div className="registration-center-wrap">
                <div className="registration-card">
                    <div className="registration-separator"></div>
                    <h2 className="registration-title">Welcome to ScrapBridge</h2>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone number"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Role:</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select role</option>
                                    <option value="user">user</option>
                                    <option value="recycler">recycler</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                                {lengthError && <p className="error-message">{lengthError}</p>}
                            </div>
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    required
                                />
                                {matchError && <p className="error-message">{matchError}</p>}
                            </div>
                        </div>
                        {apiError && <p className="error-message">{apiError}</p>}
                        {apiSuccess && <p className="success-message">{apiSuccess}</p>}
                        <button type="submit" className="register-btn">Sign Up</button>
                        <div className="form-footer">
                            <p>
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
