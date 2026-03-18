import { create } from 'zustand';
import type { Message } from '../data/messages';

export type FlowState = {
  flowId: string | null;
  step: number;
  subType?: string | null;
  data: Record<string, any>;
};

interface ChatState {
  messagesByChannel: Record<string, Message[]>;
  isAskAiHome: boolean;
  overlayOpen: boolean;
  overlayType: string | null;
  overlayData: Record<string, any>;
  isTyping: boolean;
  activeFlow: FlowState;
  whisper: { channelId: string; flowId: string; message: string } | null;

  addMessage: (channelId: string, message: Message) => void;
  setIsAskAiHome: (val: boolean) => void;
  openOverlay: (type: string, data?: Record<string, any>) => void;
  closeOverlay: () => void;
  setIsTyping: (val: boolean) => void;
  setActiveFlow: (flow: FlowState) => void;
  clearActiveFlow: () => void;
  setWhisper: (w: ChatState['whisper']) => void;
  clearWhisper: () => void;
  startNewChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messagesByChannel: {},
  isAskAiHome: true,
  overlayOpen: false,
  overlayType: null,
  overlayData: {},
  isTyping: false,
  activeFlow: { flowId: null, step: 0, data: {} },
  whisper: null,

  addMessage: (channelId, message) =>
    set((s) => ({
      messagesByChannel: {
        ...s.messagesByChannel,
        [channelId]: [...(s.messagesByChannel[channelId] || []), message],
      },
    })),

  setIsAskAiHome: (val) => set({ isAskAiHome: val }),

  openOverlay: (type, data = {}) =>
    set({ overlayOpen: true, overlayType: type, overlayData: data }),

  closeOverlay: () =>
    set({ overlayOpen: false, overlayType: null, overlayData: {} }),

  setIsTyping: (val) => set({ isTyping: val }),

  setActiveFlow: (flow) => set({ activeFlow: flow }),

  clearActiveFlow: () =>
    set({ activeFlow: { flowId: null, step: 0, data: {} } }),

  setWhisper: (w) => set({ whisper: w }),

  clearWhisper: () => set({ whisper: null }),

  startNewChat: () =>
    set((s) => ({
      messagesByChannel: { ...s.messagesByChannel, 'ask-nex': [] },
      isAskAiHome: true,
      activeFlow: { flowId: null, step: 0, data: {} },
      isTyping: false,
      overlayOpen: false,
      overlayType: null,
      overlayData: {},
    })),
}));
