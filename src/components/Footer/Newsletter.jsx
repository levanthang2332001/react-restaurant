import React, { useState } from 'react';

import SubHeading from '../SubHeading/SubHeading';
import './Newsletter.css';
import axios from 'axios';

const Newsletter = () => {

    const [email, setEmail] = useState('');

    const handleMessenger = async (e) => {
        setEmail(e.target.value);
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        send();
        setEmail('');
    };

    const send = () => {
        axios.post('https://restaurant-json-server.herokuapp.com/api/newsletter/send', {
            emailSubscription: email,
        }).then(result => console.log(result));
    };

    return (
        <div className="app__newsletter">
            <div className="app__newsletter-heading">
                <SubHeading title="Newsletter" />
                <h1 className="headtext__cormorant">Subscribe To Our Newsletter</h1>
                <p className="p__opensans">And never miss latest Updates!</p>
            </div>
            <div className="app__newsletter-input flex__center">
                <input value={email} onChange={handleMessenger} type="email" placeholder="Enter your email address" />
                <button type="submit" onClick={handleSubmit} className="custom__button">Subscribe</button>
            </div>
        </div>  
    );
};

export default Newsletter;
