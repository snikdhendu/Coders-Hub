// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { Navbar } from "../Components/Navbar";
// import { useQuery } from "@apollo/client";
// import { useNavigate } from "react-router-dom"; // or useNavigate from react-router-dom v6
// import { GET_ALL_PROJECTS } from "../graphql/query/projectQuery";
// import { likeProject } from "../graphql/mutation/userMutation";
// // import { Link } from "react-router-dom";
// // import { Like } from "../Components";
// // import { useUser } from '@clerk/clerk-react';`
// interface ProjectType {
//   _id: string;
//   projectName: string;
//   category: string;
//   tagline: string;
//   description: string;
//   githubRepoLink: string;
//   liveLink: string;
//   images: string[];
//   logo: string;
//   likes: number;
//   username: string;
//   profileUrl: string;
//   firstName: string;
//   lastName: string;
//   clerkUserId: string
// }

// const Project: React.FC = () => {
//   const { data, loading, error } = useQuery<{ getAllProjects: ProjectType[] }>(GET_ALL_PROJECTS);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [filterCategory, setFilterCategory] = useState<string>("All");
//   const [projects, setProjects] = useState<ProjectType[]>([]);
//   const navigate = useNavigate();
//   // const { user } = useUser();
//   useEffect(() => {
//     if (data) {
//       setProjects(data.getAllProjects);
//     }
//   }, [data]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilterCategory(event.target.value);
//   };

//   // const handleLike = (event: React.MouseEvent, _id: string) => {
//   //   event.stopPropagation(); // Prevent the click event from propagating to the parent
//   //   setProjects((prevProjects) =>
//   //     prevProjects.map((project) =>
//   //       project._id === _id ? { ...project, likes: project.likes + 1 } : project
//   //     )
//   //   );
//   // };

//   const redirectToProjectDetails = (projectId: string) => {
//     navigate(`/projects/${projectId}`);
//   };

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch = project.projectName.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = filterCategory === "All" || project.category === filterCategory;
//     return matchesSearch && matchesFilter;
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(100);

//   const handleLike = (event: React.MouseEvent<HTMLButtonElement>, projectId: any) => {
//     event.stopPropagation();

//     if (isLiked) {
//       setLikeCount(likeCount - 1);
//       // console.log(`${user?.id} user ${projectId} disliked `) // Decrease count if already liked
//     } else {
//       setLikeCount(likeCount + 1);
//       // console.log(`${user?.id} user ${projectId} liked `) // Increase count if not liked
//     }
//     setIsLiked(!isLiked); // Toggle like status
//   // }

//   console.log(projects)

