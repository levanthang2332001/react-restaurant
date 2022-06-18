import React, { useState } from 'react';
import { Navbar } from '../components';
import { MenuModal } from './modal/MenuModal';
import axios from 'axios';
import { useEffect } from 'react';
import { CardMenu } from '../container/index';
import Cookies from 'js-cookie';

const MenuPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        axios.get('https://restaurant-json-server.herokuapp.com/api/menu/gets')
            .then(res => setData(res.data));
    };

    const avt = Cookies.get('avt');

    useEffect(() => {
        fetchData();
    },[]);
    
    return (
        <>
            <Navbar avatar={avt}/>
            <div className="flex flex-wrap">
                { 
                    data.map(item => 
                    <div key={item._id}>
                        <CardMenu data={item} />
                    </div>
                )}
            </div>
            
            {openModal && <MenuModal closeModal={setOpenModal} />}
        </>
    );
};
export default MenuPage;