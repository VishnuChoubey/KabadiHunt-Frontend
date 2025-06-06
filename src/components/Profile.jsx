import React, { useState, useEffect } from "react";
import "../style/profile.css";
import loader from "../assets/loader.gif";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const accessToken = localStorage.getItem("access");
  const userName = localStorage.getItem("username")?.toUpperCase();

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) return;
      try {
        const res = await fetch(`/api/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();
       console.log("User data:", data);
        if (data.profileImageUrl) {
          localStorage.setItem("user_profile", data.profileImageUrl);
         // console.log("Image URL:", data.profileImageUrl);
        }
        setUser(data);
        setEmail(data.email || "");
      } catch (err) {
        console.error("Error fetching user details", err);
      }
    };

    fetchUser();
  }, [accessToken]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!accessToken) return;

    const formData = new FormData();
    formData.append("email", email);
    if (imageFile) {
      formData.append("profileImage", imageFile); // matches @RequestPart("profileImage") in backend
    }

    try {
      const res = await fetch(`/api/user/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Do NOT set Content-Type for multipart/form-data; browser sets it automatically
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        if (data.image) {
          localStorage.setItem("user_profile", data.image);
        }
        alert("Profile updated successfully!");
        setUser(data);
      } else {
        console.error("Update failed:", data);
        alert("Something went wrong");
      }
    } catch (err) {
      console.error("Error during update", err);
    }
  };


  //console.log(user.image)

  const profileImg = user?.profileImageUrl ? `http://localhost:8080${user.profileImageUrl}` : "";
   console.log("Profile Image URL:", profileImg);
    return (
     <>
      {user ? (
        <div className="profile-container">
          <div className="profile-card">
            <div className="img">
              <img src={profileImg} alt="Profile" className="profile-img" />
              <h2 className="username">{userName}</h2>
              <div className="created-at">
                Created On: {new Date(user.createdAt).toISOString().split("T")[0]}
              
              </div>
            </div>

            <div className="info-grid">
              <div className="form-group">
                <label>Username</label>
                <input type="text" value={userName} disabled />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Upload Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>

              <div className="btn-center">
                <button className="submit-btn" onClick={handleUpdateUser}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          <img src={loader} alt="Loading..." />
          <p>Check if you are logged in or wait a few seconds...</p>
        </div>
      )}
    </>
  );
};

export default Profile;
