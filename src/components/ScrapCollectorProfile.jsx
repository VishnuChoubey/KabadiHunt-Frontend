import React, { useState, useEffect } from "react";
import "../style/profile.css";
import loader from "../assets/loader.gif";
import { useMemo } from "react";

const ScrapCollectorProfile = () => {
  const [user, setUser] = useState(null);
  const [organisationName, setOrganisationName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [previewImage, setPreviewImage] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        console.log(localStorage.getItem("user_id"));
        const res = await fetch(`/api/owner/${localStorage.getItem("user_id")}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        console.log(" vishnu User data:", res);
       const data =  await res.json();
       // console.log(" vishnu User data:", data);
        console.log(" baat to suno",data);
       if (data) {
  localStorage.setItem("user_profile", data.imagePath);
  setImageFile(data.imagePath) // use imagePath, not image
  setUser(data);
  setEmail(data.email || ""); // You might want to check if email is in data or in nested user object
  setPhone(data.phone || "");
  setStreet(data.street || "");
  setCity(data.city || "");
  setState(data.state || "");
  setZipcode(data.zipcode || "");
  // If you want, also set latitude and longitude
  setLatitude(data.latitude || 0);
  setLongitude(data.longitude || 0);
}

      } catch (err) {
        console.error("User detail fetching error", err);
      }
    };

    fetchData();
  }, []);

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

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    // Phone number validation
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
     getLocation();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipcode", zipcode);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("organisation_name", organisationName);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(
        `/api/update/${localStorage.getItem("user_id")}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("User info updated successfully!");
        window.location.reload();
      } else {
        console.error("Update failed:", data);
        alert("Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const profileUrl = useMemo(
  () => "http://localhost:8080" + localStorage.getItem("user_profile"),
  []
);


  //const profileImg = imageFile!="" ? "http://localhost:8080" + imageFile : "";

  return (
    <>
                        
        <div className="profile-container">
          <div className="profile-card">
            {/* <div className="created-at">
              Created On: {new Date(user.created_at).toISOString().split("T")[0]}
            </div> */}

            <div className="img">
              <img
                src={profileUrl}
                alt="Profile"
                className="profile-img"
                onClick={() => setPreviewImage(true)}
                style={{ cursor: "pointer" }}
              />
              <h2 className="username">{localStorage.getItem("username").toUpperCase()}</h2>
            </div>

            <div className="info-grid">
              <div className="form-group">
                <label>Username</label>
                <input type="text" value={localStorage.getItem("username")} disabled />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setPhone(value);
                    }
                  }}
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label>Street</label>
                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
              </div>

              <div className="form-group">
                <label>City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div className="form-group">
                <label>State</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Organisation Name</label>
                <input type="text" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
              </div>
            </div>

            <div className="btn-center">
              <button className="submit-btn" onClick={handleUpdateUser}>
                Update
              </button>
            </div>
          </div>

          {previewImage && (
            <div className="image-preview-overlay" onClick={() => setPreviewImage(false)}>
              <div className="image-preview-container" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={() => setPreviewImage(false)}>&times;</span>
                <img src={profileImg} alt="Zoom" className="preview-img" />
              </div>
            </div>
          )}
        </div>
    
    </>
  );
};

export default ScrapCollectorProfile;
