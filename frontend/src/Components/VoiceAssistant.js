// src/components/VoiceAssistant.js
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      handleVoiceCommand(transcript.toLowerCase());
      resetTranscript();
    }
  }, [listening]);

  const handleVoiceCommand = (text) => {
    if (text.includes('show') && text.includes("today's logs")) {
      navigate('/daily-logs');
    } else if (text.includes('add fuel log')) {
      navigate('/fuel-log');
    } else if (text.includes('start inspection')) {
      navigate('/truck-inspection');
    } else {
      alert("Sorry, I didn't understand that.");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div>
      <button
        onClick={SpeechRecognition.startListening}
        className="p-2 bg-blue-600 text-white rounded"
      >
        🎙️ Start Voice Command
      </button>
      {listening && <p>Listening... speak now</p>}
    </div>
  );
};

export default VoiceAssistant;
