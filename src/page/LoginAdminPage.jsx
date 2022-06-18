import React, { useState } from 'react';
import { Label, TextInput, Button, Checkbox } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginAdminPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const sendLogin = async () => {
        await axios.post('https://restaurant-json-server.herokuapp.com/api/account-admin', {
            email: username,
            password: password,
        }).then(res => {
            console.log(res);
            if (res.status == 200) {
                navigate('/admin/add-menu');
            }
        }).catch(err => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendLogin();
    };

  return (
    <div className='px-[40rem] pt-[15rem]'>
        <form className="flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                <Label>Email</Label>
                </div>
                <TextInput
                id={username}
                type="email"
                placeholder="name@flowbite.com"
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <div className="mb-2 block">
                <Label>Password</Label>
                </div>
                <TextInput
                id={password}
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">
                Remember me
                </Label>
            </div>
            <Button type="submit" className='mx-auto my-0 w-40' onClick={handleSubmit}>
                Submit
            </Button>
            </form>
    </div>
  );
};

export default LoginAdminPage;