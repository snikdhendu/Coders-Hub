import React, { useState } from "react";
import { Navbar } from "../Components";
import { FaHeart,FaSearch } from "react-icons/fa";
import Modal from "react-modal";

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
              className="pl-10 p-2 text-black w-full rounded-xl"
            />
          </div>
          <select value={filterCategory} onChange={handleFilterChange} className="p-2 ml-2 text-black rounded-xl">
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Data Science">Data Science</option>
            {/* Add more filter options as needed */}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-40">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={project.imageUrl} alt={project.name} className="mr-2 w-16 h-16" />
                  <h2 className="text-3xl mb-2 cursor-pointer" onClick={() => openModal(project)}>
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
            className="bg-white p-6 rounded-lg shadow-lg mx-auto my-20 max-w-3xl outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <img src={selectedProject.imageUrl} alt={selectedProject.name} className="mb-4 w-full h-64 object-cover rounded" />
            <h2 className="text-3xl mb-4">{selectedProject.name}</h2>
            <p className="text-xl mb-4">{selectedProject.category}</p>
            <p className="text-lg mb-4">{selectedProject.tagline}</p>
            <p className="mb-4">{selectedProject.description}</p>
            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mx-5">
              Project Link
            </a>
            <div className="flex items-center mt-4">
              <img src={selectedProject.avatarUrl} alt={selectedProject.username} className="mr-2 w-8 h-8 rounded-full" />
              <p className="text-lg">{selectedProject.username}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Project;
