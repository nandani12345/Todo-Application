import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import "./edit.css"
import {
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react'
import axios from 'axios';

export default function Edit() {
    const toast = useToast();
    // const positions = [
    //     'top-right',
    // ]
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    const updateData = async (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value

        })
        console.log(user);
    }
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8000/update/${id}`, user);
            console.log(res.data);
            if (res.status === 200) {
                toast({
                    title: res.data.message,
                    position: "top-right",
                    duration: 2000,
                    status:"success",
                    isClosable: true,
                });
                setUser({
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
                setUser({
                    fname: "",
                    lname: "",
                    email: "",
                    password: ""
                });
            } else {
                toast({
                    title: "Failed to Update User",
                    position: "top-right",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                console.log(error.response.data);
                toast({
                    title: error.response.data.message,
                    position: "top-right",
                    duration: 2000,
                    status:"success",
                    isClosable: true,
                });
            } else {
                console.log(error);
                toast({
                    title: "Failed to Update User",
                    position: "top-right",
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    }
    const formHandle = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/getOne/${id}`);
            setUser(res.data.userId);
        } catch (error) {
            toast({
                title: error,
                position: "top-right",
                isClosable: true,
            });

        }

    }
    useEffect(() => {
        formHandle();
    }, [id]);
    return (
        <div className='Container'>
            <Link to={"/"} ><i class="fa-solid fa-circle-left"></i>Back</Link>
            <form onSubmit={submitForm}>

                <div className='Heading'>
                    <h1>Update User</h1>
                </div>
                <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input type='text' name='fname' value={user.fname} placeholder='First name' onChange={updateData} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input type='text' name='lname' value={user.lname} placeholder='last name' onChange={updateData} />
                </FormControl>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' name='email' value={user.email} placeholder='Enter the email' onChange={updateData} />
                </FormControl>

                <Button type='submit' colorScheme='blue'>Update</Button>
            </form>
        </div>
    )
};