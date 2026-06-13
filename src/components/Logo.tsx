import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "h-12 w-auto", 
  showText = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSource, setCurrentSource] = useState(0);

  // Multiple sources to try - try local sources first for faster loading
  const logoSources = [
    "/photo/Head logo.jpg", // Public folder with space
    "/photo/Head%20logo.jpg", // URL encoded version
    "http://localhost:5000/photos/Head%20logo.jpg" // Backend server (fallback)
  ];

  const logoUrl = logoSources[currentSource] || logoSources[0];
  
  const handleImageError = () => {
    if (currentSource < logoSources.length - 1) {
      setCurrentSource(currentSource + 1);
    } else {
      setImageError(true);
    }
  };
  
  return (
    <Link to="/" className="flex items-center">
      {!imageError ? (
        <img 
          src={logoUrl}
          alt="MPSS Logo" 
          className={`${className} object-contain`}
          onError={handleImageError}
        />
      ) : null}
      
      {showText && (
        <span className={`text-2xl font-bold text-gray-900 ${!imageError ? 'ml-2' : ''}`}>
          MPSS
        </span>
      )}
    </Link>
  );
};

export default Logo; 