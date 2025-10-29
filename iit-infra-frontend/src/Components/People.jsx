import React, { useState, useEffect, useRef } from "react";
import PeopleCategories from "./PeopleCategories";
import EditProfile from "./EditProfile";
import { useAuth } from "./AuthProvider";
import Modal from "./Modal";
import "../Styles/People.css";
import trash from "../Images/trash.png";

const departmentKeys = ["deans", "associate_deans", "faculty_in_charge", "staff"];

function People() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfileId, setEditingProfileId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newProfileData, setNewProfileData] = useState({
    name: "",
    role: "",
    title: "",
    email: "",
    website: "",
    photo: "",
    responsibilities: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const token = user?.token;

  const sectionRefs = {
    Deans: useRef(null),
    associate_deans: useRef(null),
    faculty_in_charge: useRef(null),
    staff: useRef(null),
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/people")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (key) => {
    setTimeout(() => {
      sectionRefs[key].current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const byRole = (role) => profiles.filter((p) => p.role === role);

  const handleUpdateProfile = (updatedProfile) => {
    setProfiles((prev) =>
      prev.map((p) => (p._id === updatedProfile._id ? updatedProfile : p))
    );
  };

  const handleNewProfileChange = (e) => {
    setNewProfileData({ ...newProfileData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleAddProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("You must be logged in as admin to add profiles.");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in newProfileData) formData.append(key, newProfileData[key]);
      if (photoFile) formData.append("photo", photoFile);

      const res = await fetch("http://localhost:5001/api/people", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add profile");
      }

      const addedProfile = await res.json();
      setProfiles((prev) => [...prev, addedProfile]);
      setNewProfileData({
        name: "",
        role: "",
        title: "",
        email: "",
        website: "",
        photo: "",
        responsibilities: "",
      });
      setPhotoFile(null);
      setAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="people-container">
      {user?.role === "admin" && (
        <div className="add-section">
          {!adding ? (
            <button className="add-btn" onClick={() => setAdding(true)}>
              + Add New Profile
            </button>
          ) : (
            <Modal onClose={() => setAdding(false)}>
              <form onSubmit={handleAddProfileSubmit} className="add-form">
                {error && <p className="error">{error}</p>}
                {Object.keys(newProfileData).map((key) => {
  if (key === "photo") return null;

  if (key === "role") {
    return (
      <select
        key={key}
        name={key}
        value={newProfileData[key]}
        onChange={handleNewProfileChange}
        required
      >
        <option value="">Select Department</option>
        <option value="deans">Deans</option>
        <option value="associate_deans">Associate Deans</option>
        <option value="faculty_in_charge">Faculty In-Charge</option>
        <option value="staff">Staff</option>
      </select>
    );
  }

  return (
    <input
      key={key}
      name={key}
      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
      value={newProfileData[key]}
      onChange={handleNewProfileChange}
      required={key === "name"}
    />
  );
})}

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <div className="form-btns">
                  <button type="submit">Add</button>
                  <button type="button" onClick={() => setAdding(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      )}

      <PeopleCategories onCategorySelect={handleCategorySelect} />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        departmentKeys.map((key) => (
          <div key={key} ref={sectionRefs[key]} className="department-section">
            <h2 className="dept-title">
  {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} 
</h2>

            <div className="profiles-grid">
              {byRole(key).length === 0 ? (
                <div className="empty">No members found.</div>
              ) : (
                byRole(key).map((profile) => (
                  <div className="profile-card" key={profile._id}>
                    <div className="profile-info">
                      {profile.photo ? (
                        <img
                          src={`http://localhost:5001${profile.photo}`}
                          alt={profile.name}
                          className="profile-photo"
                        />
                      ) : (
                        <div className="photo-placeholder">No photo</div>
                      )}

                      <div className="profile-text">
                        <h3>{profile.name}</h3>
                        <p>{profile.title}</p>
                        <p>{profile.responsibilities}</p>
                        <a href={`mailto:${profile.email}`}>{profile.email}</a>
                        <br />
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        
                        </a>
                      </div>
                    </div>

                    {user?.role === "admin" && (
                      <div className="admin-actions">
                        <button
                          className="edit-btn"
                          onClick={() => setEditingProfileId(profile._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={async () => {
                            const confirmed = window.confirm(
                              `Delete ${profile.name}?`
                            );
                            if (!confirmed) return;

                            try {
                              const res = await fetch(
                                `http://localhost:5001/api/people/${profile._id}`,
                                {
                                  method: "DELETE",
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              );
                              if (!res.ok) throw new Error("Failed to delete");
                              setProfiles((prev) =>
                                prev.filter((p) => p._id !== profile._id)
                              );
                              alert("Profile deleted!");
                            } catch (err) {
                              alert(err.message);
                            }
                          }}
                        >
                          <img src={trash} alt="Delete" />
                        </button>
                      </div>
                    )}

                    {editingProfileId === profile._id && (
                      <Modal onClose={() => setEditingProfileId(null)}>
                        <EditProfile
                          profileId={profile._id}
                          onClose={() => setEditingProfileId(null)}
                          onUpdate={handleUpdateProfile}
                        />
                      </Modal>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default People;
