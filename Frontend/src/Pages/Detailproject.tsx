// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { RootState } from '../../store';

// const Detailproject = () => {
//   const { id } = useParams();
//   console.log(id);
//   const projects :any = useSelector((state: RootState) => state.user.projects);

//   const project = projects?.find(p => p._id === id);
//   console.log(id);

//   // if () {
//   //   return <div>Project not found</div>;
//   // }

//   return (

//     <div className="project-detail">
//       {/* <h1 className="text-4xl font-bold">{project.projectName}</h1>
//       <p className="text-lg">{project.description}</p>
//       <p className="text-sm text-gray-500">Tech Stack: {project.technologies.join(', ') || 'Not specified'}</p>
//       <p className="text-lg"><a href={project.githubRepoLink} target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
//       <p className="text-lg"><a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Link</a></p> */}
//       {/* You can add more fields such as tagline, logo, etc. */}
//     </div>
//   );
// }

// export default Detailproject;



import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../../store';

const DetailProject: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL parameters
  console.log("Params",id);

  // Get the list of projects from the Redux store
  const projects = useSelector((state: RootState) => state.user.projects);

  // Find the project with the matching ID
  const project = projects?.find(p => p._id === id);
  console.log("hello",  project?._id);

  // Handle case when the project is not found
  if (!project) {
    return <div>Project not found</div>;
  }

  // Render the project details
  return (
    <div className="project-detail">
      <h1 className="text-4xl font-bold">{project.projectName}</h1>
      <p className="text-lg">{project.description}</p>
      <p className="text-sm text-gray-500">
        Tech Stack: {project.technologies?.join(', ') || 'Not specified'}
      </p>
      <p className="text-lg">
        <a href={project.githubRepoLink} target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </a>
      </p>
      <p className="text-lg">
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
          Live Link
        </a>
      </p>
      {/* You can add more fields such as tagline, logo, etc. */}
    </div>
  );
}

export default DetailProject;
