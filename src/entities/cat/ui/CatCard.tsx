import type {Cat} from "../model/types.ts";
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { toggleFavorite } from '../../../features/favorites/model/favoritesSlice';
import styles from './CatCard.module.scss';
import {useState} from "react";
interface CatCardProps {
    cat: Cat;
}

export function CatCard({ cat }: CatCardProps){
    const dispatch = useAppDispatch();
    const isFav = useAppSelector((s) => s.favorites.items.some((c: { id: string }) => c.id === cat.id));
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={styles.card}>
            <div className={`${styles.imgWrapper} ${loaded ? styles.loaded : ''}`}>
                <img
                    src={cat.url}
                    alt="котик"
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                />
                <button
                    className={`${styles.favBtn} ${isFav ? styles.active : ''}`}
                    onClick={() => dispatch(toggleFavorite(cat))}
                    aria-label={isFav ? 'Убрать из любимых' : 'Добавить в любимые'}
                >
                    <svg viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}