import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PeopleCategories from "./PeopleCategories";
import Modal from "./Modal";

const departmentKeys = [
  "deans",
  "associate_deans",
  "faculty_in_charge",
  "engineers",
  "staff",
];

export default function People() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResp, setShowResp] = useState(null);

  const sectionRefs = {
    deans: useRef(null),
    associate_deans: useRef(null),
    faculty_in_charge: useRef(null),
    engineers: useRef(null),
    staff: useRef(null),
  };

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          "https://opensheet.elk.sh/1DKZ5V2yOgGqSze5d0Yt6g881X6tBZ19qoJl8J2-Kh9w/People"
        );

        const cleaned = res.data.map((item) => ({
          ...item,
          weight: Number(item.weight) || 0,
        }));

        // sort once globally
        const sorted = cleaned.sort((a, b) => a.weight - b.weight);
        setProfiles(sorted);
      } catch (err) {
        console.error("❌ Failed to load people sheet:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCategorySelect = (key) => {
    setTimeout(() => {
      sectionRefs[key].current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const byRole = (role) =>
    profiles
      .filter((p) => p.role === role)
      .sort((a, b) => a.weight - b.weight);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PeopleCategories onCategorySelect={handleCategorySelect} />

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        departmentKeys.map((key) => {
          const group = byRole(key);

          return (
            <div key={key} ref={sectionRefs[key]} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {group.length === 0 ? (
                  <div className="text-gray-500 col-span-full text-center">
                    No members found.
                  </div>
                ) : (
                  group.map((profile, i) => (
                    <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="w-40 h-40 mx-auto bg-gray-100 rounded overflow-hidden">
                          <img
                            src={profile.photo}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold mt-3">
                          {profile.name}
                        </h3>
                        <p className="text-indigo-600">{profile.title}</p>

                        {profile.responsibilities && (
                          <button
                            onClick={() => setShowResp(profile)}
                            className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded mt-2"
                          >
                            Responsibilities
                          </button>
                        )}
                      </div>
                      <div className="bg-gray-50 p-4 text-sm">
                        {profile.email && (
                          <a
                            href={`mailto:${profile.email}`}
                            className="text-indigo-600 hover:underline"
                          >
                            {profile.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })
      )}

      {showResp && (
        <Modal onClose={() => setShowResp(null)}>
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-3">
              {showResp.name} — Responsibilities
            </h3>
            <p className="whitespace-pre-line">
              {showResp.responsibilities}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
