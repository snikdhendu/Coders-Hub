// import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditProject from "../EditProject";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { RootState } from "../../../store";

const Userproject = () => {
  const projects = useSelector((state: RootState) => state.user.projects);

  const openModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error('Modal element not found or is not a dialog.');
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    } else {
      console.error('Modal element not found or is not a dialog.');
    }
  };

  return (
    <div className="flex justify-center items-center text-3xl font-royal1 gap-6 flex-col w-full">
      {projects && projects.length > 0 ? (
        <div className="w-full flex flex-col items-center p-3">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="bg-muted/50 border shadow-md rounded-lg p-4 w-full mb-4 h-fit cursor-pointer"
            >
              <h2 className="text-2xl font-bold">{project.projectName}</h2>
              <p className="text-lg">{project.description}</p>
              <p className="text-sm text-gray-500">Tech Stack: {project.technologies.join(', ') || 'Not specified'}</p>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <div className="bg-textfourth rounded-full p-6 flex justify-center items-center mt-28">
            <button
              className="btn flex justify-center items-center bg-transparent border-none rounded-full h-12 w-12 hover:bg-transparent"
              onClick={openModal}
            >
              <FontAwesomeIcon icon={faPlus} className='text-mainbg h-8 w-8' />
            </button>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box relative shadow-lg w-11/12 max-w-5xl h-screen bg-white dark:bg-black text-textmain">
                <div className="flex justify-center items-center h-full">
                  <EditProject closeModal={closeModal}/>
                  <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-4 top-3 hover:bg-textthird hover:text-white text-2xl bg-textfourth text-secondbg flex justify-center items-center rounded-full"
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </dialog>
          </div>
          <h1 className="font-royal4 font-bold inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text mt-4">
            You have no projects yet. Add a project.
          </h1>
        </>
      )}
    </div>
  );
}

export default Userproject;