//   return (
//     <>
//       <Navbar />
//       <div className="bg-white dark:border-b-slate-700 dark:bg-background min-h-screen h-screen  text-2xl text-slate-200  flex justify-center items-center overflow-x-hidden ">
//         <div className="flex h-full gap-6 p-6 items-center w-full flex-col ">
//           <div className="flex flex-col gap-3 w-full  justify-center items-center">
//             <h1 className="text-4xl mb-4 ml-40 text-black dark:text-white font-semibold w-full">
//               Projects ({filteredProjects.length})
//             </h1>
//             <div className="flex w-full justify-center items-center mb-10 p-5 mx-40 bg-white dark:border-b-slate-700 dark:bg-background rounded-xl shadow-xl ">
//               <div className="relative lg:w-2/3 w-full  ">
//                 <FaSearch className="absolute left-3 top-3 text-black dark:text-white" />
//                 <input
//                   type="text"
//                   placeholder="Search projects..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="pl-10 p-2 text-black dark:text-white w-full rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300 "
//                 />
//               </div>
//               <select
//                 value={filterCategory}
//                 onChange={handleFilterChange}
//                 className="p-2 ml-2 text-black dark:text-white rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300 lg:block hidden"
//               >
//                 <option value="All">All Categories</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="Mobile Development">Mobile Development</option>
//                 <option value="Data Science">Data Science</option>
//                 {/* Add more filter options as needed */}
//               </select>
//             </div>
//           </div>
//           <div className="flex lg:flex-row flex-col lg:gap-10 gap-4 p-4 lg:px-24 w-full  justify-center items-center ">
//             {filteredProjects.map((project) => (
//               <div
//                 key={project._id}
//                 className="bg-white  dark:border-b-slate-700 dark:bg-background text-textmain font-bold font-royal4 p-8 rounded-lg shadow-lg cursor-pointer w-full lg:w-1/2 border-2 "
//                 onClick={() => redirectToProjectDetails(project._id)}
//               >
//                 <div className="flex flex-col  gap-5 p-3 ">
//                   <div className="flex gap-4 items-center ">
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7rd-L1O08jT63q1yKavoQA200iJbxFbKzhg&s" alt={project.projectName} className="mr-2 w-16 h-16 rounded-full" />
//                     <h2 className="text-3xl mb-2 cursor-pointer">{project.projectName}</h2>
//                   </div>
//                   <button onClick={(event) => { handleLike(event, project._id) }} className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md flex items-center space-x-2 dark:text-white">
//                     <input className="check" type="checkbox" id="like-toggle" checked={isLiked} onClick={(e) => e.stopPropagation()} />
//                     <label className="container p-0" htmlFor="like-toggle" />
//                       <svg
//                         viewBox="0 0 512 512"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className={`icon ${isLiked ? 'active' : 'inactive'}`}
//                       >
//                         <path
//                           d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
//                         ></path>
//                       </svg>
//                       <div className="checkmark"></div>
//                       {/* <span className="like-text">Like</span> */}
//                   {/* </label> */}
//                   {/* <span className="ml-2">{likeCount}</span> */}
//                   </button>
//                   <div className=" ">
//                     <p className="text-xl mb-2">{project.category}</p>
//                     <p className="text-lg italic mb-4">{project.tagline}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center mt-3 border-t border-gray-200 pt-4">
//                   <img
//                     src={project.profileUrl}
//                     className="w-10 h-10 rounded-full mr-4"
//                   />
//                   <span className="lg:text-base w-full font-semibold dark:text-white flex gap-2 text-sm">
//                     Created by <span className="  flex gap-1 text-textmain">
//                       <h2>{project.firstName}</h2>
//                       <h2>{project.lastName}</h2>

//                     </span>
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Project;

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Navbar } from "../Components/Navbar";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ALL_PROJECTS } from "../graphql/query/projectQuery";
import { likeProject } from "../graphql/mutation/userMutation";
import { useUser } from '@clerk/clerk-react';

interface ProjectType {
  _id: string;
  projectName: string;
  category: string;
  tagline: string;
  description: string;
  githubRepoLink: string;
  likes: string[];
  liveLink: string;
  images: string[];
  logo: string;
  likesCount: number;
  username: string;
  profileUrl: string;
  firstName: string;
  lastName: string;
  clerkUserId: string;
}

