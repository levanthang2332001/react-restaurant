import React from 'react';

export const MenuModal = ({ closeModal }) => {
  return (
    <>
        <button onClick={() => closeModal(false)}> X </button>
        <div className="modal">Modal</div>
    </>
  );
};
