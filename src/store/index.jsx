import toast from 'react-hot-toast';
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



export const useCart = create((set) => ({
    items: [],
    total: 0,

    addToCart: (newProduct) =>
        set((state) => {
            let games = state.items;

            let final = games.findIndex((el) => {
                return el.documentId == newProduct.documentId;
            });

            if (final == -1) {
                // The Product not into Cart
                games.push({ ...newProduct, qty: 1 });
                toast.success('Added to cart');
            } else {
                // The Product in cart Qty++
                games[final].qty++;
                toast.success('Qty : ' + games[final].qty);
            }
            state.calcTotal();

            return { items: games };
        }),

    incrmentQty: (documentId) =>
        set((state) => {
            let games = state.items;
            let index = games.findIndex((el) => el.documentId == documentId);
            games[index].qty++;
            state.calcTotal();
            return { items: games };
        }),

    decrmentQty: (documentId) =>
        set((state) => {
            let games = state.items;
            let index = games.findIndex((el) => el.documentId == documentId);
            if (games[index].qty > 1) {
                games[index].qty--;
            } else {
                games.splice(index, 1);
                toast.success('Game Removed from cart');
            }
            state.calcTotal();
            return { items: games };
        }),

    removeFromCart: (documentId) =>
        set((state) => {
            let games = state.items;
            let index = games.findIndex((el) => el.documentId == documentId);
            games.splice(index, 1);
            toast.success('Game removed from cart');
            state.calcTotal();
            return { items: games };
        }),

    calcTotal: () =>
        set((state) => {
            let finalTotal = 0;

            state.items.forEach((el) => {
                finalTotal += el.qty * (el.disprice ? el.disprice : el.price);
            });

            return { total: finalTotal };
        }),
}));
