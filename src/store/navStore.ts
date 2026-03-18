import { create } from 'zustand';

interface NavState {
  leftNavOpen: boolean;
  activeChannelId: string;
  activeNetchexPage: string | null;
  showMoreGroups: boolean;
  showMoreDMs: boolean;
  toggleLeftNav: () => void;
  setLeftNavOpen: (open: boolean) => void;
  setActiveChannel: (id: string) => void;
  setActiveNetchexPage: (page: string | null) => void;
  toggleShowMoreGroups: () => void;
  toggleShowMoreDMs: () => void;
}

export const useNavStore = create<NavState>((set) => ({
  leftNavOpen: true,
  activeChannelId: 'ask-nex',
  activeNetchexPage: null,
  showMoreGroups: false,
  showMoreDMs: false,
  toggleLeftNav: () => set((s) => ({ leftNavOpen: !s.leftNavOpen })),
  setLeftNavOpen: (open) => set({ leftNavOpen: open }),
  setActiveChannel: (id) => set({ activeChannelId: id, activeNetchexPage: null }),
  setActiveNetchexPage: (page) => set({ activeNetchexPage: page, activeChannelId: '', leftNavOpen: false }),
  toggleShowMoreGroups: () => set((s) => ({ showMoreGroups: !s.showMoreGroups })),
  toggleShowMoreDMs: () => set((s) => ({ showMoreDMs: !s.showMoreDMs })),
}));
