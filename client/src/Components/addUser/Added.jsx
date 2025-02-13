import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./added.css"
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast

} from '@chakra-ui/react'

export default function Added() {
    const toast = useToast()
    const positions = [
        'top-right',
    ]
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show)
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8000/create`, form);
            if (res.status === 201) {
                toast({
                    title: res.data.message,
                    position: "top-right",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setForm({
                    fname: "",
                    lname: "",
                    email: "",
                    password: ""
                });
                navigate('/')
            } else if (res.status === 400) {
                toast({
                    title: res.data.message,
                    position: "top-right",
                    duration: 2000,
                    isClosable: true,
                });
                setForm({
                    fname: "",
                    lname: "",
                    email: "",
                    password: ""
                });
            } else {
                toast({
                    title: "Failed to Add User",
                    position: "top-right",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast({
                    title: error.response.data.message,
                    position: "top-right",
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Failed to Add User",
                    position: "top-right",
                    isClosable: true,
                });
            }
        }
    };

    const formHandler = (e) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    return (
        <div className='Container'>

            <form onSubmit={submitHandler}>
                <Link to={"/"} ><i class="fa-solid fa-circle-left"></i>Back</Link>
                <div className='Heading'>
                    <h1>Add New-User  </h1>
                </div>
                <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input type='text' name='fname' placeholder='First name' onChange={formHandler} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input type='text' name='lname' placeholder='last name' onChange={formHandler} />
                </FormControl>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' name='email' onChange={formHandler} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            name='password'
                            placeholder='Enter password'
                            onChange={formHandler}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button type='submit' colorScheme='blue'>Added</Button>
            </form>
        </div>
    )
}