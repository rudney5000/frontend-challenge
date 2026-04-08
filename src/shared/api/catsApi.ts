import { CAT_API_BASE, CATS_PER_PAGE } from '../config/api';
import type { Cat } from '../../entities/cat/model/types';

export async function fetchCats(page: number): Promise<Cat[]> {
    const res = await fetch(
        `${CAT_API_BASE}/images/search?limit=${CATS_PER_PAGE}&page=${page}&order=Rand`,
        { headers: { 'x-api-key': 'live_mHHLWX3QkOQX5nU4WSlMdjXdHehtbeUXmaqdlXvBs64mAXxnzUq2MDz7NRq07F1k' } }
    );
    if (!res.ok) throw new Error('Failed to fetch cats');
    return res.json();
}
