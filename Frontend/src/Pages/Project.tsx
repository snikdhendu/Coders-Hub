import React, { useState } from "react";
import { Navbar } from "../Components";
import { FaHeart, FaSearch, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import Carousel from "../Components/Carousel";

interface ProjectType {
  id: number;
  name: string;
  category: string;
  tagline: string;
  description: string;
  link: string;
  imageUrl: string;
  likes: number;
  username: string;
  avatarUrl: string;
}

const projectList: ProjectType[] = [
  {
    id: 1,
    name: "Project One",
    category: "Web Development",
    tagline: "Building responsive websites",
    description: "This project involves creating a responsive website using HTML, CSS, and JavaScript.",
    link: "https://example.com/project-one",
    imageUrl: "/Logo-1392644265.png",
    likes: 0,
    username: "Shreyam Kundu",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
  },
  {
    id: 2,
    name: "Project Two",
    category: "Mobile Development",
    tagline: "Creating mobile applications",
    description: "This project involves creating a mobile app using React Native.",
    link: "https://example.com/project-two",
    imageUrl: "/Logo-1392644265.png",
    likes: 0,
    username: "Shreyam Kundu",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
  },
  {
    id: 3,
    name: "Project Three",
    category: "Data Science",
    tagline: "Analyzing data patterns",
    description: "This project involves analyzing data using Python and various data science libraries.",
    link: "https://example.com/project-three",
    imageUrl: "/Logo-1392644265.png",
    likes: 0,
    username: "Shreyam Kundu",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
  },
  {
    id: 4,
    name: "Project Four",
    category: "Artificial Intelligence",
    tagline: "Analyzing data patterns",
    description: "This project involves analyzing data using Python and various data science libraries.",
    link: "https://example.com/project-three",
    imageUrl: "/Logo-1392644265.png",
    likes: 0,
    username: "Shreyam Kundu",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
  },
  // Add more projects as needed
];



const Project: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [projects, setProjects] = useState<ProjectType[]>(projectList);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const images = [
    // Add your images here
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x400",
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
  };

  const handleLike = (id: number) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, likes: project.likes + 1 } : project
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
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "All" || project.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-mainbg min-h-screen text-2xl text-slate-200">
      <Navbar />
      <div className="p-4">
        <h1 className="text-4xl mb-4 ml-40 text-black font-semibold">Projects ({filteredProjects.length})</h1>
        <div className="flex justify-center items-center mb-10 p-5 mx-40 bg-gray-200 rounded-xl shadow-xl ">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-3 text-black" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 p-2 text-black w-full rounded-xl bg-white border border-gray-300"
            />
          </div>
          <select value={filterCategory} onChange={handleFilterChange} className="p-2 ml-2 text-black rounded-xl bg-white border border-gray-300">
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Data Science">Data Science</option>
            {/* Add more filter options as needed */}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-40">
          {filteredProjects.map((project) => (
            <div key={project.id} className=" bg-secondbg text-textmain font-bold font-royal4 p-8 rounded-lg shadow-lg cursor-pointer" onClick={() => openModal(project)}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={project.imageUrl} alt={project.name} className="mr-2 w-16 h-16" />
                  <h2 className="text-3xl mb-2 cursor-pointer" >
                    {project.name}
                  </h2>
                </div>
                <button
                  onClick={() => handleLike(project.id)}
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
            className="relative bg-white p-6 rounded-lg shadow-xl mx-auto my-5 max-w-4xl min-w-[500px] outline-none text-black z-30"
            overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
          >

            <div className="flex items-start mb-4">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div className="flex-1 mt-4">
                <h2 className="text-2xl font-semibold mb-2">{selectedProject.name}</h2>
              </div>
              <div className="flex items-center space-x-4 absolute right-8 top-8  gap-2">
                <button className="bg-white border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-2">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Visit
                  </a>
                </button>
                <button className="bg-white border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-2 flex items-center space-x-2">
                  <FaHeart />
                  <span className="ml-2">{selectedProject.likes}</span>
                </button>

                <button
                  onClick={closeModal}
                  className=" bg-white border border-black text-gray-800 hover:bg-gray-200 rounded-md px-4 py-3 flex items-center space-x-2"
                >
                  <FaTimes />
                </button>

              </div>
            </div>
            <p className="text-lg italic mb-2">{selectedProject.tagline}</p>
            <p className="text-base mb-4">{selectedProject.description}</p>
            <div className="mt-6">
              <Carousel images={images} />
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
  );
};

export default Project;
