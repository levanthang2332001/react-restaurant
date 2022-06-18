import React  from 'react';
import UserComment from './UserComment';
// import { IoEnter } from 'react-icons/io5';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Comment = ({ commentItem, dataItem }) => {

  const [message, setMessage] = React.useState();

  const handleMessenger = async (e) => {
    await setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
    setMessage('');

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  const send = () => {
    try {
        axios.post('https://restaurant-json-server.herokuapp.com/api/menu/comments', {
        menuid: dataItem._id,
        comment: message,
        avatar: Cookies.get('avt'),
        name: Cookies.get('name'),
        userid: Cookies.get('sub'),
      })
        .then(res => {
          console.log(res);
          toast.success('Comment sent successfully!');
        });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='absolute bottom-0'>
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
        <div className=" pb-[22rem] max-w-[35.5rem]">
            <UserComment data={dataItem} commentData={commentItem}/>
          <div>
            <form onSubmit={handleSubmit}>
              <input value={message} onChange={handleMessenger} placeholder="Leave a comment..." className='absolute bottom-0 w-[35.2rem] h-12 border-solid border-2 border-indigo-600'/>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Comment;