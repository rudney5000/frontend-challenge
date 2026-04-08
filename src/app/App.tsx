import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Navbar, type Tab } from '../widgets/navbar/ui/Navbar';
import { CatsPage } from '../pages/cats-page/ui/CatsPage';
import { useAppSelector } from '../shared/hooks/redux';
import './styles/global.scss';

function AppInner() {
    const [activeTab, setActiveTab] = useState<Tab>('all');
    const favCount = useAppSelector((s) => s.favorites.items.length);

    return (
        <>
            <Navbar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                favCount={favCount}
            />
            <CatsPage activeTab={activeTab} />
        </>
    );
}

export function App() {
    return (
        <Provider store={store}>
            <AppInner />
        </Provider>
    );
}

export default App;