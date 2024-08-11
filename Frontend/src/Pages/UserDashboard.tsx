// import React from 'react';
import { Navbar, LeetCodeStats, Userproject, Userroadmap } from "../Components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubCalendar from 'react-github-calendar';
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    useUser
} from "@clerk/clerk-react";

import { useQuery } from '@apollo/client';
import { getUsers } from "../graphql/query/userQuery";

const UserDashboard = () => {

    //Use this loading and error for better performance
    const { loading, error, data } = useQuery(getUsers);
    console.log(data);
    
    const [selectedContent, setSelectedContent] = useState<'project' | 'roadmap'>('project');
    const { user } = useUser();
    if (!user) {
        return null; // Or handle the case when user is null
    }
    return (
        <div className=" bg-slate-300">
            <Navbar />

            <div className=" min-h-screen w-full h-fit bg-mainbg p-8 flex gap-6 border-2  flex-wrap md:flex-nowrap">
                <div className=" w-96 md:h-screen h-fit  flex gap-4 md:flex-col flex-wrap md:flex-nowrap  ">

                    <div className=" w-full h-4/5 rounded-md bg-secondbg shadow-2xl border border-zinc-300 flex flex-col gap-3">

                        <div className=" w-full h-2/4 p-5 flex flex-col gap-2">


                            <div className=" w-full h-1/2 flex justify-center items-center">

                                <Avatar
                                   
                                    src={user.imageUrl}
                                    sx={{ width: 96, height: 96 }}
                                    className=" border-4 border-blue-900"
                                />

                            </div>

                            <div className=" w-full h-1/4 flex justify-center items-center">
                                <h1 className=" text-3xl font-extrabold font-royal4 text-textmain">{user.fullName}</h1>
                            </div>

                            <div className=" w-full h-8 flex justify-center items-center">
                                <span className=" text-lg font-semibold font-royal4 text-textmain">A Fullstack Developer</span>
                            </div>

                            <div className="w-full h-1/4 flex justify-center items-center gap-6">
                                <span>
                                    <Link to=''>
                                        <img src="/github.svg" className="h-8 w-8" alt="GitHub" />
                                    </Link>
                                </span>
                                <span>
                                    <Link to=''>
                                        <img src="/linkedin.svg" className="h-8 w-8" alt="LinkedIn" />
                                    </Link>
                                </span>
                                <span>
                                    <Link to=''>
                                        <img src="/portfolio.svg" className="h-8 w-8" alt="Portfolio" />
                                    </Link>
                                </span>
                                <span>
                                    <Link to=''>
                                        <img src="/twitter.svg" className="h-8 w-8" alt="Twitter" />
                                    </Link>
                                </span>
                            </div>


                        </div>

                        <div className=" w-full h-1/5  flex justify-center items-center flex-col gap-4">

                            <div className=" w-1/2 h-auto flex justify-center items-center">
                                <Link to='./edit ' className=" w-full  rounded-md bg-blue-100 hover:bg-blue-300 text-textsecond flex justify-center items-center p-1 font-royal4" >
                                    Edit profile
                                </Link>

                            </div>
                            <div className=" flex gap-3">
                                <Link to=' ' className=" w-24 h-full rounded-sm bg-textmain text-white flex justify-center items-center p-2 font-royal4" >
                                    Connect
                                </Link>
                                <Link to=' ' className=" w-1/2 h-full rounded-sm bg-textmain text-white flex justify-center items-center p-2 font-royal-4" >
                                    Message
                                </Link>
                            </div>

                        </div>

                        <div className=" w-full h-1/5  flex p-10">

                            <div className=" w-1/3 h-full flex justify-center items-center flex-col gap-3 text-textmain font-semibold text-base font-royal4">
                                <h1>Project</h1>
                                <span className=" font-extrabold text-2xl">80</span>
                            </div>
                            <div className=" w-1/3 h-full flex justify-center items-center flex-col gap-3 text-textmain font-semibold text-base font-royal4">
                                <h1>Connection</h1>
                                <span className=" font-extrabold text-2xl">12</span>
                            </div>
                            <div className=" w-1/3 h-full flex justify-center items-center flex-col gap-3 text-textmain font-semibold text-base font-royal4">
                                <h1>Following</h1>
                                <span className="font-extrabold text-2xl">67</span>
                            </div>
                        </div>




                    </div>





                    <div className=" w-full h-96 overflow-y-auto rounded-md bg-secondbg shadow-2xl border border-zinc-300 ">

                    </div>


                </div>

                <div className=" w-3/4 md:h-screen h-fit flex md:flex-col gap-5  flex-wrap md:flex-nowrap ">

                    <div className=" w-full h-1/3  flex gap-4">

                        <div className=" w-1/3 h-full rounded-lg bg-secondbg shadow-2xl border border-zinc-300 flex justify-center items-center">

                            {/* <div > <UserSolvedProblemsStats userName="snikdhendupramanik"  /></div> */}
                            <LeetCodeStats username="Snikdhendupramanik" theme="light" />

                        </div>

                        <div className=" w-2/3 h-full rounded-md  shadow-2xl border border-zinc-300 p-3 bg-white text-textmain font-royal4 font-bold">
                            <GitHubCalendar
                                username="Xeven777"
                                colorScheme='light' />
                        </div>



                    </div>

                    <div className=" w-full h-2/3  flex gap-5  flex-wrap md:flex-nowrap">
                        {/* project and roadmap div */}
                        <div className=" h-full w-2/3 rounded-md bg-secondbg shadow-2xl border  flex flex-col ">
                            <div className=" h-1/6 w-full border-2 bg-mainbg  flex justify-center items-center relative">

                                <div className=" flex gap-4 bg-blue-100 justify-center h-fit rounded-md p-1"><button
                                    onClick={() => setSelectedContent('project')}
                                    className={`block  duration-500 p-3 rounded-md font-royal4 font-bold ${selectedContent === 'project' ? ' bg-textthird text-secondbg' : 'text-textmain'}`}
                                >
                                    Project
                                </button>
                                    <button
                                        onClick={() => setSelectedContent('roadmap')}
                                        className={`  duration-500 rounded-md font-royal4 p-3 font-bold ${selectedContent === 'roadmap' ? 'bg-textthird text-secondbg' : 'text-textmain'} `}
                                    >
                                        RoadMap
                                    </button>
                                </div>

                                <div className=" relative left-48 bg-textfourth rounded-full p-2 flex justify-center items-center">
                                    <FontAwesomeIcon icon={faPlus} className=' text-mainbg h-6 w-6' />
                                </div>
                            </div>
                            <div className="h-5/6 border-2 overflow-y-auto  w-full">
                                {selectedContent === 'project' ? <Userproject /> : <Userroadmap />}
                            </div>


                        </div>
                        <div className=" h-full w-1/3 rounded-md bg-secondbg shadow-2xl border border-zinc-300">


                        </div>

                    </div>


                </div>

            </div>
        </div>
    );
}

export default UserDashboard;
