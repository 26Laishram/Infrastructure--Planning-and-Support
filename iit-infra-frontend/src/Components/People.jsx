import React, { useState, useEffect, useRef } from "react";
import PeopleCategories from "./PeopleCategories";
import EditProfile from "./EditProfile";
import { useAuth } from './AuthProvider'; 

const departmentKeys = ["civil", "mechanical", "electrical", "ccs"];

function People() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfileId, setEditingProfileId] = useState(null);
  const [adding, setAdding] = useState(false); 
  const [newProfileData, setNewProfileData] = useState({
    name: '',
    role: '',
    title: '',
    email: '',
    website: '',
    photo: '',
    researchAreas: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState('');

  const { user } = useAuth();
const token = user?.token;
 

  const sectionRefs = {
    civil: useRef(null),
    mechanical: useRef(null),
    electrical: useRef(null),
    ccs: useRef(null),
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
    setError('');
  
    if (!token) {
      setError('You must be logged in as admin to add profiles.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', newProfileData.name);
      formData.append('role', newProfileData.role);
      formData.append('title', newProfileData.title);
      formData.append('email', newProfileData.email);
      formData.append('website', newProfileData.website);
      formData.append('researchAreas', newProfileData.researchAreas);
      if (photoFile) formData.append('photo', photoFile);
  
      const res = await fetch('http://localhost:5001/api/people', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // Do NOT set Content-Type header here
        },
        body: formData,
      });
  
      if (!res.ok) {
        let errMsg = 'Failed to add profile';
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const err = await res.json();
          errMsg = err.error || err.message || errMsg;
        } else {
          const text = await res.text();
          errMsg = text || errMsg;
        }
        throw new Error(errMsg);
      }
      
  
      const addedProfile = await res.json();
      setProfiles((prev) => [...prev, addedProfile]);
      setNewProfileData({
        name: '',
        role: '',
        title: '',
        email: '',
        website: '',
        photo: '',
        researchAreas: '',
      });
      setPhotoFile(null);
      setAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div>
       {user?.role === "admin" && (
        <div style={{ marginBottom: "20px" }}>
          {!adding ? (
            <button onClick={() => setAdding(true)}>Add New Profile</button>
          ) : (
            <form onSubmit={handleAddProfileSubmit} style={{ padding: '10px', border: '1px solid #ccc', marginTop: '10px' }}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input
                name="name"
                placeholder="Name"
                value={newProfileData.name}
                onChange={handleNewProfileChange}
                required
              />
              <input
                name="role"
                placeholder="Role"
                value={newProfileData.role}
                onChange={handleNewProfileChange}
                required
              />
              <input
                name="title"
                placeholder="Title"
                value={newProfileData.title}
                onChange={handleNewProfileChange}
              />
              <input
                name="email"
                placeholder="Email"
                value={newProfileData.email}
                onChange={handleNewProfileChange}
              />
              <input
                name="website"
                placeholder="Website"
                value={newProfileData.website}
                onChange={handleNewProfileChange}
              />
               <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <input
                name="researchAreas"
                placeholder="Research Areas"
                value={newProfileData.researchAreas}
                onChange={handleNewProfileChange}
              />
              <div style={{ marginTop: "10px" }}>
                <button type="submit">Add Profile</button>
                <button type="button" onClick={() => setAdding(false)} style={{ marginLeft: "10px" }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}
      <PeopleCategories onCategorySelect={handleCategorySelect} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        departmentKeys.map((key) => (
          <div key={key} ref={sectionRefs[key]} style={{ marginTop: "45px" }}>
            <h2 style={{ color: "#1a2958" }}>
              {key.charAt(0).toUpperCase() + key.slice(1)} Department
            </h2>
            <div className="prof" style={{ display: "grid", gap: "20px", gridTemplateColumns: "550px 550px" }}>
            {byRole(key).length === 0 ? (
              <div>No members found.</div>
            ) : (
              byRole(key).map((profile) => (
                <div
                  key={profile._id}
                  style={{
                    boxShadow: "0px 0px 10px lightgray",
                    width: "550px",
                    padding: "10px",
                    margin: "10px",
                    display: "flex",
                    gap: "20px",
                    alignItems: "left",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  {profile.photo ? (
  <img
  src={profile.photo ? `http://localhost:5001${profile.photo}` : null}
    alt={`Profile of ${profile.name}`}
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

                    <div>
                      <h3>{profile.name}</h3>
                      <p>{profile.title}</p>
                      <p>{profile.researchAreas}</p>
                      <a href={`mailto:${profile.email}`}>{profile.email}</a>
                      <br />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </div>
                  </div>
                  {user?.role === "admin" && (
                    <button style={{ marginTop: "10px" }} onClick={() => setEditingProfileId(profile._id)}>
                      Edit
                    </button>
                  )}
                  {editingProfileId === profile._id && (
                    <EditProfile
                      profileId={profile._id}
                      onClose={() => setEditingProfileId(null)}
                      onUpdate={handleUpdateProfile}
                    />
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
