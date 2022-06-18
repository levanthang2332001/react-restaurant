import React, { useEffect, useState } from 'react';
import { Table, Checkbox  } from 'flowbite-react';
import AdminPage from './AdminPage';
import axios from 'axios';
import SendDataEmail from '../container/SendDataEmail/SendDataEmail';

const SendEmail = () => {

    const [data, setData] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    
    
    const send = async () => {
        await axios.get('https://restaurant-json-server.herokuapp.com/api/newsletter/get')
        .then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err));
    };

    const handleSelectAll = () => {
        setIsCheckedAll(!isCheckedAll);
        setCheckedList(data.map(item => item._id));
        if(isCheckedAll) {
            setCheckedList([]);
        }
    };
    
    const handleClick = (e) => {
        const { id, checked } = e.target;
        setCheckedList([...checkedList, id]);
        if (!checked) {
            setCheckedList(checkedList.filter(item => item !== id));
        }
    };
    
    useEffect(() => {
        send();
    },[]);

    return (
    <div>
        
        <AdminPage />
        <SendDataEmail listEmail={checkedList} />
        <div className='pt-8 px-[35rem]'>
            <Table>
                <Table.Head>
                    <Table.HeadCell>
                    <Checkbox onChange={handleSelectAll} checked={isCheckedAll} name="SelectAll" id='SelectAll' />
                    </Table.HeadCell>
                    <Table.HeadCell>
                    Email
                    </Table.HeadCell> 
                    
                </Table.Head>
                <Table.Body className='divide-y' >
                { data && data.map((item, index) => {
                    return (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                <Table.Cell>
                                    <Checkbox id={item._id} key={item._id} onChange={handleClick} checked={checkedList.includes(item._id)}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.emailSubscription}
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

export default SendEmail;