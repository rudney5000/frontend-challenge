import { configureStore } from '@reduxjs/toolkit';
import catsReducer from '../../entities/cat/model/catsSlice';
import favoritesReducer from '../../features/favorites/model/favoritesSlice';

export const store = configureStore({
    reducer: {
        cats: catsReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
