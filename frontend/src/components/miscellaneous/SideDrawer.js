import React, { useState } from 'react'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Toast, Tooltip, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useContext } from 'react';
import { ChatContext } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import axios from "axios";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setUser } = useContext(ChatContext);
  const history = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history("/");
  }
    const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      return;
    }
    try {
      console.log(user);
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: error.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
    };
  }

  const accessChat = (userId) => {}

  return (
    <>
    <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
          w="100%"
          p="5px 10px 5px 10px"
          borderWidth="5px"
        >
                    <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
            <Button variant="solid" onClick={onOpen}>
              <i class='fas fa-search'></i>
              <Text display={{ base: "none", md: "flex" }} px="4" color="black">
                Search User
              </Text>
            </Button>
          </Tooltip>
          <Text fontSize='2xl' fontFamily="Work sans">
            Quick-Chat
          </Text>
          <div>
            <Menu>
              <MenuButton p={1}>
                <BellIcon fontSize="2xl" m={1} />
              </MenuButton>
              {/* <MenuList></MenuList> */}
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuItem
                  onClick={logoutHandler}
                >
                  Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              <Box display="flex" pb={2}>
                <Input
                  color='black'
                  placeholder='Search by name of email'
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={handleSearch}
                >
                  Go
                </Button>
              </Box>
              {loading ? (
                <ChatLoading/>
              ) : (
                searchResult?.map((e)=>{
                  return <UserListItem
                  key={e._id}
                  user={e}
                  handleFunction={()=>accessChat(e._id)}
                  />
                })
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer