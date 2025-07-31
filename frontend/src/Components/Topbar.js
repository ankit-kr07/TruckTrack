import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import '../styles/Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const commands = [
    {
      command: 'show *',
      callback: (section) => {
        alert(`Showing ${section}`); 
        // Replace alert with actual logic or toast
      }
    },
    {
      command: 'add fuel log',
      callback: () => {
        alert('Adding a fuel log');
      }
    },
    {
      command: 'start inspection',
      callback: () => {
        alert('Starting inspection');
      }
    }
  ];

  const { browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition({ commands });

  const toggleListening = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
      setListening(true);
    } else {
      SpeechRecognition.stopListening();
      setListening(false);
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div className="topbar-wrapper">
      <header className="topbar">
        <button className="btn btn-light d-md-none" onClick={toggleSidebar}>
          ☰
        </button>

        <h4 className='top-bar-title'>TruckTrack</h4>

        <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Voice assistant mic toggle */}
          <button
            onClick={toggleListening}
            title={listening ? 'Stop Voice Assistant' : 'Start Voice Assistant'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: listening ? 'red' : 'black',
            }}
            aria-label="Toggle voice assistant"
          >
            {listening ? '🎙️' : '🎤'}
          </button>

          {isAuthenticated && (
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Topbar;
