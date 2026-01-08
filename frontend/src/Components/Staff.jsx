
import react from "react"

const StaffCard = ({ name, title, imageUrl, email }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full
                    hover:shadow-lg cursor-pointer transition-shadow duration-300 ease-in-out">
      <div className="p-4 flex items-start border-b border-gray-100">
        <div className="flex-shrink-0 mr-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite fallback loop
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                }}
              />
            ) : null}
            <div className={`text-4xl text-indigo-200 ${imageUrl ? 'hidden' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-indigo-600 truncate">{title}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 text-sm flex-grow">
        {email && (
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            <a href={`mailto:${email}`} className="text-indigo-600 hover:underline truncate">{email}</a>
          </div>
        )}
      </div>
    </div>
  );
};



export default StaffCard;