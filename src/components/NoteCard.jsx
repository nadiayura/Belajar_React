import React, { useState, useEffect } from 'react';

const NoteCard = ({ note, darkMode, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = () => {
    if (timeElapsed < 60) {
      return `${timeElapsed} detik yang lalu`;
    } else if (timeElapsed < 3600) {
      return `${Math.floor(timeElapsed / 60)} menit yang lalu`;
    } else {
      return `${Math.floor(timeElapsed / 3600)} jam yang lalu`;
    }
  };
  
  const cardStyle = {
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-5px)' : 'none',
    boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)'
  };
  
  return (
    <div 
      className={`card h-100 bg-${note.backgroundColor} ${darkMode ? 'text-white' : ''}`}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body">
        <p className="card-text">{note.idea}</p>
        {isHovered && (
          <button 
            className="btn btn-sm btn-danger mt-2" 
            onClick={() => onDelete(note.id)}
          >
            Hapus
          </button>
        )}
      </div>
      
      <div className="card-footer text-muted bg-transparent">
        <small>{formatTime()}</small>
        {note.backgroundColor === "warning" && (
          <span className="badge bg-dark float-end">Penting</span>
        )}
        {note.backgroundColor === "info" && (
          <span className="badge bg-primary float-end">Informatif</span>
        )}
        {note.backgroundColor === "secondary" && (
          <span className="badge bg-light text-dark float-end">Umum</span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;