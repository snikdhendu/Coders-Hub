import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Userroadmap = () => {
  const flowcharts = useSelector((state: RootState) => state.user.flowcharts);
  console.log(flowcharts);

  return (
    <div className="flex flex-col items-center h-96 gap-6">
      <div className="bg-textfourth rounded-full p-6 flex justify-center items-center">
        <Link to='./roadmap' className="flex justify-center items-center">
          <FontAwesomeIcon icon={faPlus} className='text-mainbg h-8 w-8' />
        </Link>
      </div>
      {flowcharts && flowcharts.length > 0 ? (
        <div className="w-full flex flex-col items-center p-3 mt-8">
          {flowcharts.map((flowchart) => (
            <Link 
              key={flowchart._id} 
              to={`/roadmap/${flowchart.title}`}
              className="bg-muted/50 border shadow-md rounded-lg p-4 w-full mb-4 h-36 cursor-pointer"
            >
              <h2 className="text-2xl font-bold">{flowchart.title}</h2>
              <p className="text-lg">{flowchart.nodes.length} Nodes</p>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="font-royal4 font-bold inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
          You have no flowcharts yet. Add a flowchart.
        </h1>
      )}
    </div>
  );
};

export default Userroadmap;
