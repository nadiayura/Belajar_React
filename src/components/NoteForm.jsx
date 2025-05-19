import React, { useState, useEffect } from 'react';

const NoteForm = ({ addNote }) => {
  const [idea, setIdea] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('warning');
  const [charCount, setCharCount] = useState(0);
  const [formValid, setFormValid] = useState(false);
  
  useEffect(() => {
    setFormValid(idea.trim().length >= 5);
    setCharCount(idea.length);
  }, [idea]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formValid) {
      addNote({
        idea,
        backgroundColor
      });
      
      // Reset form
      setIdea('');
      setBackgroundColor('warning');
    }
  };
  
  const colorOptions = [
    { value: 'warning', label: 'Kuning', textClass: 'text-dark' },
    { value: 'secondary', label: 'Abu', textClass: 'text-white' },
    { value: 'info', label: 'Biru', textClass: 'text-dark' },
    { value: 'success', label: 'Hijau', textClass: 'text-white' },
    { value: 'danger', label: 'Merah', textClass: 'text-white' }
  ];
  
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Tambah Catatan Baru</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="idea" className="form-label">Ide/Catatan</label>
            <textarea
              id="idea"
              className="form-control"
              rows="3"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Tulis ide atau catatan Anda di sini..."
            ></textarea>
            
            <div className="form-text d-flex justify-content-between">
              <span>{charCount} karakter</span>
              {!formValid && idea.length > 0 && (
                <span className="text-danger">
                  Minimal 5 karakter ({5 - charCount < 0 ? 0 : 5 - charCount} lagi)
                </span>
              )}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Warna Latar Belakang</label>
            <div className="d-flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <div 
                  key={color.value}
                  className={`color-option bg-${color.value} ${color.textClass} p-2 rounded`}
                  style={{ 
                    cursor: 'pointer',
                    width: '80px',
                    textAlign: 'center',
                    border: backgroundColor === color.value ? '3px solid black' : 'none'
                  }}
                  onClick={() => setBackgroundColor(color.value)}
                >
                  {color.label}
                </div>
              ))}
            </div>
          </div>
          
          {idea && (
            <div className="mb-3">
              <label className="form-label">Preview:</label>
              <div className={`card bg-${backgroundColor} p-2`}>
                <div className="card-body">
                  <p className={`card-text ${backgroundColor === 'warning' || backgroundColor === 'info' ? 'text-dark' : 'text-white'}`}>
                    {idea}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!formValid}
          >
            Tambah Catatan
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;