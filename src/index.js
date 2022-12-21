import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ChatProvider>
                <App />
            </ChatProvider>
        </AuthProvider>
    </React.StrictMode>
);
