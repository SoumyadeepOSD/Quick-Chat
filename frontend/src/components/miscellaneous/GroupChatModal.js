import { Button, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, useToast, FormControl, Input, Box } from '@chakra-ui/react'
import React, { useState, useContext} from 'react'
import { ChatContext } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';



function GroupChatModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const {user, chats, setChats} = useContext(ChatContext);

    const handleSearch = async(query)=>{
        setSearch(query)
        if(!query){
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title:"Error occured",
                description:"Failed to load the search results",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            });
        }
    }
    const handleSubmit = ()=>{}
    const handleGroup = (userToAdd)=>{
        if(selectedUser.includes(userToAdd)){
            toast({
                title:"User already added",
                status:"warning",
                duration:5000, 
                isClosable:true,
                position:"top"
            });
            return;
        }
        setSelectedUser([...selectedUser, userToAdd]);
    }

    const handleDelete = (delUser) => {
        setSelectedUser(
            selectedUser.filter((sel)=>sel._id!==delUser._id)
        );
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader
                            fontSize="35px"
                            fontFamily="Work sans"
                            display="flex"
                            justifyContent="center"
                        >
                            Create Group Chat
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody display="flex" flexDir="column" alignItems="center">
                            <FormControl>
                                <Input 
                                    placeholder="Chat Name" 
                                    mb={3}
                                    onChange={(e)=>setGroupChatName(e.target.value)}    
                                />
                            </FormControl>
                            <FormControl>
                                <Input 
                                    placeholder="Add Users" 
                                    mb={1}
                                    onChange={(e)=>handleSearch(e.target.value)}    
                                />
                            </FormControl>
                            <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUser.map((u)=>(
                                <UserBadgeItem 
                                    key={user._id} 
                                    user={u}
                                    handleFunction={()=>handleDelete(u)}
                                />
                            ))}
                            </Box>
                            {loading?<div>loading</div>:(searchResult?.slice(0, 4).map(user=>(
                                <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                            )))}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={handleSubmit}>
                                Create Chat
                            </Button>
                            <Button variant="ghost">Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export default GroupChatModal