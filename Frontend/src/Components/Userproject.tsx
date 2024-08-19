import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { EditUser } from '../Pages';
import EditProect  from './EditProject';


const Userproject = () => {
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
      
        <button className="flex justify-center items-center" onClick={openModal}><FontAwesomeIcon icon={faPlus} className='text-mainbg h-8 w-8' /></button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box relative shadow-lg w-11/12 max-w-5xl h-screen bg-white   dark:bg-gray-950 text-textmain">
            <form method="dialog" className=' flex justify-center items-center  h-full'>
              {/* if there is a button in form, it will close the modal */}
              <EditProect/>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-5 hover:bg-textthird hover:text-white text-2xl bg-textfourth text-secondbg flex justify-center items-center ronded-full">✕</button>
            </form>
            {/* <EditUser/> */}
          </div>
        </dialog>
      </div>
      <h1 className="font-royal4 font-bold">You have no project yet. Add Project.</h1>
    </div>
  );
}



export default Userproject;
