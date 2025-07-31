import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import '../styles/Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listening, setListening] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const commands = [
    {
      command: 'show *',
      callback: (section) => {
        toast.info(`Showing ${section}`);
        // Add your logic to show logs or other sections
      }
    },
    {
      command: 'add fuel log',
      callback: () => {
        toast.info('Adding a fuel log');
        // Add your logic to open fuel log form
      }
    },
    {
      command: 'start inspection',
      callback: () => {
        toast.info('Starting inspection');
        // Add your logic to start inspection process
      }
    }
  ];

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

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
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div className="app-container d-flex" style={{ minHeight: '100vh', backgroundColor: 'var(--color-orange)', color: 'var(--color-black)' }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div className="sidebar-overlay d-md-none" onClick={closeSidebar}></div>
      )}

      <div className="main-content flex-grow-1 d-flex flex-column">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="page-content p-0" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)', flex: 1 }}>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>

        {/* Floating Voice Assistant Button */}
        <button
          onClick={toggleListening}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            borderRadius: '50%',
            width: 60,
            height: 60,
            backgroundColor: listening ? 'red' : 'green',
            color: 'white',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          aria-label="Toggle voice assistant"
          title="Toggle Voice Assistant"
        >
          {listening ? '🎙️' : '🎤'}
        </button>
      </div>
    </div>
  );
};

export default Layout;
