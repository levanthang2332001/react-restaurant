import React from 'react';
import { Card } from 'flowbite-react';
import { useState } from 'react';
import  MenuModal  from './MenuModal';

const cardMenu = ({ data }) => {
  const URL = `https://restaurant-json-server.herokuapp.com/Images/${data.image}`;

  const [ modalOn, setModalOn ] = useState(false);
  
  const clicked = () => {
    setModalOn(true);
  };


  return (
    <>
        <div className="max-w-xs p-6 flex flex-wrap transform transition duration-500 hover:scale-110 " onClick={clicked}>
          <Card imgSrc={URL} className="w-full cursor-pointer">
              {data.status ? <div><span className='bg-yellow-200 rounded-2xl px-2'>Bestseller</span></div> : null}

            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
              {data.title}
            </h5>
            <span className="font-normal text-gray-700 dark:text-gray-400">
              {data.content}
            </span>
            <div className="absolute opacity-0 inset-x-20 bottom-20 top-60 fd-sh hover:opacity-100 ">
              <div className="pt-8 text-center">
              {/* <button onClick={clicked} className="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg hover:bg-green-300">Learn more</button> */}
              </div>
            </div>
          </Card>
        </div>
        { modalOn && <MenuModal setModalOn={setModalOn} URL={URL} data={data}/>}
    </>
  );
};

export default cardMenu;
