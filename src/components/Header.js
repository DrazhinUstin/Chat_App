import { useAuthContext } from '../context/AuthContext';
import { FaBars, FaGithub } from 'react-icons/fa';

const Header = ({ renderBtn }) => {
    const { isSidebarOpen, setIsSidebarOpen } = useAuthContext();
    return (
        <header className='header'>
            {renderBtn && (
                <button
                    className={`icon ${isSidebarOpen && 'rotate'}`}
                    onClick={() => setIsSidebarOpen((state) => !state)}
                >
                    <FaBars />
                </button>
            )}
            <h2>chat app</h2>
            <a
                href='https://github.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='icon github'
            >
                <FaGithub />
            </a>
        </header>
    );
};

export default Header;
