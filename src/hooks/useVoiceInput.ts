// src/hooks/useVoiceInput.ts
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVoiceInputReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useVoiceInput(): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);

  const [isSupported] = useState(
    () =>
      typeof window !== 'undefined' &&
      !!(window.SpeechRecognition || window.webkitSpeechRecognition),
  );

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    // Stop any existing instance
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setError(null);
    setTranscript('');

    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = '';
      let interimText = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result && result[0]) {
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }
      }

      setTranscript(finalText + interimText);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed') {
        setError('Microphone access denied');
      } else if (event.error !== 'aborted') {
        setError('Voice input error');
      }
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      // Auto-restart if user hasn't explicitly stopped
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch {
          // Recognition already started or other error — stop gracefully
          isListeningRef.current = false;
          setIsListening(false);
          recognitionRef.current = null;
        }
      } else {
        recognitionRef.current = null;
      }
    };

    recognitionRef.current = recognition;
    isListeningRef.current = true;
    setIsListening(true);

    try {
      recognition.start();
    } catch {
      setError('Failed to start voice input');
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
    }
  }, [isSupported]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        isListeningRef.current = false;
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
