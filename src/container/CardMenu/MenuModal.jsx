import React,{ useEffect, useState } from 'react';
import  { VscChromeClose }  from 'react-icons/vsc';
import Comment from '../Comment/Comment';
import axios from 'axios';

const MenuModal = ({ setModalOn, URL, data }) => {
    const [comments, setComments] = useState([]);


    const handleCancelClick = () => {
        setModalOn(false);
    };
    
    useEffect(() => {
        axios.get('https://restaurant-json-server.herokuapp.com/api/menu/getcomments')
            .then(result => {
                setComments(result.data);
            });
    },[]);

    console.log(data);

  return (
    <>
    <div className=" opacity-100 fixed inset-0 z-50">
            <div className="flex h-5/6 justify-center items-center ">
                <div className="flex-col justify-center bg-white pt-9 pb-96 px-96 w-4/6 rounded-xl drop-shadow-2xl relative max-w-[72%] max-h-full min-h-full mt-28">
                    <div>
                        <div className='absolute top-0 left-0 w-full'>
                            <img src= {URL} alt="" className='w-3/6 h-[43.6rem]' />
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/2">
                        <div className="absolute right-0">
                            <div className='pr-[20rem]'>
                                <div className="text-3xl font-semibold font-sans uppercase pt-4 pb-4">{data.title}</div>
                            </div>
                            <div>
                                <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{data.content}</div>
                            </div>
                        </div>
                        <Comment commentItem={comments} dataItem={data}/>
                    </div>
                    <div className="flex text-lg  text-zinc-600  mb-10 absolute right-4 top-4" >
                        <VscChromeClose onClick={handleCancelClick} className='w-8 h-8 cursor-pointer' />
                    </div>
                    
                </div>
            </div>
        </div>
    </>
  );
};

export default MenuModal;