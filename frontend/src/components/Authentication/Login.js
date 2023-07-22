import { VStack } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { FormControl,Input, FormLabel,InputRightElement,InputGroup,Button } from '@chakra-ui/react';

const Login = () => {
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [show, setShow] = useState();
    const handleClick = ()=>{}
    const submitHandler = ()=>{}
  return (
    <VStack spacing="5px" color="black">
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

        <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop:15}}
            onClick={submitHandler}
        >
                Login
        </Button>
        <Button
            colorScheme='red'
            width="100%"
            style={{marginTop:15}}
            onClick={submitHandler}
        >
                Get Guest User Credentials
        </Button>

    </VStack>
  )
}

export default Login