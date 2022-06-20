import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { useState } from 'react';
import  { VscChromeClose }  from 'react-icons/vsc';


const AddMenu = ({ setOpenModal }) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [price, setPrice] = useState();

  const handleCancelClick = () => {
    setOpenModal(false);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    e.value = '';
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
    e.value = '';
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    e.value = '';
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
    e.value = '';
  };

  const send = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title',title);
    formData.append('content',content);
    formData.append('image', file);
    formData.append('price',price);

    console.log(formData);

    try {
      axios.post('https://restaurant-json-server.herokuapp.com/api/menu/posts', formData)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      setOpenModal(false);
      setTimeout(() => {
          window.location.reload();
        },1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <div className=" opacity-100 fixed inset-0 z-50   ">
            <div className="flex h-5/6 justify-center items-center ">
                <div className="flex-col justify-center bg-white pt-9 pb-96 px-96 w-4/6  rounded-xl drop-shadow-2xl relative max-w-full max-h-0">
                  <form className="flex flex-col gap-4" action="#">
                    <div>
                      <Label className="mb-2 block">Image Upload</Label>
                      <TextInput type="file" sizing='sm' name='image' onChange={onChange}/>
                    </div>
                    <div>
                      <Label className="mb-2 block">Title</Label>
                      <TextInput type="text" sizing='sm' name='title' onChange={onChangeTitle}/>
                    </div>
                    <div>
                      <Label className="mb-2 block">Content</Label>
                      <TextInput type="text" sizing='sm' name='content' onChange={onChangeContent}/>
                    </div>
                    <div>
                      <Label className="mb-2 block">Price</Label>
                      <TextInput type="text" sizing='sm' name='price' onChange={onChangePrice}/>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button type="submit" name='submit' onClick={send} >Submit</Button>
                    </div>
                  </form>
                    
                    <div className="flex text-lg  text-zinc-600  mb-10 absolute right-4 top-4" >
                        <VscChromeClose onClick={handleCancelClick} className='w-8 h-8 cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddMenu;
