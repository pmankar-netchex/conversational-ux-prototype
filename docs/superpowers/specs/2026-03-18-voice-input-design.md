# Voice Input Support — Design Spec

**Date:** 2026-03-18
**Status:** Approved

## Overview

Add speech-to-text voice input to the conversational UX prototype, allowing users to speak instead of type in any chat channel. Uses the browser-native Web Speech API (zero dependencies).

## Requirements

- **Interaction model:** Tap-to-toggle (tap mic to start, tap again to stop)
- **Transcription:** Live preview — words appear in the text input in real-time as the user speaks
- **Scope:** Available in all channels (AI, group, DM)
- **Review before send:** Transcribed text fills the input field; user reviews/edits and sends manually
- **Browser support:** Show disabled mic button with tooltip in unsupported browsers

## Approach

**Web Speech API (Browser Native)** — chosen for zero dependencies, built-in live interim results, and suitability for a prototype. Works in Chrome, Edge, and Safari. No API keys or backend needed.

## Design

### Custom Hook: `useVoiceInput`

A single custom React hook encapsulates all speech recognition logic.

**File:** `src/hooks/useVoiceInput.ts`

**Interface:**
```ts
useVoiceInput() → {
  isListening: boolean        // whether recording is active
  transcript: string          // live interim text as user speaks
  isSupported: boolean        // whether browser supports Speech API
  startListening: () => void  // begin recording
  stopListening: () => void   // stop recording
  resetTranscript: () => void // clear transcript
}
```

**TypeScript support:** A type declaration file `src/types/speech-recognition.d.ts` must be created to extend the `Window` interface with `SpeechRecognition` and `webkitSpeechRecognition`, since the standard DOM lib does not include these types. This file must be a pure ambient declaration (script, not module) — do not include top-level `import`/`export` statements, or use `declare global {}` if imports are needed.

**Instance lifecycle:** A new `SpeechRecognition` instance is created on each `startListening` call (avoids stale-state bugs). Set `recognition.lang = 'en-US'` explicitly.

**Behavior:**
- `startListening`: creates a new `SpeechRecognition` instance with `continuous: true` and `interimResults: true`, starts listening
- `onresult`: assembles transcript by iterating `event.results` — all `isFinal` results are concatenated, plus the latest non-final (interim) result appended at the end. Final results are accumulated and never re-processed; interim results replace only the current non-final segment.
- `stopListening`: stops recognition, finalizes transcript
- `onerror`: stops listening, logs error, resets state
- `isSupported`: checks `window.SpeechRecognition || window.webkitSpeechRecognition` on mount
- **Cleanup on unmount:** The hook must stop recognition and clean up in a `useEffect` cleanup function, so navigating away mid-recording doesn't leave the browser listening

### ChatInput Integration

Updates to `src/components/chat/ChatInput.tsx`:

**Input field data model:**
- `ChatInput` tracks two separate pieces of state: `typedText` (what the user typed) and the hook's `transcript` (what voice produced)
- The displayed input value is `typedText + transcript` (voice portion always appended after typed text)
- During live transcription, only the voice portion updates — the typed portion is stable and unaffected
- When the user stops recording, the final transcript is merged into `typedText` (i.e., `typedText = typedText + finalTranscript`) and `transcript` is reset. From that point, the full text is editable as a single string.
- The user can type before or after voice input; voice always appends to whatever is already there
- User sends via Send button or Enter key (no auto-send)
- **Send while recording:** If the user hits Send while recording is active, stop recording, merge the current transcript (including interim) into typedText, then send the combined text

**Replaces existing placeholder:** The current "Coming soon" mic button (lines ~105-109 in ChatInput.tsx) is replaced with the functional implementation.

**Mic button states:**
- **Supported + idle:** Gray mic icon, clickable → `startListening`. `aria-label="Start voice input"`
- **Supported + listening:** Red mic icon with CSS pulse animation → `stopListening`. `aria-label="Stop voice input"`
- **Not supported:** Disabled mic icon, tooltip: "Voice input is not supported in this browser"

**Accessibility:** "Listening..." label should have `aria-live="polite"` so screen readers announce state changes.

**Listening indicator:**
- Small "Listening..." label appears next to mic button when active
- Subtle fade-in animation

### Visual Feedback

- **Recording active:** Mic icon turns red with a CSS keyframe pulse animation
- **"Listening..." label:** Appears adjacent to the mic button with fade-in
- **Idle state:** Standard gray mic icon (current design)

### Error Handling & Edge Cases

- **Mic permission denied:** Stop listening, show an inline error tooltip on the mic button: "Microphone access denied" (no snackbar — avoids adding new infrastructure)
- **Permission revoked mid-session:** `onerror` handler stops listening and resets state
- **Silence auto-stop:** If `onend` fires while `isListening` is still true (browser auto-stopped on silence), auto-restart recognition
- **Disabled channels:** Mic button follows same disabled state as text input
- **Concurrent typing + voice:** Both work together — see "Input field data model" above for the merge strategy
- **showChips layout:** The "Listening..." label sits next to the mic button inside the input row, so it renders correctly regardless of whether quick action chips are visible above

## File Changes

**Modified:**
- `src/components/chat/ChatInput.tsx` — Wire in hook, update mic button, add listening indicator and pulse animation

**Created:**
- `src/hooks/useVoiceInput.ts` — Custom hook for Web Speech API logic
- `src/types/speech-recognition.d.ts` — TypeScript ambient declarations for Web Speech API

**No changes to:**
- Zustand stores (voice state is local to ChatInput)
- Flow engine or intent matcher (voice produces text, same as typing)
- Any other components

## Testing

- Manual testing in Chrome/Edge for speech recognition
- Verify disabled state in Firefox
- Verify mic works across all channel types (AI, group, DM)
