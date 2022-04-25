import create from 'zustand';

import { ApiErrorName } from '../types';

export type AppStore = {
  token: string | null;
  setToken: (token: string | null) => void;
  pinError: ApiErrorName | null;
  setPinError: (error: ApiErrorName | null) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  pinError: null,
  setPinError: (pinError) => set({ pinError }),
}));
