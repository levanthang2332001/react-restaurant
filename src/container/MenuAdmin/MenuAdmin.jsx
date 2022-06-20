import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MenuAdmin = () => {

    const URL = 'https://restaurant-json-server.herokuapp.com';

    const [data, setData] = useState([]);

    const getMenu =  () => {
        axios.get(`${URL}/api/menu/gets`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const sendDataDelete = async (id) => {
        await axios.delete(`${URL}/api/menu/delete/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    const sendDataUpdate = async (id) => {
        await axios.put(`${URL}/api/menu/update/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const handleEdit = (e) => {
        const { id } = e.target;
        e.preventDefault();
        sendDataUpdate(id);
         toast.success('Edit Success');
        setTimeout(() => {
            window.location.reload();
        },1000);
    };

    const handleDelete = (e) => {
        const { id } = e.target;
        e.preventDefault();
        sendDataDelete(id);
        toast.success('Delete Success');
        setTimeout(() => {
            window.location.reload();
        },1000);
        
    };
        
    useEffect(() => {
        data.sort((a, b) => b.status - a.status);
        getMenu();
    }, []);

    console.log(data);


  return (
    <div>
        <ToastContainer draggable={false} transition={Zoom} autoClose={1000} />
        <div className='pt-12 px-12'>
            <Table >
                <Table.Head>
                    <Table.HeadCell>
                    Title
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Content
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Price
                    </Table.HeadCell>
                    <Table.HeadCell>
                    BestSeller
                    </Table.HeadCell>
                    <Table.HeadCell>
                    <span className="sr-only" >
                        Edit
                    </span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                    <span className="sr-only">
                        Delete
                    </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y" >
                { data?.map((item, index) => {
                    return (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.title}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.content}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.price}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.status ? 'Yes' : 'No'}
                                </Table.Cell>
                                <Table.Cell>
                                    <a
                                    href="/admin/add-menu"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    id={item._id}
                                    onClick={handleEdit}
                                    >
                                    Set
                                    </a>
                                </Table.Cell>
                                <Table.Cell>
                                    <a
                                    href="/admin/add-menu"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    id={item._id}
                                    onClick={handleDelete}
                                    >
                                    Delete
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                    );
                })}
                </Table.Body>
            </Table> 
        </div>
    </div>
  );
};

export default MenuAdmin;
