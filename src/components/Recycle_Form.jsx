import React, { useState, useEffect, use } from 'react';
import { useParams } from 'react-router-dom';
import '../style/recycle_form.css';
import loader from '../assets/loader.gif';

const Recycle_Form = () => {
    const { user_id } = useParams();
    const [item, setItem] = useState([]);
    const [formData, setFormData] = useState({
        item_type: '',
        date: '',
        phone: '',
        weight: '',
        image: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("User ID:", user_id);
                const res = await fetch(`/api/owner/${user_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("access")}`, // Add the token here
                    },
                });
                const data = await res.json();
                console.log("Organisation data:", data);
                setItem(data);
            } catch (err) {
                console.error("Scrap collector detail fetching error", err);
            }
        };

        fetchData();
    }, []);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    
    // Function to get the user's location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, handleError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    // Function to show the user's position
    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    // Function to handle errors
    const handleError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert('Providing location is important for this functionality.');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                alert('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                alert('An unknown error occurred.');
                break;
            default:
                break;
        }
    };

    // Automatically request location when the component mounts
    useEffect(() => {
        getLocation();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const now = new Date();
        const form = new FormData();
        form.append("item_type", formData.item_type);
        form.append("date", formData.date);
        form.append("phone", formData.phone);
        form.append("weight", formData.weight);
        form.append("image", formData.image);
        form.append("longitude", longitude);
        form.append("latitude", latitude);
        form.append("user", localStorage.getItem('user_id'));  // User ID from local storage
        form.append("organisation", user_id);  // Organisation ID from selected item
       
        try {
            const res = await fetch("/api/scrap-request", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access")}`
                },
                body: form
            });
           // const result = await res.json();
            if (res.status === 201) {
                alert("Request submitted successfully!");
                setFormData({
                    item_type: '',
                    date: '',
                    phone: '',
                    weight: '',
                    image: ''
                });
                window.location.href = "/e-facility";
            }
            if(res.status === 403) {
                alert("You are not authorized");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <>
        {item?.organisationName ? (
            <div className="registration-bg">
                <div className="registration-center-wrap">
                    <div className="registration-card">
                        <div className="registration-separator"></div>
                        <h2 className="registration-title">{item.organisationName.toUpperCase()}</h2>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Select item type*</label>
                                    <select
                                        name="item_type"
                                        id="brandSelect"
                                        required
                                        value={formData.item_type}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select type</option>
                                        <option value="paper">Paper</option>
                                        <option value="iron">Iron</option>
                                        <option value="copper">Copper</option>
                                        <option value="ewaste">E-waste</option>
                                        <option value="plastic">Plastic</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Select Date of pickup*</label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone number*</label>
                                    <input
                                        type="tel"
                                        placeholder="0000"
                                        name="phone"
                                        pattern="[0-9]{10}"
                                        title="Enter 10 digit phone number"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Scrap weight*</label>
                                    <input
                                        type="number"
                                        placeholder="in grams"
                                        name="weight"
                                        required
                                        value={formData.weight}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Upload items image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <input id="latitude" name="latitude" type="hidden" value={latitude} />
                            <input id="longitude" name="longitude" type="hidden" value={longitude} />

                            <button type="submit" className="register-btn">SUBMIT</button>
                        </form>
                    </div>
                </div>
            </div>
        ) : (
            <div className="loader"><img src={loader} alt="" /><br />Check if you are logged-In or wait for few seconds</div>
        )}
        </>);
};

export default Recycle_Form;
