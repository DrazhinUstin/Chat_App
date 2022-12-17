import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, Home, Auth, Reset } from './pages';

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
                <Route path='auth' element={<Auth />} />
                <Route path='reset' element={<Reset />} />
            </Routes>
        </Router>
    );
};

export default App;
