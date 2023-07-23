import React, { useState } from 'react'
import {VStack} from "@chakra-ui/layout";
import {Button} from "@chakra-ui/button"; 
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleClick = () => {
        setShow(!show);
    }

    const postDetails = (pics) => {
        setLoading(true);
        if(pics.type===undefined)
        {
            toast({
                title:"Please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            return;
        }
        if(pics.type==="image/jpeg" || pics.type==="image/png"){
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset","pudkylub");
            data.append("cloud_name","open-container");
            fetch("https://api.cloudinary.com/v1_1/open-container/image/upload", {
                method:"post",
                body:data,
            }).then((res)=>res.json())
            .then((data)=>{
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            })
        }else{
            toast({
                title:"Sidhumar select an image!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            console.log("Please select an image");
            setLoading(false);
            return;
        }
    } 
    // Signup button functionality
    const submitHandler = () => {}
    return (
        <VStack spacing="5px" color="black">
            
             <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name' 
                    onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email' 
                    onChange={(e) => setEmail(e.target.value)} />
            </FormControl> 

             <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input
                    type={show?'text':'password'}
                    placeholder='Enter Your Password' 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl> 


            <FormControl id='confirm-password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input
                    type={show?'text':'password'}
                    placeholder='Confirm password' 
                    onChange={(e) => setConfirmpassword(e.target.value)} 
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl> 



            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                type="file"
                p={1.5}
                accept="image/*"
                // onChange={(e)=>console.log(e.target.files[0])}
                onChange={(e)=>postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{marginTop:15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup;