import {useEffect, useRef} from "react";
import {CatCard} from "../../../entities/cat/ui/CatCard.tsx";
import type {Cat} from "../../../entities/cat/model/types.ts";
import styles from './CatGrid.module.scss';

interface CatGridProps {
    cats: Cat[];
    loading: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
    emptyText?: string;
}

export function CatGrid({ cats, loading, hasMore, onLoadMore, emptyText }: CatGridProps){
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!onLoadMore || !hasMore) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    onLoadMore();
                }
            },
            { rootMargin: '200px' }
        );
        const el = sentinelRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [onLoadMore, hasMore, loading]);

    if (!loading && cats.length === 0 && emptyText) {
        return (
            <div className={styles.empty}>
                <span className={styles.emptyIcon}>🐾</span>
                <p>{emptyText}</p>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                {cats.map((cat) => (
                    <CatCard key={cat.id} cat={cat} />
                ))}
                {loading && Array.from({ length: 7 }).map((_, i) => (
                    <div key={`sk-${i}`} className={styles.skeleton} />
                ))}
            </div>
            {onLoadMore && <div ref={sentinelRef} className={styles.sentinel} />}
        </div>
    )
}