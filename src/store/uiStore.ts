import { create } from 'zustand';

interface UiState {
  rightPanelOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  toastMessage: string | null;
  toggleRightPanel: () => void;
  setRightPanelOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  rightPanelOpen: false,
  searchOpen: false,
  searchQuery: '',
  toastMessage: null,
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  showToast: (msg) => set({ toastMessage: msg }),
  clearToast: () => set({ toastMessage: null }),
}));
