import  { useState, useEffect } from 'react';
import { LeetCodeStats, Userproject, Userroadmap } from "../../Components";
import { Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import GitHubCalendar from "react-github-calendar";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Components/Navbar";
import { useUser } from "@clerk/clerk-react";
import { EditProject } from "../../Components";
import { useTheme } from "../../Components/theme-provider";
import { useQuery } from "@apollo/client";
import { getUsers } from "../../graphql/query/userQuery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import { RootState } from '../../../store';
import ReadonlyDashboard from "./ReadonlyDashboard";
import {
  setCollegeName,
  setEmail,
  setFirstName,
  setLastName,
  setLocation,
  setProfileUrl,
  setGithubLink,
  setLeetcodeLink,
  setLinkedInLink,
  setPortfolioLink,
  setTwitterLink,
  setProjects,
  setFlowcharts,
  setAbout,
  setYear,
  setTechnology
} from "../../../features/userSlice";

const UserDashboard = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const userState: any = useSelector((state: RootState) => state.user);
  const { id } = useParams();

  // Remove the skip condition to always fetch data
  const { data, refetch } = useQuery(getUsers, {
    variables: { clerkUserId: id },
  });

  const achievements = [
    "Won 1st place in the Devbits 2024 Hackathon.",
    "Completed 100+ coding challenges on LeetCode.",
    "Published 3 technical blogs on Medium.",
    "Achieved AWS Certified Solutions Architect - Associate.",
    "Contributed to 10+ open-source projects.",
  ];

  useEffect(() => {
    if (data) {
      const userData = data.getUserById;
      // Only update the Redux store if the fetched data differs from the current state
      if (userState.email !== userData.email) {
        dispatch(setCollegeName(userData.collegeName));
        dispatch(setEmail(userData.email));
        dispatch(setFirstName(userData.firstName));
        dispatch(setLastName(userData.lastName));
        dispatch(setLocation(userData.location));
        dispatch(setProfileUrl(userData.profileUrl));
        dispatch(setGithubLink(userData.links.github));
        dispatch(setLeetcodeLink(userData.links.leetcode));
        dispatch(setLinkedInLink(userData.links.linkedIn));
        dispatch(setPortfolioLink(userData.links.portfolio));
        dispatch(setTwitterLink(userData.links.twitter));
        dispatch(setProjects(userData.projects));
        dispatch(setFlowcharts(userData.flowcharts));
        dispatch(setAbout(userData.about));
        dispatch(setYear(userData.year));
        dispatch(setTechnology(userData.technologies));
        console.log(data);
      }
    }
  }, [data, dispatch, userState]);

  const [selectedContent, setSelectedContent] = useState<"project" | "roadmap">("project");
  const technologies = [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "React.js",
    "Redux Toolkit",
    "Google AI Studio",
  ];

  const navigate = useNavigate();

  const handlePlusClick = () => {
    if (selectedContent === "project") {
      openModal(); 
    } else if (selectedContent === "roadmap") {
      navigate("./createroadmap"); 
    }
  };

  const openModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error('Modal element not found or is not a dialog.');
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    } else {
      console.error('Modal element not found or is not a dialog.');
    }
  };

  const getUsername = (githubUrl: string): string => {
    try {
      const url = new URL(githubUrl);
      const username = url.pathname.split('/').filter(Boolean).pop();
      return username || '';
    } catch (error) {
      console.error('Invalid GitHub URL', error);
      return '';
    }
  };

  const avatarUrl = userState.profileUrl;
  const githubUrl = userState.links.github;
  const leetcodeUrl = userState.links.leetcode;
  const githubUsername = getUsername(githubUrl);
  const leetcodeUsername = getUsername(leetcodeUrl);
  const location = userState.location;
  const college = userState.collegeName;
  const year = userState.year;
  const about = userState.about;

  // Refetch user data on component mount or when 'id' changes
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (user?.id !== id) {
    return <ReadonlyDashboard />;
  }

  return (
    <div className="  dark:border-b-slate-700 dark:bg-background  h-auto overflow-y-auto">
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className=" min-h-screen lg:w-full  overflow-x-hidden h-fit overflow-y-auto bg-white dark:border-b-slate-700 dark:bg-background lg:p-8 p-4 flex gap-6  flex-wrap md:flex-nowrap justify-center items-center ">
        {/* Left Sidebar */}
        <div className=" w-96  justify-center items-center md:h-screen h-fit  flex gap-4 md:flex-col flex-wrap md:flex-nowrap  lg:p-0 p-8 ">
          {/* User Profile Card */}
          <div className="w-full h-4/5 rounded-md bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 flex flex-col gap-3 p-4">
            {/* Avatar and User Info */}
            <div className="w-full h-fit p-5 flex flex-col gap-2">
              {/* Avatar */}
              <div className="w-full h-1/2 flex justify-center items-center">
                <Avatar
                  src={avatarUrl}
                  sx={{ width: 96, height: 96 }}
                  className="border-4 border-textmain shadow-lg  shadow-current"
                />
              </div>

              {/* User Name */}
              <div className="w-full  flex justify-center items-center">
                <span className="flex gap-2 w-full justify-center items-center ">
                  <h1 className="lg:text-2xl text-lg font-extrabold font-royal4 text-textmain">
                    {userState.firstName}
                  </h1>
                  <h1 className="lg:text-2xl text-lg font-extrabold font-royal4 text-textmain">
                    {userState.lastName}
                  </h1>
                </span>
              </div>

              {/* User Role */}
              {
                about ? (
                  <div className="w-full h-8 flex justify-center items-center">
                    <span className="text-xl font-semibold font-royal4 text-textmain">
                      {about}
                    </span>
                  </div>

                ) : (
                  ""
                )
              }


              {/* Social Media Links */}
              {/* Social Media Links */}
              <div className="w-full h-1/4 flex justify-center items-center gap-6">
                {userState.links.github ? (
                  <span className=" bg-textmain rounded-md p-2">
                    <a
                      href={userState.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="h-5 w-5 " />
                    </a>
                  </span>
                ) : (
                  <span className=" bg-textmain rounded-md p-2 opacity-50 cursor-not-allowed">
                    <FaGithub className="h-5 w-5 " />
                  </span>
                )}

                {userState.links.linkedIn ? (
                  <span className=" bg-textmain rounded-md p-2">
                    <a
                      href={userState.links.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="h-5 w-5 " />
                    </a>
                  </span>
                ) : (
                  <span className=" bg-textmain rounded-md p-2 opacity-50 cursor-not-allowed">
                    <FaLinkedin className="h-5 w-5 " />
                  </span>
                )}

                {userState.links.portfolio ? (
                  <span className=" bg-textmain rounded-md p-2">
                    <a
                      href={userState.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGlobe className="h-5 w-5 " />
                    </a>
                  </span>
                ) : (
                  <span className=" bg-textmain rounded-md p-2 opacity-50 cursor-not-allowed">
                    <FaGlobe className="h-5 w-5 " />
                  </span>
                )}

                {userState.links.twitter ? (
                  <span className=" bg-textmain rounded-md p-2">
                    <a
                      href={userState.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="h-5 w-5 " />
                    </a>
                  </span>
                ) : (
                  <span className=" bg-textmain rounded-md p-2 opacity-50 cursor-not-allowed">
                    <FaTwitter className="h-5 w-5 " />
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <hr className="w-full border-t border-gray-300 dark:border-gray-800" />

            {/* Additional User Info */}
            <div className="w-full flex flex-col  gap-4 py-1  justify-center items-start">
              {/* Email */}
              <div className="flex  gap-2 w-full justify-left  px-4">
                <FaEnvelope className="text-textmain h-6 w-6" />
                <span className="lg:text-lg text-md font-semibold text-textmain">
                  {userState.email}
                </span>
              </div>

              {/* Location */}
              {location ? (
                <div className="flex items-center gap-2 w-full justify-left px-4">
                  <FaMapMarkerAlt className="text-textmain h-6 w-6" />
                  <span className="lg:text-lg text-md font-semibold text-textmain">
                    {location}
                  </span>
                </div>

              ) : (
                " "

              )}
            </div>

            <hr className="w-full border-t border-gray-300 dark:border-gray-800" />
            {/* Edit Profile Button */}
            <div className="w-full flex justify-center ">
              <Link
                to="./edit"
                className="w-1/2 rounded-md bg-blue-100 hover:bg-blue-300 text-textsecond flex justify-center items-center p-2 font-royal4"
              >
                Edit profile
              </Link>
            </div>
          </div>

          {/* Technologies and Education */}
          <div className=" w-full h-96 overflow-y-auto rounded-md bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 ">
            <div className="bg-transparent rounded-lg p-5">
              {/* Technologies Section */}
              <h2 className="text-lg font-semibold text-gray-600 dark:text-white mb-3">
                Technologies known:
              </h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-1 py-1 bg-textmain text-white  font-medium text-sm rounded-lg shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Education Section */}
            {
              college || year ? (
                <div className=" h-fit bg-transparent p-4 rounded-lg">
                  <h2 className="text-lg font-semibold dark:text-white text-textmain mb-3">
                    Education
                  </h2>
                  <ul className="space-y-3">

                    {college ? (
                      <li className="flex items-start">
                        <img
                          src="/college.png"
                          alt="Bullet point"
                          className="w-5 h-5 mr-3 mt-1 shadow-xl shadow-slate-200"
                        />
                        <span className="dark:text-white text-textmain font-royal4 font-medium ">
                          {college}
                        </span>
                      </li>

                    ) : (
                      " "
                    )
                    }
                    {year ? (
                      <li className="flex items-start">
                        <img
                          src="/college.png"
                          alt="Bullet point"
                          className="w-5 h-5 mr-3 mt-1 shadow-xl shadow-slate-200"
                        />
                        <span className="dark:text-white text-textmain font-royal4 font-medium ">
                          {year}
                        </span>
                      </li>

                    ) : (
                      " "
                    )
                    }
                  </ul>
                </div>

              ) : (
                " "

              )
            }

          </div>
        </div>

        {/* Main Content Area */}

        <div className=" w-full lg:w-3/4 md:h-screen h-fit flex md:flex-col gap-5  flex-wrap md:flex-nowrap ">
          {/* LeetCode and GitHub Stats */}
          <div className=" w-full h-1/3  flex flex-col lg:flex-row gap-4">
            {/* LeetCode Stats */}
            <div className=" w-full lg:w-1/3 h-full rounded-lg bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 flex justify-center items-center">

              {
                leetcodeUsername ? (
                  <LeetCodeStats
                    username={leetcodeUsername}
                    theme={theme === "dark" ? "dark" : "light"}
                  />

                ) : (
                  <p>Add leetcode</p>
                )
              }
            </div>
            {/* GitHub Calendar */}
            <div className="lg:w-2/3 w-full h-full rounded-md  shadow-2xl border bg-white dark:border-b-slate-700 dark:bg-background p-4 font-royal4 font-bold text-base">
              {githubUsername ? (
                <GitHubCalendar
                  username={githubUsername}
                  colorScheme={theme === "dark" ? "dark" : "light"}
                />
              ) : (
                <p>Add GitHub</p>
              )}
            </div>
          </div>

          {/* Projects and Roadmap Section */}
          <div className=" w-full lg:h-2/3 h-screen  flex gap-5  flex-col lg:flex-row ">
            {/* project and roadmap div */}
            <div className=" h-full w-full lg:w-2/3 rounded-md bg-white border-2 dark:border-b-slate-700 dark:bg-background shadow-2xl flex flex-col">
              {/* Toggle Buttons for Projects and Roadmap */}
              <div className=" h-1/6 w-full bg-white  dark:bg-background  flex justify-center items-center relative border-2">
                <div className=" flex gap-4 bg-blue-100 justify-center h-fit rounded-md p-1">
                  <button
                    onClick={() => setSelectedContent("project")}
                    className={`block  duration-500 p-3 rounded-md font-royal4 font-bold ${selectedContent === "project"
                      ? " bg-textmain text-secondbg"
                      : "text-textmain"
                      }`}
                  >
                    Project
                  </button>
                  <button
                    onClick={() => setSelectedContent("roadmap")}
                    className={`  duration-500 rounded-md font-royal4 p-3 font-bold ${selectedContent === "roadmap"
                      ? "bg-textmain text-secondbg"
                      : "text-textmain"
                      } `}
                  >
                    RoadMap
                  </button>
                </div>

                {/* Plus Button for Adding Projects/Roadmaps */}
                <div

                  className="relative left-6 lg:left-48 bg-textfourth rounded-full border-2 p-2 flex justify-center items-center cursor-pointer"
                >
                  <button onClick={handlePlusClick} className=" bg-textfourth rounded-full h-5 w-5 flex justify-center items-center">
                    <FontAwesomeIcon icon={faPlus} className="text-white" />
                  </button>


                </div>
              </div>
              {/* Projects or Roadmap Display */}
              <div className="h-5/6 flex flex-col  items-center overflow-y-auto  w-full">
                {selectedContent === "project" ? (
                  <Userproject />
                ) : (
                  <Userroadmap />
                )}
              </div>
            </div>
            {/* Achievements Section */}
            <div className=" h-full lg:w-1/3 w-full rounded-md bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border-2">
              <div className=" h-full bg-transparent p-4 rounded-lg">
                <h2 className="text-lg font-semibold dark:text-white text-textmain mb-3">
                  Achievements
                </h2>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start justify-evenly">
                      <img
                        src="/cup.png"
                        alt="Bullet point"
                        className="w-5 h-5 mr-3 mt-1 shadow-xl shadow-slate-200"
                      />
                      <span className="dark:text-white text-textmain font-royal4 font-medium ">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative shadow-lg w-11/12 max-w-5xl h-screen bg-white dark:bg-black text-textmain">
          <div className="flex justify-center items-center h-full">
            <EditProject closeModal={closeModal} />
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-3 hover:bg-textthird hover:text-white text-2xl bg-textfourth text-secondbg flex justify-center items-center rounded-full"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserDashboard;


