import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCats } from '../../../shared/api/catsApi';
import type { Cat } from './types.ts';

export const loadCats = createAsyncThunk('cats/load', async (page: number) => {
    return await fetchCats(page);
});

interface CatsState {
    items: Cat[];
    page: number;
    loading: boolean;
    hasMore: boolean;
    error: string | null;
}

const initialState: CatsState = {
    items: [],
    page: 0,
    loading: false,
    hasMore: true,
    error: null,
};

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCats.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(...action.payload);
                state.page += 1;
                state.hasMore = action.payload.length > 0;
            })
            .addCase(loadCats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error';
            });
    },
});

export default catsSlice.reducer;
