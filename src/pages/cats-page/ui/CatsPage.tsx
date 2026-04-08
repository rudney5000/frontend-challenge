import type {Tab} from "../../../widgets/navbar/ui/Navbar.tsx";
import {CatGrid} from "../../../widgets/cat-grid/ui/CatGrid.tsx";
import {loadCats} from "../../../entities/cat/model/catsSlice.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks/redux.ts";

interface CatsPageProps {
    activeTab: Tab
}

export function CatsPage({ activeTab }: CatsPageProps){
    const dispatch = useAppDispatch();
    const { items, loading, hasMore, page } = useAppSelector((s) => s.cats);
    const favorites = useAppSelector((s) => s.favorites.items);

    useEffect(() => {
        if (page === 0) {
            dispatch(loadCats(0));
        }
    }, []);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            dispatch(loadCats(page));
        }
    };

    if (activeTab === 'favorites') {
        return (
            <CatGrid
                cats={favorites}
                loading={false}
                emptyText="Вы ещё не добавили котиков в любимые 🐱"
            />
        );
    }

    return (
        <CatGrid
            cats={items}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
        />
    )
}