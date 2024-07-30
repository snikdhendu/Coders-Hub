import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CreateRoadmap } from '.';
import { Link } from 'react-router-dom';

const Userroadmap = () => {
  const openModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error('Modal element not found or is not a dialog.');
    }
  };

  return (
    <div className="flex justify-center items-center text-3xl font-royal1 h-96 gap-6 flex-col">
      <div className="bg-textfourth rounded-full p-6 flex justify-center items-center">
      
        <Link to='./roadmap' className="flex justify-center items-center"><FontAwesomeIcon icon={faPlus} className='text-mainbg h-8 w-8' /></Link>

      </div>
      <h1 className="font-royal4 font-bold">You have no roadmap yet. Add Roadmap.</h1>
    </div>
  );
}



export default Userroadmap;
