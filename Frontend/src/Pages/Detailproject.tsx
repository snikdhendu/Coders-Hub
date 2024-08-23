import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../../store';

const Detailproject = () => {
  const { id } = useParams();//need to fix
  const projects :any = useSelector((state: RootState) => state.user.projects);
  console.log(projects[0]._id);

  // const project = projects?.find(p => p._id === id);
  // console.log(id);

  // if () {
  //   return <div>Project not found</div>;
  // }

  return (

    <div className="project-detail">
      {/* <h1 className="text-4xl font-bold">{project.projectName}</h1>
      <p className="text-lg">{project.description}</p>
      <p className="text-sm text-gray-500">Tech Stack: {project.technologies.join(', ') || 'Not specified'}</p>
      <p className="text-lg"><a href={project.githubRepoLink} target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
      <p className="text-lg"><a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Link</a></p> */}
      {/* You can add more fields such as tagline, logo, etc. */}
    </div>
  );
}

export default Detailproject;
