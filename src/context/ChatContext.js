import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();
const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState(null);

    return <ChatContext.Provider value={{ chat, setChat }}>{children}</ChatContext.Provider>;
};

export { ChatProvider, useChatContext };
