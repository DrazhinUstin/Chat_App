import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, Home, Profile, Auth, Reset, NotFound } from './pages';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='profile'
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route path='auth' element={<Auth />} />
                <Route path='reset' element={<Reset />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
