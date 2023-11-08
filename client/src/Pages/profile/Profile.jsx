import React, { useEffect, useState } from "react";
import "./Profile.scss";
import newRequest from "../../utils/newRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUserData);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserData) {
      setLoading(true);
      // Fetch user data and set 'user' state (similar to your current implementation).
      setLoading(false);
    }
  }, [currentUserData]);

  const handleSaveClick = async () => {
    try {
      // Send a PUT request to update the user data in the database
      await newRequest.put(`/users/${user._id}`, editedUser);
      setUser({ ...editedUser }); // Update the UI with the edited data
      setIsEditing(false);
      toast.success("Profile updated successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
      toast.error("Failed to update profile", {
        position: "top-right",
      });
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        // Make an API request to delete the user account
        newRequest.delete(`/users/${user._id}`);

        // Remove user data from local storage
        localStorage.removeItem("currentUser");

        // Redirect the user to the logout or home page
        navigate("/login"); // You can replace with the appropriate route
        toast.success("Account deleted successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (error) {
        console.error(error);
        // Handle the error appropriately
        toast.error("Failed to delete account", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="profile">
          <div className="profile-image">
            <img
              src={user.img || "../../../public/img/noProfilePic.jpg"}
              alt="Profile"
              loading="lazy"
            />
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={editedUser.country}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveClick} className="save-button">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h2>{user.username}</h2>
                <p>Email: {user.email}</p>
                <p>Country: {user.country}</p>
                {/* Display other fields here */}
                <button onClick={handleEditClick}>Edit Profile</button>
                <button onClick={handleDeleteAccount} className="delete-button">
                  Delete User Account
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
