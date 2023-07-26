import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatContext } from "../Context/ChatProvider";
import { useContext } from "react";



const Chatpage = () => {
    const {user, setUser} = useContext(ChatContext);
    return (
        <div style={{ width: '100%' }}>    
        {user && <SideDrawer/>}
        <Box display="flex" flexDirection="row" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
          {user && <MyChats />}
          {user && <ChatBox />} 
        </Box>
      </div>  
    );
}

export default Chatpage;