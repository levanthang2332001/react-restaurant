import axios from 'axios';
import React, { useState } from 'react';
import { useGoogleOneTapLogin  } from 'react-google-one-tap-login';
import  Navbar  from '../../components/Navbar/Navbar';
import Cookies from 'js-cookie';

const GoogleOneTap = () => {
    const [avatar, setAvatar] = useState();

    useGoogleOneTapLogin({
        onError: err => console.log(err),
        onSuccess: res => {
            setAvatar(res.picture);

            Cookies.set('email',res.email);
            Cookies.set('avt',res.picture);
            Cookies.set('name',res.name);
            Cookies.set('sub',res.sub);
            
            axios.post('https://restaurant-json-server.herokuapp.com/api/user/google', res).then(res => console.log(res));
        },
        onCancel: () => console.log('cancelled'),
        googleAccountConfigs:{
            client_id: '932176415025-9mevalte7fgt0d6391jd8sfruu7a7qb1.apps.googleusercontent.com',
        }
    });

  return (
    <div>
        <Navbar avatar={avatar} />
    </div>
  );
};

export default GoogleOneTap;