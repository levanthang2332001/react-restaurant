import React from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';

const AdminPage = () => {
  return (
    <>
        <Navbar className="">
            <Navbar.Brand>
                <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                GERICHT
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}>
                    <Dropdown.Header>
                        <span className="block text-sm">
                        Bonnie Green
                        </span>
                        <span className="block truncate text-sm font-medium">
                        name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Earnings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="text-while">
                <Navbar.Link  href="/admin/add-menu"
                active={true}
                >
                Menu
                </Navbar.Link>
                <Navbar.Link href="/admin/booking">
                Booking
                </Navbar.Link>
                <Navbar.Link href="/admin/send-email">
                Notification
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>   
    </>
  );
};

export default AdminPage;