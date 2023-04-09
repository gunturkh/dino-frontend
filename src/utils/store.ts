import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Store = {
    scene: Screen,
    changeScene: (screen: Screen) => void,
}
type AuthStore = {
    token: string | null,
    saveToken: (token: string, callback?: () => void) => void,
    logout: () => void,
}
type Screen = 'HOME' | 'REGISTER' | 'DINOCENTER' | 'LOADING' | 'LOGIN' | 'PROFILE'

export const useStore = create<Store>((set, _get) => ({
    scene: 'LOADING',
    changeScene: (screen) => set(() => ({ scene: screen })),
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