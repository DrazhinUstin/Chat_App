import { Header, Sidebar, Chat } from '../components';

const Home = () => {
    return (
        <main className='container-lg'>
            <Header renderBtn />
            <div className='column-layout'>
                <Sidebar />
                <Chat />
            </div>
        </main>
    );
};

export default Home;
