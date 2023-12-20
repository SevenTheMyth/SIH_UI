import React, {useContext, useState} from 'react';
import { styled } from '@mui/system';
import { Box, TextField, Paper, IconButton, InputAdornment, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import { ReactMic } from 'react-mic'; 
import { keyframes } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import { ChangeCircle } from '@mui/icons-material';
import { ThemeContext } from '@emotion/react';

const StyledTextField = styled(TextField)({ 
  position: 'relative',
  width: '100%',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(20px)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  color: '#efefef',
  '& input': {
    color: '#efefef',
    '&::placeholder': {
      color: '#fff',
    },
  },
  '&:hover': { border: 'none', borderBottom: '1px solid primary' },
        '&:hover::before': {
          borderColor: '#213', 
        },
});

const InputBar = ({ placeholder = 'Hello, I am Unity. Ask me anything regarding your database cluster.', onSubmit }) => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate(); 
  const [inputValue, setInputValue] = useState('');
  const [record, setRecord] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [convertedText, setConvertedText] = useState('');

  const handleAudioRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(mediaStream);
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000); // Set the recording duration (e.g., 5 seconds)
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const cancelRecording = () => {
    // Logic to cancel audio recording
    setRecording(false);
    // Additional actions, if needed
  };

  const handleSubmit = async () => {
    if (audioBlob) {
      const recognition = new window.webkitSpeechRecognition(); // Create a SpeechRecognition instance
  
      // Set recognition properties
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
  
      // Create a Promise to resolve when the recognition result is available
      const recognitionResult = new Promise((resolve, reject) => {
        recognition.onresult = (event) => {
          const result = event.results[0][0].transcript;
          resolve(result);
        };
  
        recognition.onerror = (event) => {
          reject(event.error);
        };
      });
  
      // Convert audioBlob to audio URL
      const audioUrl = URL.createObjectURL(audioBlob);
  
      // Prepare audio data for recognition
      const audio = new Audio(audioUrl);
      const audioTrack = audio.captureStream().getAudioTracks()[0];
      const audioStream = new MediaStream([audioTrack]);
  
      // Start recognition with the audio stream
      recognition.start();
      recognition.onend = () => {
        recognition.stop();
        audioTrack.stop();
        audio.pause();
      };
  
      try {
        // Wait for the recognition result
        const textFromAudio = await recognitionResult;
        setInputValue(textFromAudio); // Set the converted text as input value
      } catch (error) {
        console.error('Error in audio-to-text conversion:', error);
      }
    }
  };

  const handleStartRecording = () => {
    setRecord(true);
  };

  const handleStopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob);
  };

  const borderAnimation = keyframes({
    '0%': {
      boxShadow: '0 8px 50px 0 rgba(31, 81, 255, 0.37)',
    },
    '25%': {
      boxShadow: '0 8px 50px 0 rgba(188, 19, 254, 0.37)',
    },
    '50%': {
      boxShadow: '0 8px 50px 0 rgba(57, 255, 20, 0.37)',
    },
    '75%': {
      boxShadow: '0 8px 50px 0 rgba(224, 231, 34, 0.37)',
    },
    '100%': {
      boxShadow: '0 8px 50px 0 rgba(31, 81, 255, 0.37)',
    },
  });
  
  return (
    <Box sx={{ display: 'flex', justifyConetnt: 'space-between', alignItems: 'center', zIndex: '10', gap: '10px' }}>
    <IconButton variant="filled" onClick={handleAudioRecording} title="Switch to another vault"
          sx={{ width: '55px', height: '55px', borderRadius: '8px', padding: '10px',
          backgroundColor: theme === 'dark-theme' ? 'rgba(50, 50, 55, 0.25)': 'rgba(18, 19, 30)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.18)',
          '&:hover': {  backgroundColor: theme === 'dark-theme' ? 'rgba(50, 50, 55, 0.25)': 'rgba(18, 19, 30)', animation: `${borderAnimation} 1s linear infinite`, transition: 'box-shadow 1s linear',
          '&[title]::after': { content: 'attr(title)', position: 'absolute', backgroundColor: 'rgba(50, 50, 55, 0.25)', 
          color: '#efefef', borderRadius: '4px', fontSize: '14px', lineHeight: '28px', padding: '0 8px', 
          height: '28px', width: 'auto', zIndex: 1, top: '100%', left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.3s ease' }, '&:hover::after': { opacity: 1 } }
        }}>
          <ChangeCircle color="primary" sx={{ color: '#efefef' }} />
        </IconButton>
    <Paper 
      sx={{
        position: 'relative', display: 'flex', alignItems: 'center', width: '750px', minHeight: '50px',
        backgroundColor: theme === 'dark-theme' ? 'rgba(50, 50, 55, 0.25)': 'rgba(18, 19, 30)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(20px)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.18)',
        color: '#efefef','&:hover': { border: 'none', borderBottom: '1px solid primary',
        animation: `${borderAnimation} 1s linear infinite`, transition: 'box-shadow 1s linear', },
        '&:hover::before': { borderColor: '#213',},}}
      >
      <StyledTextField
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" variant="filled" onClick={handleSubmit}>
                <SendIcon color="primary" sx={{ color: '#efefef' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
    {recording && (
          <Button
            variant="text"
            color="secondary"
            onClick={cancelRecording}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        )}
        <IconButton color="primary" variant="filled" onClick={handleAudioRecording} title="Press and hold for audio input"
          sx={{ width: '55px', height: '55px', borderRadius: '8px', padding: '10px',
          backgroundColor: theme === 'dark-theme' ? 'rgba(50, 50, 55, 0.25)': 'rgba(18, 19, 30)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.18)',
          '&:hover': { backgroundColor: theme === 'dark-theme' ? 'rgba(50, 50, 55, 0.25)': 'rgba(18, 19, 30)', animation: `${borderAnimation} 1s linear infinite`, transition: 'box-shadow 1s linear',
          '&[title]::after': { content: 'attr(title)', position: 'absolute', backgroundColor: 'rgba(50, 50, 55, 0.25)', 
          color: '#efefef', borderRadius: '4px', fontSize: '14px', lineHeight: '28px', padding: '0 8px', 
          height: '28px', width: 'auto', zIndex: 1, top: '100%', left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.3s ease' }, '&:hover::after': { opacity: 1 } }
        }}>
          <MicIcon color="primary" sx={{ color: '#efefef' }} />
        </IconButton>
      {convertedText && <div>{convertedText}</div>}
      {recording && <div>Recording in progress... <audio controls src={audioBlob} /></div>} 
    </Box>
  );
};

export default InputBar;
