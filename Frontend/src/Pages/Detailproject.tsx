import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_PROJECTS } from '../graphql/query/projectQuery';
import { FaGithub, FaLink } from "react-icons/fa";
import Carousel from "../Components/Carousel";
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
// import { Like } from '../Components';

const DetailProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, []);

  const { loading, error, data } = useQuery(GET_ALL_PROJECTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Get the list of projects from the query result
  const projects = data?.getAllProjects;

  // Find the project with the matching ID
  const project = projects?.find((p: any) => p._id === id);

  console.log(project)

  // Handle case when the project is not found
  if (!project) {
    return <div>Project not found</div>;
  }



  const images = [
    "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const technologies = project.technologies || [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "React.js",
    "Redux Toolkit",
    "Google AI Studio"
  ];
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100);

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>, projectId: any) => {
    event.stopPropagation();

    if (isLiked) {
      setLikeCount(likeCount - 1);
      console.log(`${user?.id} user ${projectId} disliked `) // Decrease count if already liked
    } else {
      setLikeCount(likeCount + 1);
      console.log(`${user?.id} user ${projectId} liked `) // Increase count if not liked
    }
    setIsLiked(!isLiked); // Toggle like status
  }

  return (
    <div className="bg-white dark:border-b-slate-700 dark:bg-black min-h-screen text-2xl text-slate-200">
      <div className="p-4 min-h-screen flex justify-center items-center">
        <div className="project relative bg-white dark:border-b-slate-700 dark:bg-background p-6 rounded-lg shadow-xl mx-auto my-5 min-w-[500px] text-black z-30 border-2 min-h-full">
          <div className="flex items-start mb-4">
            <img
              src={project.logo || 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600'}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            <div className="flex-1 mt-4">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">{project.projectName}</h2>
            </div>
            <div className="flex items-center space-x-4 absolute right-8 top-8 gap-2">
              <button className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-2">
                <a
                  href={project.githubRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center dark:text-white py-1"
                >
                  <FaGithub />
                </a>
              </button>
              <button className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-3 flex items-center space-x-2 dark:text-white">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center dark:text-white text-base gap-3">
                  Live
                  <FaLink className='h-4 w-4' />
                </a>
              </button>
              <button onClick={(event) => { handleLike(event, project._id) }} className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-2 flex items-center space-x-2 dark:text-white">
                <input className="check" type="checkbox" id="like-toggle" checked={isLiked} onClick={(e) => e.stopPropagation()} />
                <label className="container p-0" htmlFor="like-toggle">
                  <svg
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`icon ${isLiked ? 'active' : 'inactive'}`}
                  >
                    <path
                      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                    ></path>
                  </svg>
                  <div className="checkmark"></div>
                  {/* <span className="like-text">Like</span> */}
                </label>
                <span className="ml-2">{likeCount}</span>
              </button>
            </div>
          </div>
          <p className="text-lg italic mb-2 dark:text-white">{project.tagline}</p>
          <p className="text-base mb-4 dark:text-white">{project.description}</p>
          <div className="bg-transparent rounded-lg">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-white mb-3">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: string, index: number) => (
                <span key={index} className="px-2 py-2 bg-textmain text-white font-medium text-base rounded-lg shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Carousel images={project.images.length > 0 ? project.images : images} />
          </div>
          <div className="flex items-center mt-3 border-t border-gray-200 pt-4">
            <img
              src={project.profileUrl}
              className="w-10 h-10 rounded-full mr-4"
            />
            <span className="text-base font-semibold dark:text-white flex gap-2">
              Created by <Link to={`/dashboard/${project.clerkUserId
                }`} className="  flex gap-1 text-textmain">
                <h2>{project.firstName}</h2>
                <h2>{project.lastName}</h2>

              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProject;