const Project: React.FC = () => {
  const { data, loading, error } = useQuery<{ getAllProjects: ProjectType[] }>(
    GET_ALL_PROJECTS
  );
  const [likeProjectMutation] = useMutation(likeProject);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const navigate = useNavigate();
  const { user } = useUser();
  const [likeStates, setLikeStates] = useState<{ [key: string]: { isLiked: boolean; likeCount: number } }>({});


  useEffect(() => {
    if (data) {
      setProjects(data.getAllProjects);
      //temporary solution
      console.log(data);
      const initialStates = data.getAllProjects.reduce((acc, project) => {
        console.log(project.likes.includes(user?.id!));
        acc[project._id] = {
          isLiked: project.likes.includes(user?.id!),
          likeCount: project.likesCount
        };
        return acc;
      }, {} as { [key: string]: { isLiked: boolean; likeCount: number } });

      setLikeStates(initialStates);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
  };

  const redirectToProjectDetails = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  if (loading) return (
    <div className="loader flex justify-center items-center h-screen">
      <div data-glitch="Loading..." className="glitch relative font-bold text-2xl tracking-widest z-10 text-white animate-shift">
        Loading...
        <span className="absolute top-0 left-0 opacity-80 text-purple-600 animate-glitch -z-10">{'Loading...'}</span>
        <span className="absolute top-0 left-0 opacity-80 text-green-500 animate-glitchReverse -z-20">{'Loading...'}</span>
      </div>
    </div>
  );
  if (error) return <p>Error: {error.message}</p>;



  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>, projectId: string) => {
    event.stopPropagation();

    try {
      const { data } = await likeProjectMutation({
        variables: {
          clerkUserId: user?.id || '',
          projectId: projectId,
        },
      });
      console.log(data);

      if (data?.LIKE_PROJECT) {
        setLikeStates(prevStates => ({
          ...prevStates,
          [projectId]: {
            isLiked: data.LIKE_PROJECT.likes.includes(user?.id || ''),
            likeCount: data.LIKE_PROJECT.likesCount,
          },
        }));
      }
    } catch (err) {
      console.error("Error liking project:", err);
    }
  };


  return (
    <>
      <Navbar />
      <div className="bg-white dark:border-b-slate-700 dark:bg-background min-h-screen   text-2xl text-slate-200  flex justify-center items-center overflow-x-hidden ">
        <div className="flex h-full gap-6 p-6 items-center w-full flex-col ">
          <div className="flex flex-col gap-3 w-full  justify-center items-center">
            <h1 className="text-4xl mb-4 ml-40 text-black dark:text-white font-semibold w-full">
              Projects ({filteredProjects.length})
            </h1>
            <div className="flex w-full justify-center items-center mb-10 p-5 mx-40 bg-white dark:border-b-slate-700 dark:bg-background rounded-xl shadow-xl">
              <div className="relative lg:w-2/3 w-full">
                <FaSearch className="absolute left-3 top-3 text-black dark:text-white" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 p-2 text-black dark:text-white w-full rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300"
                />
              </div>
              <select
                value={filterCategory}
                onChange={handleFilterChange}
                className="p-2 ml-2 text-black dark:text-white rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300 lg:block hidden"
              >
                <option value="All">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
                {/* Add more filter options as needed */}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-center lg:gap-8 gap-4 p-4 lg:px-24 w-full">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white dark:border-b-slate-700 dark:bg-background text-textmain font-bold font-royal4 p-8 rounded-lg shadow-lg cursor-pointer  border-2 w-full lg:w-[calc(50%-16px)] "
                onClick={() => redirectToProjectDetails(project._id)}
              >
                <div className="flex flex-col gap-5 p-3 relative">
                  <div className="flex gap-4 items-center justify-between w-full">
                    <div className="flex gap-4 items-center ">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7rd-L1O08jT63q1yKavoQA200iJbxFbKzhg&s"
                        alt={project.projectName}
                        className="mr-2 w-16 h-16 rounded-full"
                      />
                      <h2 className="text-3xl mb-2 cursor-pointer">
                        {project.projectName}
                      </h2>
                    </div>
                    <button
                      onClick={(event) => handleLike(event, project._id)}
                      className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md flex items-center space-x-2 dark:text-white realative w-16 p-3 left-40"
                    >
                      <input
                        className="check"
                        type="checkbox"
                        id={`like-toggle-${project._id}`}
                        checked={likeStates[project._id]?.isLiked || false}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label
                        className="container p-0"
                        htmlFor={`like-toggle-${project._id}`}
                      />
                      <svg
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        className={'border-2 text-2xl icon w-96'}
                      >
                        <path
                          d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                          fill={likeStates[project._id]?.isLiked ? "red" : "red"}
                        ></path>
                      </svg>
                      <span className="ml-2">{likeStates[project._id]?.likeCount || 0}</span>
                    </button>
                  </div>

                  <div>
                    <p className="text-xl mb-2">{project.category}</p>
                    <p className="text-lg italic mb-4">{project.tagline}</p>
                  </div>
                </div>

                <div
                  className="flex items-center mt-3 border-t border-gray-200 pt-4"
                >
                  <img
                    src={project.profileUrl || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fno-profile-image&psig=AOvVaw2_Cu-TGSMG306P_Kbm1Z46&ust=1725214607640000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJis8rLrn4gDFQAAAAAdAAAAABAE"}
                    className="w-10 h-10 rounded-full mr-4"
                    alt={`${project.firstName} ${project.lastName}`}

                  />
                  <span className="lg:text-base w-full font-semibold dark:text-white flex gap-2 text-sm">
                    Created by{" "}
                    <span className="flex gap-1 text-textmain">
                      <h2>{project.firstName}</h2>
                      <h2>{project.lastName}</h2>
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;



