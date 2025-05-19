import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      idea: "Dalam bisnis, sales adalah hal yang terpenting",
      backgroundColor: "warning"
    },
    {
      id: 2,
      idea: "Dalam bisnis memerlukan banyak modal",
      backgroundColor: "secondary"
    },
    {
      id: 3,
      idea: "Inovasi adalah kunci kesuksesan",
      backgroundColor: "info"
    }
  ]);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode]);

  const addNote = (newNote) => {
    setNotes([...notes, { ...newNote, id: notes.length + 1 }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container py-4 ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Collect Notes Nana <img src="/icon.png" alt="icon nana" width={40} height={40}/></h1>
        <button 
          className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`} 
          onClick={toggleTheme}
        >
          <i class={darkMode ? 'bi bi-brightness-high' : 'bi bi-moon-stars'}></i>
        </button>
      </header>
      
      <NoteForm addNote={addNote} />
      
      <div className="row g-4 mt-3">
        {notes.map(note => (
          <div className="col-md-4" key={note.id}>
            <NoteCard 
              note={note} 
              darkMode={darkMode}
              onDelete={deleteNote}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;