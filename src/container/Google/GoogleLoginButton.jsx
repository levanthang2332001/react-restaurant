import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginButton = () => {
    const handleLogin = (response) => {
        console.log(response);
    };

    const handleFailure = (response) => {
        console.log(response);
    };
  return (
    <>
        <GoogleLogin
            clientId='91054374898-b5jnbafk6m9a4tb9ork45316r8v0hilp.apps.googleusercontent.com'
            buttonText=""
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
        />
    </>
  );
};

export default GoogleLoginButton;