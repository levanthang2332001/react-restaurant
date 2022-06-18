import React from 'react';
import { Button } from 'flowbite-react';
import  AdminPage  from './AdminPage';
import AddMenuModal from '../container/AddMenuModal/AddMenuModal';
import { MenuAdmin } from '../container/index';

const AddMenu = () => {
    const [openModal, setOpenModal] = React.useState(false);

    const clicked = () => {
        setOpenModal(true);
    };

  return (
    <div>
        <AdminPage />
        <Button onClick={clicked} color='purple' className="my-8 mx-auto"> Create Menu</Button>
        { openModal && <AddMenuModal setOpenModal={setOpenModal} /> }
        <MenuAdmin />
    </div>
  );
};

export default AddMenu;
