# Voice Input Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add speech-to-text voice input to all chat channels using the browser-native Web Speech API.

**Architecture:** A custom `useVoiceInput` hook encapsulates all Web Speech API logic. `ChatInput` wires it in, replacing the existing placeholder mic button. Voice state stays local to the component — no store changes needed.

**Tech Stack:** React 19, TypeScript, MUI 7, Web Speech API (browser native)

**Spec:** `docs/superpowers/specs/2026-03-18-voice-input-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/types/speech-recognition.d.ts` | TypeScript ambient declarations for Web Speech API |
| Create | `src/hooks/useVoiceInput.ts` | Custom hook: SpeechRecognition lifecycle, transcript assembly, state |
| Modify | `src/components/chat/ChatInput.tsx` | Wire in hook, replace placeholder mic, add listening UI |

---

### Task 1: TypeScript Type Declarations

**Files:**
- Create: `src/types/speech-recognition.d.ts`

- [ ] **Step 1: Create the type declaration file**

Note: The project uses `moduleDetection: "force"` in tsconfig, which treats every file as a module. We must use `declare global {}` with `export {}` for the global augmentation to work.

```ts
// src/types/speech-recognition.d.ts
export {};

declare global {
  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
  }

  interface SpeechRecognitionConstructor {
    new (): SpeechRecognition;
  }

  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}
```

- [ ] **Step 2: Verify TypeScript picks it up**

Run: `cd /Users/apple/Documents/Workspace/Projects/conversational-ux-prototype && npx tsc -b --noEmit`
Expected: No new errors (existing build should still pass)

- [ ] **Step 3: Commit**

```bash
git add src/types/speech-recognition.d.ts
git commit -m "feat: add TypeScript declarations for Web Speech API"
```

---

### Task 2: useVoiceInput Hook

**Files:**
- Create: `src/hooks/useVoiceInput.ts`

- [ ] **Step 1: Create the hook file**

```ts
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
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/apple/Documents/Workspace/Projects/conversational-ux-prototype && npx tsc -b --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useVoiceInput.ts
git commit -m "feat: add useVoiceInput hook with Web Speech API"
```

---

### Task 3: ChatInput Integration

**Files:**
- Modify: `src/components/chat/ChatInput.tsx`

- [ ] **Step 1: Update imports**

Add to the existing imports at the top of `ChatInput.tsx`:

Update the existing React import to include `useEffect`:
```tsx
import React, { useState, useEffect } from 'react';
```

Add `keyframes` to the existing `@mui/material` import (append to the destructured list on line 3-5):
```tsx
import {
  Box, TextField, IconButton, Chip, Tooltip, Menu, MenuItem, ListItemIcon,
  ListItemText, Typography, keyframes,
} from '@mui/material';
```

Add the hook import after the MUI icon imports:
```tsx
import { useVoiceInput } from '../../hooks/useVoiceInput';
```

- [ ] **Step 2: Add pulse animation keyframes**

Add after the `taskMenuItems` array (after line 31), before the component function:

```tsx
const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;
```

- [ ] **Step 3: Wire up hook and update state management**

Inside the `ChatInput` component function, replace the existing state and handler code (lines 34-53):

```tsx
export default function ChatInput({ onSend, showChips = false, placeholder, disabled = false, disabledMessage }: ChatInputProps) {
  const [typedText, setTypedText] = useState('');
  const [taskAnchor, setTaskAnchor] = useState<null | HTMLElement>(null);
  const {
    isListening, transcript, isSupported, error,
    startListening, stopListening, resetTranscript,
  } = useVoiceInput();

  // Merge transcript into typedText when user stops recording
  useEffect(() => {
    if (!isListening && transcript) {
      setTypedText((prev) => prev + transcript);
      resetTranscript();
    }
  }, [isListening, transcript, resetTranscript]);

  // Compute display value: typed text + live voice transcript
  const displayValue = isListening ? typedText + transcript : typedText;

  const handleSend = () => {
    // If recording, stop and merge first
    if (isListening) {
      stopListening();
    }
    const fullText = (typedText + transcript).trim();
    if (!fullText) return;
    onSend(fullText);
    setTypedText('');
    resetTranscript();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
```

