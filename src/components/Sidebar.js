import { Navbar, UserSearch, ChatList } from './';

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <Navbar />
            <UserSearch />
            <ChatList />
        </aside>
    );
};

export default Sidebar;
