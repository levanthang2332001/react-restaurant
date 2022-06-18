import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import MenuPage from './page/MenuPage';
// import NavbarAdmin from './page/AdminPage';
import AddMenu from './page/AddMenu';
import  NotFound  from './page/NotFound';
import SendEmail from './page/SendEmail';
import BookTable from './page/BookTablePage';
import Booking from './page/Booking';
import LoginAdminPage from './page/LoginAdminPage';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/menu/" element={<MenuPage className="text-8xl text-white" />} />
            <Route path="/book-table" element={<BookTable />} />
            <Route path="/admin" element={<LoginAdminPage />}/>
            <Route path="/admin/add-menu" element={<AddMenu />}/>
            <Route path="/admin/booking" element={<Booking />}/>
            <Route path="/admin/send-email" element={<SendEmail />}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);