import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Store = {
    scene: Screen,
    changeScene: (screen: Screen) => void,
    walletAddress: string,
    walletDetails: { mainnet: string, testnet: string }
    setWalletAddress: (address: string) => void,
    setWalletDetail: ({ mainnet, testnet }: { mainnet: string, testnet: string }) => void,
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
    walletDetails: { mainnet: '', testnet: '' },
    setWalletAddress: (address) => set(() => ({ walletAddress: address })),
    setWalletDetail: ({ mainnet, testnet }) => set(() => ({ walletDetails: { mainnet, testnet } })),
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