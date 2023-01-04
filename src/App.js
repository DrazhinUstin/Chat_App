import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoute, Home, Profile, UpdateEmail, Auth, Reset, NotFound } from './pages';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='update_email' element={<UpdateEmail />} />
                </Route>
                <Route path='auth' element={<Auth />} />
                <Route path='reset' element={<Reset />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
