import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, Home, Auth } from './pages';

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
            </Routes>
        </Router>
    );
};

export default App;
