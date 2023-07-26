import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = useContext(ChatContext);

  const toast = useToast();

  const fetchChats = async() => {
    try {
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description:"Failed to Load the chats",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  };

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[]);

  return (
    <div style={{color:'white'}}>MyChats</div>
  )
}

export default MyChats;