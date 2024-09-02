import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditProject from "../EditProject";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { RootState } from "../../../store";
import { useMutation } from "@apollo/client";
import { deleteProject } from "../../graphql/mutation/projectMutation";
import { deleteProjects } from "../../../features/userSlice";
import { useUser } from "@clerk/clerk-react";

const Userproject = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.user.projects);
  const { user } = useUser();
  const clerkUserId = user?.id;

  const [delete_Project] = useMutation(deleteProject);

  const handleDelete = async (projectId: string) => {
    try {
      const result = await delete_Project({
        variables: { clerkUserId, projectId }
      });

      if (result.data.deleteProject.success) {
        dispatch(deleteProjects(projectId)); 
      } else {
        console.error('Failed to delete project:', result.data.deleteProject.message);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

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
            <div key={project._id} className="bg-muted/50 border shadow-md rounded-lg p-4 w-full mb-4 h-fit flex justify-between items-center">
              <Link
                to={`/projects/${project._id}`}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold">{project.projectName}</h2>
                <p className="text-lg">{project.description}</p>
                <p className="text-sm text-gray-500">Tech Stack: {project.technologies.join(', ') || 'Not specified'}</p>
              </Link>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(project._id)}
              >
                <FontAwesomeIcon icon={faTrash} className='h-6 w-6' />
              </button>
            </div>
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
