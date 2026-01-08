import React from 'react';
import { Link } from 'react-scroll';
import { Mail, Globe } from "lucide-react";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function  FacultyCard ({ name, title, imageUrl, expertise, email, website }) {
  // console.log(JSON.stringify(title))
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full
                    hover:shadow-lg cursor-pointer transition-shadow duration-300 ease-in-out">
      {/* Image Section */}
      <div className="w-48 h-48 mx-auto mt-4 mb-2 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              e.target.parentNode.classList.add("flex", "items-center", "justify-center");
            }}
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 
              .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 
              0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Text Section */}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-indigo-600 font-medium">
          {title.split('//').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        {expertise && (
          <div className="mt-2">
            <p className="text-sm text-gray-700 font-medium">Research Areas</p>
            <div className="text-sm text-gray-600 whitespace-pre-line">
              {expertise}
            </div>
          </div>
        )}


      </div>

      {/* Contact Section */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-1">
        {email && (
          <div className="flex items-center text-sm text-gray-700">
            <Mail className="w-4 h-4 mr-2 text-gray-500" />
            <a href={`mailto:${email}`} className="text-indigo-600 hover:underline truncate">
              {email}
            </a>
          </div>
        )}

        {website && (
          <div className="flex items-center text-sm text-gray-700">
            <Globe className="w-4 h-4 mr-2 text-gray-500" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline truncate">
              Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
};