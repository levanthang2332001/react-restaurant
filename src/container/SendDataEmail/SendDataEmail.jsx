import React, { useState } from 'react';
import { Label, TextInput, Textarea, Button } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendDataEmail = ({ listEmail }) => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSubject = async (e) => {
    await setSubject(e.target.value);
  };

  const handleText = async (e) => {
    await setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
    setSubject('');
    setText('');
  };

  const send = () => {
    try {
      axios
        .post('https://restaurant-json-server.herokuapp.com/api/sendEmail', {
          subject: subject,
          text: text,
          email: listEmail,
        })
        .then((res) => {
          console.log(res);
          toast.success('Email sent successfully!');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" pt-12 px-80">
      <ToastContainer draggable={false} transition={Zoom} autoClose={8000} />
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label>Subject</Label>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            value={subject}
            onChange={handleSubject}
          />
        </div>
        {/* <div>
                <div className="mb-2 block">
                <Label>Title</Label>
                </div>
                <TextInput
                id="base"
                type="text"
                sizing="md"
                />
            </div> */}
        <div id="textarea">
          <div className="mb-2 block">
            <Label>Text</Label>
          </div>
          <Textarea
            id="comment"
            placeholder="Leave a comment..."
            required={true}
            rows={4}
            value={text}
            onChange={handleText}
          />
        </div>
        <Button type="submit" className="mx-auto my-0" onClick={handleSubmit}>
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default SendDataEmail;
