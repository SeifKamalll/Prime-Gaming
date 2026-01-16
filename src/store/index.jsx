import { create } from "zustand";

export const domain = 'http://localhost:1337';


const useGameStore = create((set) => ({
    games: [],
    game: null,
    setGames: (games) => set({ games }),
    setGame: (game) => set({ game }),

    clearGame: () => set({ game: null }),
}));

export default useGameStore;