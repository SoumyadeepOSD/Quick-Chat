import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const ChatContext = createContext();


const ChatProvider = ({children}) => {
    const[user, setUser] = useState();
    const history = useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if(!userInfo){
            history('/');
        }
    },[history]);
    return(
        <ChatContext.Provider value={{user, setUser}}>
            {children}
        </ChatContext.Provider>
    );
};



export default ChatProvider;