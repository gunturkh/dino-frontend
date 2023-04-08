import { create } from 'zustand'

type Store = {
    scene: Screen,
    token: string,
    changeScene: (screen: Screen) => void,
    saveToken: (token: string) => void,
}
type Screen = 'HOME' | 'REGISTER' | 'DINOCENTER' | 'LOADING' | 'LOGIN' | 'PROFILE'

export const useStore = create<Store>((set, get) => ({
    scene: 'LOADING',
    token: '',
    changeScene: (screen) => set(() => ({ scene: screen })),
    saveToken: (token) => set(() => ({ token })),
}))