- [ ] **Step 4: Replace the mic button placeholder**

Replace the existing mic button block (lines 105-109 in the original):

```tsx
<Tooltip title="Coming soon">
  <IconButton size="small" sx={{ color: '#6B7280' }}>
    <Mic sx={{ fontSize: 20 }} />
  </IconButton>
</Tooltip>
```

With:

```tsx
<Tooltip
  title={
    !isSupported
      ? 'Voice input is not supported in this browser'
      : error
        ? error
        : isListening
          ? 'Stop voice input'
          : 'Start voice input'
  }
>
  <span>
    <IconButton
      size="small"
      onClick={handleMicClick}
      disabled={!isSupported || disabled}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      sx={{
        color: isListening ? '#EF4444' : '#6B7280',
        animation: isListening ? `${pulseAnimation} 1.5s infinite` : 'none',
        borderRadius: '50%',
        '&:hover': {
          bgcolor: isListening ? '#FEE2E2' : undefined,
        },
      }}
    >
      <Mic sx={{ fontSize: 20 }} />
    </IconButton>
  </span>
</Tooltip>
```

Note: The `<span>` wrapper is needed because MUI Tooltip doesn't work on disabled elements directly.

- [ ] **Step 5: Add "Listening..." indicator**

Add right after the mic button `</Tooltip>` and before the `<TextField>`:

```tsx
{isListening && (
  <Typography
    variant="caption"
    aria-live="polite"
    sx={{
      color: '#EF4444',
      fontSize: 12,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      animation: 'fadeIn 0.3s ease-in',
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    }}
  >
    Listening...
  </Typography>
)}
```

- [ ] **Step 6: Update TextField value and onChange**

In the `<TextField>` component, update the `value` and `onChange` props:

Change:
```tsx
value={value}
onChange={(e) => setValue(e.target.value)}
```

To:
```tsx
value={displayValue}
onChange={(e) => {
  if (!isListening) {
    setTypedText(e.target.value);
  }
  // While listening, the field is effectively read-only for typing
  // (voice transcript updates the display value via the hook)
}}
```

Note: During active listening, the field displays `typedText + transcript` and user edits are ignored. The user can edit freely once they stop recording and the transcript is merged.

- [ ] **Step 7: Update Send button disabled state**

Change:
```tsx
disabled={!value.trim()}
```

To:
```tsx
disabled={!displayValue.trim()}
```

And change:
```tsx
color: value.trim() ? '#2563EB' : '#999',
```

To:
```tsx
color: displayValue.trim() ? '#2563EB' : '#999',
```

- [ ] **Step 8: Verify build passes**

Run: `cd /Users/apple/Documents/Workspace/Projects/conversational-ux-prototype && npx tsc -b --noEmit`
Expected: No errors

- [ ] **Step 9: Run dev server and manually test**

Run: `cd /Users/apple/Documents/Workspace/Projects/conversational-ux-prototype && npm run dev`

Manual test checklist:
1. Open in Chrome → mic button is enabled (gray)
2. Click mic → icon turns red with pulse, "Listening..." appears
3. Speak → words appear live in input field
4. Click mic again → recording stops, text stays in field
5. Edit the transcribed text → works normally
6. Press Enter or Send → message sends
7. Type text first, then use voice → voice appends after typed text
8. Press Send while recording → stops recording and sends combined text
9. Open in Firefox → mic button is disabled with tooltip

- [ ] **Step 10: Commit**

```bash
git add src/components/chat/ChatInput.tsx
git commit -m "feat: add voice input support to ChatInput with live transcription"
```

---

### Task 4: Final Verification

- [ ] **Step 1: Run full build**

Run: `cd /Users/apple/Documents/Workspace/Projects/conversational-ux-prototype && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run lint**

Run: `cd /Users/apple/Documents/Workspace/Projects/conversational-ux-prototype && npm run lint`
Expected: No new lint errors

- [ ] **Step 3: Fix any issues and commit**

If build or lint errors occur, fix them and commit:
```bash
git add -A
git commit -m "fix: resolve build/lint issues in voice input feature"
```
