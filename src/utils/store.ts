import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type User = {
    bonuses: string
    ga_key: boolean
    sponsor: string
    tickets: number
    username: string
}

type Egg = {
    id: string,
    openat: number,
    ticket: number,
    total: string
}

type Store = {
    scene: Screen,
    changeScene: (screen: Screen) => void,
    walletAddress: string,
    walletBalance: string,
    setWalletAddress: (address: string) => void,
    setWalletBalance: (balance: string) => void,
    userData: User,
    setUserData: (data: User) => void,
    eggListsData: Egg[],
    setEggListsData: (data: Egg[]) => void,
}
type AuthStore = {
    token: string | null,
    saveToken: (token: string, callback?: () => void) => void,
    logout: () => void,
}
type Screen = 'HOME' | 'REGISTER' | 'DINOCENTER' | 'LOADING' | 'LOGIN' | 'PROFILE' | 'ALBUM'

export const useStore = create<Store>((set, _get) => ({
    scene: 'LOADING',
    changeScene: (screen) => set(() => ({ scene: screen })),
    walletAddress: '',
    walletBalance: '0',
    setWalletAddress: (address) => set(() => ({ walletAddress: address })),
    setWalletBalance: (balance) => set(() => ({ walletBalance: balance })),
    userData: {
        bonuses: '0',
        ga_key: false,
        sponsor: '',
        tickets: 0,
        username: ''
    },
    setUserData: (data) => set(() => ({ userData: data })),
    eggListsData: [],
    setEggListsData: (data) => set(() => ({ eggListsData: data }))
}))

export const useAuthStore = create(persist<AuthStore>((set, _get) => ({
    token: null,
    saveToken: (token, callback) => {
        set(() => ({ token }))
        if (callback) callback()
    },
    logout: () => set(() => ({ token: null }))
}), {
    name: 'auth-storage',
    storage: createJSONStorage(() => sessionStorage),
}))