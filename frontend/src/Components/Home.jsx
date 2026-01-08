import React, { useEffect, useState } from "react";
import AltCarousel from "./Carousel/AltCarousel";
import ips1 from "../assets/ips1.jpg"
import ips2 from "../assets/ips2.jpg"
import ips3 from "../assets/ips3.jpg"
import ips4 from "../assets/ips4.jpg"

const Home = () => {
  const [driveImages, setDriveImages] = useState([ips1,ips2,ips3,ips4]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-slate-300">

      {/* Banner / Carousel */}
      <div id="home-top" className="px-4 py-6 md:px-8">
        <AltCarousel images={driveImages} />
      </div>

      {/* IPS Section */}
      <div className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Infrastructure and Planning Section (IPS)
        </h2>

        <p className="text-slate-700 leading-relaxed mb-6">
          IPS section handles <span className="font-medium">Civil, Electrical, HVAC, Plumbing, 
          Sewage Treatment Plant, and Networking</span> works across the institute.
          The long-term plan is to make <span className="font-semibold">IIT Dharwad a Net Zero Campus</span> 
          by <span className="font-semibold">2030</span> with respect to Energy, Water, and Waste.
        </p>

        {/* Contact Info */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-300 shadow-sm rounded-lg p-5 mb-5">
          <p className="font-semibold text-slate-800 mb-1">Contact Details</p>
          <p className="text-slate-700">Dean IPS Office: <span className="font-medium">8362309606</span></p>
          <p className="text-slate-700">Email: <span className="font-medium">dean.ips.office@iitdh.ac.in</span></p>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 border border-red-200 p-5 rounded-lg">
          <p className="font-semibold text-red-800 mb-1">Emergency Contacts</p>
          <p className="text-red-700">Fire: 8050249177</p>
          <p className="text-red-700">Power Failure: 6364869644</p>
          <p className="text-red-700">Water Unavailability: 6364869645</p>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="px-6 py-8 max-w-5xl mx-auto text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Access</h3>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://ccshelpdesk.iitdh.ac.in/login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg shadow-md transition duration-200"
          >
            CCS Helpdesk Ticket Request
          </a>

          <a
            href="https://cims.iitdh.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg shadow-md transition duration-200"
          >
            CIMS Work Request
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
