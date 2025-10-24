import React, { useState, useEffect } from "react";
import { useAuth } from './AuthProvider';  // Import useAuth to access auth context

function EditProfile({ profileId, onClose, onUpdate }) {
  const { user } = useAuth();  // Get logged-in user (token + role)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    role: "",
    email: "",
    website: "",
    researchAreas: "",
    photo: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/people/${profileId}`)
      .then(res => res.json())
      .then(profile => {
        setFormData(profile);
        setLoading(false);
      });
  }, [profileId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`http://localhost:5001/api/people/${profileId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`  // Attach token here
      },
      body: JSON.stringify(formData)
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then(updatedProfile => {
        onUpdate(updatedProfile);
        onClose();
      })
      .catch(err => {
        console.error("Update failed", err);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "20px", margin: "15px 0" }}>
      <h3>Edit Profile</h3>
      <label>Name</label>
      <input name="name" value={formData.name} onChange={handleChange} />
      
      <label>Title</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      
      <label>Role</label>
      <input name="role" value={formData.role} onChange={handleChange} />
      
      <label>Email</label>
      <input name="email" value={formData.email} onChange={handleChange} />
      
      <label>Website</label>
      <input name="website" value={formData.website} onChange={handleChange} />
      
      <label>Research Areas</label>
      <textarea name="researchAreas" value={formData.researchAreas} onChange={handleChange} />
      
      <label>Photo URL</label>
      <input name="photo" value={formData.photo} onChange={handleChange} />
      
      <button type="submit">Save</button> <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default EditProfile;
