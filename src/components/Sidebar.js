import { useAuthContext } from '../context/AuthContext';
import { SidebarHeader, UserSearch, ChatList } from './';

const Sidebar = () => {
    const { isSidebarOpen } = useAuthContext();
    return (
        <aside className={`sidebar ${isSidebarOpen && 'open'}`}>
            <SidebarHeader />
            <UserSearch />
            <ChatList />
        </aside>
    );
};

export default Sidebar;
