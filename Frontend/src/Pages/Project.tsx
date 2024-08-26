import React, { useState, useEffect } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { Navbar } from "../Components/Navbar";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom"; // or useNavigate from react-router-dom v6
import { GET_ALL_PROJECTS } from "../graphql/query/projectQuery";

interface ProjectType {
  _id: string;
  projectName: string;
  category: string;
  tagline: string;
  description: string;
  githubRepoLink: string;
  liveLink: string;
  images: string[];
  logo: string;
  likes: number;
  username: string;
  avatarUrl: string;
}

const Project: React.FC = () => {
  const { data, loading, error } = useQuery<{ getAllProjects: ProjectType[] }>(GET_ALL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const navigate = useNavigate(); // or useNavigate();

  useEffect(() => {
    if (data) {
      setProjects(data.getAllProjects);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
  };

  const handleLike = (_id: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === _id ? { ...project, likes: project.likes + 1 } : project
      )
    );
  };

  const redirectToProjectDetails = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="bg-white dark:border-b-slate-700 dark:bg-background min-h-screen text-2xl text-slate-200">
        <div className="p-4">
          <h1 className="text-4xl mb-4 ml-40 text-black dark:text-white font-semibold">
            Projects ({filteredProjects.length})
          </h1>
          <div className="flex justify-center items-center mb-10 p-5 mx-40 bg-white dark:border-b-slate-700 dark:bg-background rounded-xl shadow-xl">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3 text-black dark:text-white" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 p-2 text-black w-full rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300"
              />
            </div>
            <select
              value={filterCategory}
              onChange={handleFilterChange}
              className="p-2 ml-2 text-black dark:text-white rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300"
            >
              <option value="All">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              {/* Add more filter options as needed */}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-40">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white border-2 dark:border-b-slate-700 dark:bg-background text-textmain font-bold font-royal4 p-8 rounded-lg shadow-lg cursor-pointer"
                onClick={() => redirectToProjectDetails(project._id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={project.logo} alt={project.projectName} className="mr-2 w-16 h-16" />
                    <h2 className="text-3xl mb-2 cursor-pointer">{project.projectName}</h2>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(project._id);
                    }}
                    className="text-red-500 text-2xl focus:outline-none"
                  >
                    <FaHeart /> {project.likes}
                  </button>
                </div>
                <p className="text-xl mb-2">{project.category}</p>
                <p className="text-lg italic mb-4">{project.tagline}</p>
                <div className="flex items-center mt-4">
                  <img src={project.avatarUrl} alt={project.username} className="mr-2 w-10 h-10 rounded-full" />
                  <p className="text-lg">{project.username}</p>
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
