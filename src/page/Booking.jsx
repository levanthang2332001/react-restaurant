import React,{ useState,useEffect } from 'react';
import AdminPage from './AdminPage';
import { Table } from 'flowbite-react';
import axios from 'axios';

const Booking = () => {
    const [data , setData] = useState([]);
    const URL = 'https://restaurant-json-server.herokuapp.com';

    const getData = async () => {
        await axios.get(`${URL}/api/get-book-table`)
            .then(res => setData(res.data.bookTables))
            .catch(err => console.log(err));
    };
    
    const handleEdit = async (e) => {
        const { id } = e.target;
        await axios.get(`${URL}/api/edit-booking/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        window.location.reload();
    };

    useEffect(() => {
        getData();
    },[]);
    

    console.log(data);

  return (
    <div>
        <AdminPage/>
        <div className='mx-10 pt-8'>
            <Table striped={true}>
                <Table.Head>
                    <Table.HeadCell>
                    Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Email
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Amount
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Day
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Time
                    </Table.HeadCell>
                    <Table.HeadCell>
                    <span className="sr-only">
                        Detele
                    </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                {data && data.map((item,index) => {
                    return (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"  key={index} id={item._id}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.email}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.amount}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.day}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.time}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.type === 'Cancelled' ? <button className='font-medium text-red-600 hover:underline dark:text-red-500'>Cancelled</button> : item.type === 'Confirmed' ? <button className='font-medium text-green-600 hover:underline dark:text-green-500'>Confirm</button> : <button className='font-medium text-blue-600 hover:underline dark:text-blue-500' onClick={handleEdit} id={item._id}>Pending</button>}
                                    {/* <a
                                    href="/admin/booking"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    id={item._id}
                                    onClick={handleDelete}
                                    >
                                    {item.type === 'Pending' ? 'Pending' : item.type === 'Confirm' ? 'Confirm' : 'Cancel'}
                                    </a> */}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })};
                </Table.Body>
            </Table>
        </div>
    </div>
  );
};

export default Booking;