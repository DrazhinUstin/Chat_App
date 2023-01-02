import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFound = () => {
    return (
        <main className='container'>
            <Header />
            <section className='not-found'>
                <h1>404</h1>
                <h3>page not found...</h3>
                <Link to='/' className='btn'>
                    back home
                </Link>
            </section>
        </main>
    );
};

export default NotFound;
