import React, { useState, useEffect } from "react";
import { FaHeart, FaSearch, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import Carousel from "../Components/Carousel";
import { Navbar } from "../Components/Navbar";
import { useQuery } from "@apollo/client";
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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

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

  const openModal = (project: ProjectType) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
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
          <h1 className="text-4xl mb-4 ml-40 text-black dark:text-white font-semibold">Projects ({filteredProjects.length})</h1>
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
            <select value={filterCategory} onChange={handleFilterChange} className="p-2 ml-2 text-black dark:text-white rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300">
              <option value="All">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              {/* Add more filter options as needed */}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-40">
            {filteredProjects.map((project) => (
              <div key={project._id} className="bg-white border-2 dark:border-b-slate-700 dark:bg-background text-textmain font-bold font-royal4 p-8 rounded-lg shadow-lg cursor-pointer" onClick={() => openModal(project)}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={project.logo} alt={project.projectName} className="mr-2 w-16 h-16" />
                    <h2 className="text-3xl mb-2 cursor-pointer">{project.projectName}</h2>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event from bubbling up to parent div
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
          {selectedProject && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Project Details"
              className="relative bg-white dark:border-b-slate-700 dark:bg-background p-6 rounded-lg shadow-xl mx-auto my-5 max-w-4xl min-w-[500px] text-black z-30"
              overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
            >
              <div className="flex items-start mb-4">
                <img
                  src={selectedProject.logo}
                  alt={selectedProject.projectName}
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <div className="flex-1 mt-4">
                  <h2 className="text-2xl font-semibold mb-2">{selectedProject.projectName}</h2>
                </div>
                <div className="flex items-center space-x-4 absolute right-8 top-8 gap-2">
                  <button className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-2">
                    <a
                      href={selectedProject.githubRepoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      GitHub
                    </a>
                  </button>
                  <button className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-2">
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Visit
                    </a>
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-white dark:border-b-slate-700 dark:bg-background border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-3 flex items-center space-x-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              <p className="text-lg italic mb-2">{selectedProject.tagline}</p>
              <p className="text-base mb-4">{selectedProject.description}</p>
              <div className="mt-6">
                <Carousel images={selectedProject.images} /> {/* Pass an array of images */}
              </div>
              <div className="flex items-center mt-6 border-t border-gray-200 pt-4">
                <img
                  src={selectedProject.avatarUrl}
                  alt={selectedProject.username}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <p className="text-base font-semibold">
                  Created by <span className="text-gray-700">{selectedProject.username}</span>
                </p>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
