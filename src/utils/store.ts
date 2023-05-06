import { BigNumber } from "ethers";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  email: string;
  username: string;
  ga_key: boolean;
  tickets: number;
  bonuses: string;
  sponsor: string;
  daily: number;
  tf_ticket: boolean;
  title: string;
  ability_end: number;
  bought: {
    total: string;
    period: string;
    group: string;
  };
};

export type Egg = {
  id: string;
  openat: number;
  ticket: number;
  total: string;
};

type EggListResponse = {
  remaining: number;
  lists: Egg[]
};

export type EggTransactionData = {
  id: string;
  expired: number;
  total: string;
  TxRawApproval: string;
  TxRawPayment: string;
  ticket: number;
};

export type TicketPanelData = {
  show: boolean;
  mode: "BUY" | "TRANSFER" | "HISTORY";
};

export type SponsorLinkPanelData = {
  show: boolean;
  link: string;
};

export type GoogleAuthPanelData = {
  show: boolean;
  mode: 'SET' | 'REMOVE';
};

type Store = {
  scene: Screen;
  changeScene: (screen: Screen) => void;
  walletAddress: string;
  walletBalance: string;
  setWalletAddress: (address: string) => void;
  setWalletBalance: (balance: string) => void;
  userData: User;
  setUserData: (data: User) => void;
  eggListsData: EggListResponse;
  setEggListsData: (data: EggListResponse) => void;
  eggTransactionData: EggTransactionData;
  setEggTransactionData: (data: EggTransactionData) => void;
  approved: BigNumber | undefined;
  setApproved: (data: BigNumber) => void;
  ticketPanel: TicketPanelData;
  setTicketPanel: (data: TicketPanelData) => void;
  sponsorLinkPanel: SponsorLinkPanelData;
  setSponsorLinkPanel: (data: SponsorLinkPanelData) => void;
  changePasswordPanel: boolean,
  setChangePasswordPanel: (data: boolean) => void
  googleAuthPanel: GoogleAuthPanelData,
  setGoogleAuthPanel: (data: GoogleAuthPanelData) => void
};
type AuthStore = {
  token: string | null;
  saveToken: (token: string, callback?: () => void) => void;
  logout: () => void;
};
type Screen =
  | "HOME"
  | "REGISTER"
  | "DINOCENTER"
  | "LOADING"
  | "LOGIN"
  | "PROFILE"
  | "ALBUM"
  | "GAMEGUIDE"
  | "BUDDIES";

export const useStore = create<Store>((set, get) => ({
  scene: "LOADING",
  changeScene: (screen) => set(() => ({ scene: screen })),
  walletAddress: "",
  walletBalance: "0",
  setWalletAddress: (address) => set(() => ({ walletAddress: address })),
  setWalletBalance: (balance) => set(() => ({ walletBalance: balance })),
  userData: {
    email: "",
    bonuses: "0",
    ga_key: false,
    sponsor: "",
    tickets: 0,
    username: "",
    daily: 0,
    tf_ticket: false,
    title: "",
    ability_end: 0,
    bought: {
      total: "0",
      period: "0",
      group: "0",
    },
  },
  setUserData: (data) => set(() => ({ userData: data })),
  eggListsData: { remaining: 0, lists: [] },
  setEggListsData: (data) => set(() => ({ eggListsData: data })),
  eggTransactionData: {
    id: '',
    expired: 0,
    total: '0',
    TxRawApproval: '',
    TxRawPayment: '0',
    ticket: 0
  },
  setEggTransactionData: (data) => set(() => ({ eggTransactionData: data })),
  approved: undefined,
  setApproved: (data) => set(() => ({ approved: data })),
  ticketPanel: { show: false, mode: "BUY" },
  setTicketPanel: ({ show, mode }) =>
    set(() => ({ ticketPanel: { show, mode } })),
  sponsorLinkPanel: { show: false, link: '' },
  setSponsorLinkPanel: (data) =>
    set(() => ({ sponsorLinkPanel: data })),
  changePasswordPanel: false,
  setChangePasswordPanel: (data) =>
    set(() => ({ changePasswordPanel: data })),
  googleAuthPanel: { show: false, mode: 'SET' },
  setGoogleAuthPanel: (data) =>
    set(() => ({ googleAuthPanel: data })),
}));

export const useAuthStore = create(
  persist<AuthStore>(
    (set, _get) => ({
      token: null,
      saveToken: (token, callback) => {
        set(() => ({ token }));
        if (callback && _get()?.token) callback();
      },
      logout: () => set(() => ({ token: null })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
