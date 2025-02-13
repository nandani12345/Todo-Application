import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./user.css"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useToast
} from '@chakra-ui/react'

export default function User() {

    const [users, setUsers] = useState([]);
    const toast = useToast()
        const positions = [
            'top-right',
        ]

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get(`http://localhost:8000/getData`)
            setUsers(res.data.userData)
        }
        getAllData();
    }, [])

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/deleteData/${id}`)
            setUsers(users.filter(item => item._id !== id))
            toast({
                title: res.data.message,
                position: "top-right",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: error,
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });
        }
    }

    return (
        <div>
            <div style={{ padding: "10px" }}>
                <Link className='addButton' to={"/add"}>Add user</Link>
            </div>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>User Information</TableCaption>
                    <Thead className='tableContainer'>
                        <Tr>
                            <Th>S.no</Th>
                            <Th>User-name</Th>
                            <Th>User-email</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            users.length > 0 ? (
                                users.map((item, index) => (
                                    <Tr key={item._id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.fname} {item.lname}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>
                                            <button onClick={() => deleteUser(item._id)} className='delete'><i class="fa-solid fa-trash-arrow-up"></i></button>
                                            <Link to={`/edit/` + item._id} className='edit'><i class="fa-regular fa-pen-to-square"></i></Link>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={4}>No data available</Td>
                                </Tr>
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
};