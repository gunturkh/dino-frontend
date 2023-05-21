import { BigNumber } from "ethers";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export type Rank =
  | "Hunter"
  | "Predator"
  | "Warrior"
  | "Knight"
  | "Dominator"
  | "Legendary";

type User = {
  email: string;
  username: string;
  ga_key: boolean;
  tickets: number;
  bonuses: string;
  sponsor: string;
  daily: number;
  tf_ticket: boolean;
  title: Rank;
  ability_end: number;
  bought: {
    total?: string;
    period: string;
    group: string;
  };
  rank_end: number;
};

export type Egg = {
  id: string;
  listat: number;
  openat: number;
  ticket: number;
  total: string;
};

type EggListResponse = {
  remaining: number;
  lists: Egg[];
  page: number;
  totalpage: number;
};
export type EggPendingListData = {
  id: string;
  listedat: number;
  openat: number;
  opened: number;
  posted: number;
  total: string;
  ticket: number;
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

export type WithdrawPanelData = {
  show: boolean;
  mode: "WITHDRAW" | "HISTORY";
};

export type JPassPanelData = {
  show: boolean;
  data: any;
};

export type SponsorLinkPanelData = {
  show: boolean;
  link: string;
};

export type GoogleAuthPanelData = {
  show: boolean;
  mode: "SET" | "REMOVE";
};

export type CardDetailsData = {
  show: boolean;
  id: number | null;
  isLocked: boolean;
};

export type GatchaAnimationStatus = {
  show: boolean;
  ticket: number;
};

export type EggTransactionState = {
  mode: 'PURCHASE' | 'APPROVAL' | 'DONE',
  state: 'LOADING' | ''
}

type Store = {
  scene: Screen;
  changeScene: (screen: Screen) => void;
  walletAddress: string;
  walletBalance: string;
  setWalletAddress: (address: string) => void;
  setWalletBalance: (balance: string) => void;
  userData: User;
  setUserData: (data: User) => void;
  eggPendingListData: EggPendingListData[];
  setEggPendingListData: (data: EggPendingListData[]) => void;
  myListingEggData: Egg[];
  setMyListingEggData: (data: Egg[]) => void;
  eggListsData: EggListResponse;
  setEggListsData: (data: EggListResponse) => void;
  eggTransactionData: EggTransactionData;
  setEggTransactionData: (data: EggTransactionData) => void;
  eggTransactionState: EggTransactionState;
  setEggTransactionState: (data: EggTransactionState) => void;
  approved: BigNumber | string | undefined | null;
  setApproved: (data: BigNumber | string | null) => void;
  ticketPanel: TicketPanelData;
  setTicketPanel: (data: TicketPanelData) => void;
  sponsorLinkPanel: SponsorLinkPanelData;
  setSponsorLinkPanel: (data: SponsorLinkPanelData) => void;
  changePasswordPanel: boolean;
  setChangePasswordPanel: (data: boolean) => void;
  googleAuthPanel: GoogleAuthPanelData;
  setGoogleAuthPanel: (data: GoogleAuthPanelData) => void;
  cardDetails: CardDetailsData;
  setCardDetails: (data: CardDetailsData) => void;
  withdrawPanel: WithdrawPanelData;
  setWithdrawPanel: (data: WithdrawPanelData) => void;
  jPassPanel: JPassPanelData;
  setJPassPanel: (data: JPassPanelData) => void;
  notification: string[];
  setNotification: (data: string[]) => void;
  jFundBalance: string;
  setJFundBalance: (data: string) => void;
  setWithdrawalHistory: (data: any) => void;
  withdrawalHistory: string[];
  gatchaAnimationStatus: GatchaAnimationStatus;
  setGatchaAnimationStatus: (data: GatchaAnimationStatus) => void;
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
  | "BUDDIES"
  | "JPASS"
  | "HISTORY"
  | "BULLETIN";

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
    title: "Warrior",
    ability_end: 0,
    bought: {
      total: "0",
      period: "0",
      group: "0",
    },
    rank_end: 0,
  },
  setUserData: (data) => set(() => ({ userData: data })),
  eggPendingListData: [],
  setEggPendingListData: (data) => set(() => ({ eggPendingListData: data })),
  myListingEggData: [],
  setMyListingEggData: (data) => set(() => ({ myListingEggData: data })),
  eggListsData: { remaining: 0, lists: [], page: 1, totalpage: 1 },
  setEggListsData: (data) => set(() => ({ eggListsData: data })),
  eggTransactionData: {
    id: "",
    expired: 0,
    total: "0",
    TxRawApproval: "",
    TxRawPayment: "0",
    ticket: 0,
  },
  setEggTransactionData: (data) => set(() => ({ eggTransactionData: data })),
  eggTransactionState: { mode: 'APPROVAL', state: '' },
  setEggTransactionState: (data) => set(() => ({ eggTransactionState: data })),
  approved: undefined,
  setApproved: (data) => set(() => ({ approved: data })),
  ticketPanel: { show: false, mode: "BUY" },
  setTicketPanel: ({ show, mode }) =>
    set(() => ({ ticketPanel: { show, mode } })),
  sponsorLinkPanel: { show: false, link: "" },
  setSponsorLinkPanel: (data) => set(() => ({ sponsorLinkPanel: data })),
  changePasswordPanel: false,
  setChangePasswordPanel: (data) => set(() => ({ changePasswordPanel: data })),
  googleAuthPanel: { show: false, mode: "SET" },
  setGoogleAuthPanel: (data) => set(() => ({ googleAuthPanel: data })),
  cardDetails: { show: false, id: null, isLocked: true },
  setCardDetails: (data) => set(() => ({ cardDetails: data })),
  withdrawPanel: { show: false, mode: "WITHDRAW" },
  setWithdrawPanel: (data) => set(() => ({ withdrawPanel: data })),
  jPassPanel: { show: false, data: [] },
  setJPassPanel: (data) => set(() => ({ jPassPanel: data })),
  notification: [],
  setNotification: (data) => set(() => ({ notification: data })),
  jFundBalance: "",
  setJFundBalance: (data) => set(() => ({ jFundBalance: data })),
  setWithdrawalHistory: (data) => set(() => ({ withdrawalHistory: data })),
  withdrawalHistory: [],
  gatchaAnimationStatus: { show: false, ticket: 0 },
  setGatchaAnimationStatus: (data) =>
    set(() => ({ gatchaAnimationStatus: data })),
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
