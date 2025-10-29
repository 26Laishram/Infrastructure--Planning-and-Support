import React, { useState, useEffect } from "react";
import { useAuth } from './AuthProvider';
import "../Styles/People.css"

function EditProfile({ profileId, onClose, onUpdate }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    role: "",
    email: "",
    website: "",
    responsibilities: "",
    photo: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing profile
  useEffect(() => {
    fetch(`http://localhost:5001/api/people/${profileId}`)
      .then(res => res.json())
      .then(profile => {
        setFormData(profile);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch failed:", err);
        setError("Failed to load profile");
      });
  }, [profileId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "photo") data.append(key, value);
      });
      if (photoFile) data.append("photo", photoFile);

      const token = user?.token;
      console.log("Token:", user?.token);


      const res = await fetch(`http://localhost:5001/api/people/${profileId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Do NOT set Content-Type
        },
        body: data,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Profile update failed");
      }

      const updatedProfile = await res.json();
      onUpdate(updatedProfile);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "20px", margin: "15px 0" }}>
      <h3>Edit Profile</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Photo preview */}
      <div style={{ marginBottom: "10px" }}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="New Preview"
            style={{ width: "170px", height: "220px", objectFit: "cover", borderRadius: "8px" }}
          />
        ) : formData.photo ? (
          <img
            src={`http://localhost:5001${formData.photo}`}
            alt={`Profile of ${formData.name}`}
            style={{ width: "170px", height: "220px", objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          <div style={{
            width: "170px",
            height: "220px",
            backgroundColor: "#ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
          }}>
            No photo
          </div>
        )}
      </div>
      <div className="addpho">
      {/* <label>Name</label> */}
      <input placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />

      {/* <label>Title</label> */}
      <input placeholder="Title" name="title" value={formData.title} onChange={handleChange} />

      {/* <label>Role</label> */}
      <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="deans">Deans</option>
          <option value="associate_deans">Associate Deans</option>
          <option value="faculty_in_charge">Faculty In-Charge</option>
          <option value="staff">Staff</option>
        </select>

      {/* <label>Email</label> */}
      <input placeholder="Email" name="email" value={formData.email} onChange={handleChange} />

      {/* <label>Website</label> */}
      <input placeholder="Website" name="website" value={formData.website} onChange={handleChange} />

      {/* <label>Research Areas</label> */}
      <textarea placeholder="Responsilibity" name="responsibilities" value={formData.responsibilities} onChange={handleChange} />

      <label>Upload New Photo</label>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
      </div>
    </form>
  );
}

export default EditProfile;
