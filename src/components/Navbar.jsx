import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import notificationIcon from '../assets/notification.png';
import defaultProfile from '../assets/default.jpg';
import '../style/Navbar.css';

export const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState(defaultProfile);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const res = await fetch("/api/user/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (res.ok) {
                    const data = await res.json();
                    setIsAuthenticated(true);
                    setUserName(data.username.toUpperCase());
                    console.log(data.profileImageUrl);
                    if (data.profileImageUrl) {
                        const fullUrl = data.profileImageUrl.startsWith("http") ? data.profileImageUrl : `http://localhost:8080${data.profileImageUrl}`;
                        setProfileImage(fullUrl);
                        localStorage.setItem("user_profile", data.user_profile);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
                setIsAuthenticated(false);
            }
        };

        fetchUserProfile();
    }, []);

    const openNav = () => {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("nav-side-btn").style.display = "none";
    };

    const closeNav = () => {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("nav-side-btn").style.display = "block";
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh: localStorage.getItem("refresh") }),
                credentials: "include"
            });
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            localStorage.clear();
            window.location.href = "/";
        }
    };

    return (
        <div>
            <div id="mySidebar" className="sidebar">
                <button className="closebtn" onClick={closeNav}>&times;</button>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/e-facility">E-Facilities</Link>
                <Link to="/education">Education</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/classify-image">Classify-Image</Link>
                {isAuthenticated && (
                    <>
                        <Link to="/notification">Notifications</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/" onClick={logout}>Logout</Link>
                    </>
                )}
                {!isAuthenticated && <Link to="/login">Login</Link>}
            </div>

            <div className="main-content">
                <nav>
                    <span style={{ display: 'flex', marginBottom: '5px' }}>
                        <button className="openbtn" onClick={openNav} id="nav-side-btn" style={{ marginTop: '5px' }}>☰</button>
                        <Link to="/" className="logo">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </span>

                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/e-facility">E-Facilities</Link></li>
                        <li><Link to="/education">Education</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/classify-image">Classify-Image</Link></li>
                    </ul>

                    {isAuthenticated ? (
                        <Link to="/profile" className="right_side" style={{ display: 'flex', textDecoration: 'none', color: 'black' }}>
                            <button id="notification">
                                <Link to="/notification">
                                    <img src={notificationIcon} alt="Notification" />
                                </Link>
                            </button>

                            <li className="nav-item dropdown">
                                <span className="profile-image" id="profileImage">
                                    <img src={profileImage} alt="Profile" />
                                    <p>{userName}</p>
                                </span>
                            </li>
                        </Link>
                    ) : (
                        <span>
                            <Link to="/login" className="btn">LOGIN</Link>
                        </span>
                    )}
                </nav>
            </div>
        </div>
    );
};
