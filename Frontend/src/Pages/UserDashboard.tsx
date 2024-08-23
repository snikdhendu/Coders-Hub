// import React from 'react';
import { LeetCodeStats, Userproject, Userroadmap } from "../Components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubCalendar from "react-github-calendar";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../Components/Navbar";
import { useUser } from "@clerk/clerk-react";
import { EditProect } from "../Components";
import { useTheme } from "../Components/theme-provider";

import { useQuery } from "@apollo/client";
import { getUsers } from "../graphql/query/userQuery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
} from "../../features/userSlice";
import { RootState } from "../../store";

const UserDashboard = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  if (!user) {
    return null; // Or handle the case when user is null
  }
  //Use this loading and error for better performance
  const { loading, error, data } = useQuery(getUsers, {
    variables: { clerkUserId: user.id },
  });
  const achievements = [
    "Won 1st place in the Devbits 2024 Hackathon.",
    "Completed 100+ coding challenges on LeetCode.",
    "Published 3 technical blogs on Medium.",
    "Achieved AWS Certified Solutions Architect - Associate.",
    "Contributed to 10+ open-source projects.",
  ];
  const Education = ["Techno Main Saltlake", "Third Year"];
  useEffect(() => {
    if (data) {
      const userData = data.getUserById;
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
      console.log(data);
    }
  }, [data, dispatch]);

  const [selectedContent, setSelectedContent] = useState<"project" | "roadmap">(
    "project"
  );
  const userState: any = useSelector((state: RootState) => state.user);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlusClick = () => {
    if (selectedContent === "project") {
      openModal(); // Open the modal if in the project tab
    } else if (selectedContent === "roadmap") {
      navigate('./roadmap'); // Navigate to the roadmap route if in the roadmap tab
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

  return (
    <div className="  dark:border-b-slate-700 dark:bg-background  h-auto overflow-y-auto">
      <Navbar />

      <div className=" min-h-screen w-full h-fit overflow-y-auto bg-white dark:border-b-slate-700 dark:bg-background p-8 flex gap-6  flex-wrap md:flex-nowrap ">
        <div className=" w-96 md:h-screen h-fit  flex gap-4 md:flex-col flex-wrap md:flex-nowrap  ">
          <div className=" w-full h-4/5 rounded-md bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 flex flex-col gap-3">
            <div className=" w-full h-2/4 p-5 flex flex-col gap-2">
              <div className=" w-full h-1/2 flex justify-center items-center">
                <Avatar
                  src={user.imageUrl}
                  sx={{ width: 96, height: 96 }}
                  className=" border-4 border-textmain"
                />
              </div>

              <div className=" w-full h-1/4 flex justify-center items-center">
                <h1 className=" text-3xl font-extrabold font-royal4 text-textmain">
                  {user.fullName}
                </h1>
              </div>

              <div className=" w-full h-8 flex justify-center items-center">
                <span className=" text-lg font-semibold font-royal4 text-textmain">
                  A Fullstack Developer
                </span>
              </div>

              <div className="w-full h-1/4 flex justify-center items-center gap-6">
                <span>
                  <a
                    href={userState.links.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/github.svg" className="h-8 w-8" alt="GitHub" />
                  </a>
                </span>
                <span>
                  <a href={userState.links.linkedIn || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/linkedin.svg"
                      className="h-8 w-8"
                      alt="LinkedIn"
                    />
                  </a>
                </span>
                <span>
                  <a href={userState.links.portfolio || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/portfolio.svg"
                      className="h-8 w-8"
                      alt="Portfolio"
                    />
                  </a>
                </span>
                <span>
                  <a href={userState.links.twitter || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/twitter.svg" className="h-8 w-8" alt="Twitter" />
                  </a>
                </span>
              </div>
            </div>

            <div className=" w-full h-1/4 mt-10  flex justify-center items-center flex-col gap-12">
              <div className=" w-1/2 h-auto  flex justify-center items-center">
                <Link
                  to="./edit "
                  className=" w-full  rounded-md bg-blue-100 hover:bg-blue-300 text-textsecond flex justify-center items-center p-1 font-royal4"
                >
                  Edit profile
                </Link>
              </div>
              {/* <div className=" flex gap-3">
                <Link
                  to=" "
                  className=" w-24 h-full rounded-sm bg-textmain text-white flex justify-center items-center p-2 font-royal4"
                >
                  Connect
                </Link>
                <Link
                  to=" "
                  className=" w-1/2 h-full rounded-sm bg-textmain text-white flex justify-center items-center p-2 font-royal-4"
                >
                  Message
                </Link>
              </div> */}
              <div className=" flex gap-4  w-full justify-center items-center">
                <img src="/loc.png" alt="" className=" h-8 w-8" />
                <h1 className=" inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-bold text-2xl">
                  Kolkata
                </h1>
              </div>
            </div>
          </div>

          <div className=" w-full h-96 overflow-y-auto rounded-md bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 ">
            <div className="bg-transparent rounded-lg p-5">
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
            <div className=" h-full bg-transparent p-4 rounded-lg">
              <h2 className="text-lg font-semibold dark:text-white text-textmain mb-3">
                Education
              </h2>
              <ul className="space-y-3">
                {Education.map((Education, index) => (
                  <li key={index} className="flex items-start">
                    <img
                      src="/college.png"
                      alt="Bullet point"
                      className="w-5 h-5 mr-3 mt-1 shadow-xl shadow-slate-200"
                    />
                    <span className="dark:text-white text-textmain font-royal4 font-medium ">
                      {Education}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className=" w-full lg:w-3/4 md:h-screen h-fit flex md:flex-col gap-5  flex-wrap md:flex-nowrap ">
          <div className=" w-full h-1/3  flex flex-col lg:flex-row gap-4 ">
            <div className=" w-full lg:w-1/3 h-full rounded-lg bg-white dark:border-b-slate-700 dark:bg-background shadow-2xl border border-zinc-300 flex justify-center items-center">
              {/* <div > <UserSolvedProblemsStats userName="snikdhendupramanik"  /></div> */}
              <LeetCodeStats
                username="Snikdhendupramanik"
                theme={theme === "dark" ? "dark" : "light"}
              />
            </div>

            <div className="lg:w-2/3 w-full h-full rounded-md  shadow-2xl border bg-white dark:border-b-slate-700 dark:bg-background p-4 font-royal4 font-bold text-base">
              <GitHubCalendar
                username="Xeven777"
                colorScheme={theme === "dark" ? "dark" : "light"}
              />
            </div>
          </div>

          <div className=" w-full lg:h-2/3 h-screen  flex gap-5  flex-col lg:flex-row ">
            {/* project and roadmap div */}
            <div className=" h-full w-full lg:w-2/3 rounded-md bg-white border-2 dark:border-b-slate-700 dark:bg-background shadow-2xl flex flex-col">
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


                <div
                  onClick={handlePlusClick}
                  className="relative left-6 lg:left-48 bg-textfourth rounded-full border-2 p-2 flex justify-center items-center cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-mainbg h-6 w-6"
                  />


                </div>
              </div>
              <div className="h-5/6  overflow-y-auto  w-full">
                {selectedContent === "project" ? (
                  <Userproject />
                ) : (
                  <Userroadmap />
                )}
              </div>
            </div>
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
      {isModalOpen && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box relative shadow-lg w-11/12 max-w-5xl h-screen bg-white dark:bg-black text-textmain">
            <form
              method="dialog"
              className="flex justify-center items-center h-full"
            >
              <EditProect />
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-3 hover:bg-textthird hover:text-white text-2xl bg-textfourth text-secondbg flex justify-center items-center rounded-full"
                onClick={() => setIsModalOpen(false)} // Close modal on button click
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UserDashboard;
