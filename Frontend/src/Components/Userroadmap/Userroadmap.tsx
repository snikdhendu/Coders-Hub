
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store";
import { useMutation } from '@apollo/client';
import { deleteFlowchart } from '../../graphql/mutation/flowchartMutation'; // Import your delete mutation
import { useUser } from "@clerk/clerk-react";

const Userroadmap = () => {
  const flowcharts = useSelector((state: RootState) => state.user.flowcharts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useUser();

  const [deleteFlowchartMutation] = useMutation(deleteFlowchart);

  const handleFlowchartClick = (flowchart: any) => {
    navigate(`/roadmaps/${flowchart._id}`, {
      state: {
        title: flowchart.title,
        nodes: flowchart.nodes,
        viewOnly: true
      }
    });
  };

  const handleDeleteClick = async (flowchartId: string) => {
    try {
      const { data } = await deleteFlowchartMutation({
        variables: {
          clerkUserId: user?.id, // Replace with actual user ID
          flowchartId
        }
      });

      if (data.DELETE_FLOWCHART.success) {
        // Optionally update the Redux store or state to remove the deleted flowchart
        dispatch({ type: 'DELETE_FLOWCHART', payload: flowchartId });
        console.log('Flowchart deleted successfully');
      } else {
        console.error(data.DELETE_FLOWCHART.message);
      }
    } catch (error) {
      console.error('Error deleting flowchart:', error);
    }
  };

  return (
    <div className="flex justify-center items-center text-3xl font-royal1 gap-6 flex-col w-full">
      {flowcharts && flowcharts.length > 0 ? (
        <div className="w-full flex flex-col items-center p-3 ">
          {flowcharts.map((flowchart) => (
            <div 
              key={flowchart._id} 
              onClick={() => handleFlowchartClick(flowchart)}
              className="bg-muted/50 border shadow-md rounded-lg p-4 w-full mb-4 h-36 cursor-pointer flex items-center justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold">{flowchart.title}</h2>
                <p className="text-lg">{flowchart.nodes.length} Nodes</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from bubbling up
                  handleDeleteClick(flowchart._id);
                }}
                className="text-red-600 hover:text-red-800"
              >
                <FontAwesomeIcon icon={faTrash} className='h-6 w-6' />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="bg-textfourth rounded-full p-6 flex justify-center items-center mt-28">
            <Link
              to='./createroadmap'
              className="btn flex justify-center items-center bg-transparent border-none rounded-full h-12 w-12 hover:bg-transparent"
            >
              <FontAwesomeIcon icon={faPlus} className='text-mainbg h-8 w-8' />
            </Link>
          </div>
          <h1 className="font-royal4 font-bold inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text mt-4">
            You have no Roadmap yet. Create a Roadmap.
          </h1>
        </>
      )}
    </div>
  );
};

export default Userroadmap;
