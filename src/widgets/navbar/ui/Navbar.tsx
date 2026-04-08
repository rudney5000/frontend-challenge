import styles from './Navbar.module.scss';

export type Tab = 'all' | 'favorites';

interface NavbarProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    favCount: number;
}

export function Navbar({activeTab, onTabChange, favCount}: NavbarProps){
    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                        onClick={() => onTabChange('all')}
                    >
                        Все котики
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
                        onClick={() => onTabChange('favorites')}
                    >
                        Любимые котики
                        {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
                    </button>
                </div>
            </div>
        </nav>
    )
}