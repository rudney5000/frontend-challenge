import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Cat } from '../../../entities/cat/model/types';

const LS_KEY = 'kotiki_favorites';

function loadFromStorage(): Cat[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveToStorage(cats: Cat[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(cats));
}

interface FavoritesState {
    items: Cat[];
}

const initialState: FavoritesState = {
    items: loadFromStorage(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<Cat>) {
            const idx = state.items.findIndex((c) => c.id === action.payload.id);
            if (idx >= 0) {
                state.items.splice(idx, 1);
            } else {
                state.items.push(action.payload);
            }
            saveToStorage(state.items);
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
