// import React from 'react';
import { Navbar } from "../Components";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubCalendar from 'react-github-calendar';

import { UserSolvedProblemsStats } from "react-leetcode";

const theme = {
    primaryColor: "#ffffff", // textmain
    secondaryColor: "#ffffff", // textmain (since all text should use textmain color)
    bgColor: "#034078" // mainbg
  };

const UserDashboard = () => {
    return (
        <div className=" bg-slate-300">
            <Navbar />

            <div className=" min-h-screen w-full h-fit bg-mainbg p-8 flex gap-6 border-2  flex-wrap md:flex-nowrap">
                <div className=" w-96 md:h-screen h-fit  flex gap-4 md:flex-col flex-wrap md:flex-nowrap  ">

                    <div className=" w-full h-4/5 rounded-md bg-secondbg shadow-2xl border border-zinc-300 flex flex-col gap-3">

                        <div className=" w-full h-2/4 p-5 flex flex-col gap-2">


                            <div className=" w-full h-1/2 flex justify-center items-center">

                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s"
                                    sx={{ width: 96, height: 96 }}
                                    className=" border-4 border-blue-900"
                                />

                            </div>

                            <div className=" w-full h-1/4 flex justify-center items-center">
                                <h1 className=" text-3xl font-extrabold font-royal4 text-textmain">Shreyam Kundu</h1>
                            </div>

                            <div className=" w-full h-8 flex justify-center items-center">
                                <span className=" text-lg font-semibold font-royal4 text-textmain">A Fullstack Developer</span>
                            </div>

                            <div className="w-full h-1/4 flex justify-center items-center gap-6">
                                <span className="">
                                    <Link to=''>
                                        <img src="./github.svg" className=" h-8 w-8" alt="" />
                                    </Link>
                                </span>
                                <span>
                                    <Link to=''>
                                        <img src="./linkedin.svg" className="h-8 w-8 " alt="" />
                                    </Link>
                                </span>
                                <span>
                                    <Link to=''>
                                        <img src="./portfolio.svg" className="h-8 w-8 " alt="" />
                                    </Link>
                                </span>
                                <span>
                                    <Link to=''>
                                        <img src="./twitter.svg" className="h-8 w-8 " alt="" />
                                    </Link>
                                </span>
                            </div>

                        </div>

                        <div className=" w-full h-1/5  flex justify-center items-center flex-col gap-4">

                            <div className=" w-1/2 h-auto flex justify-center items-center">
                                <Link to='./edit ' className=" w-full  rounded-md bg-textfourth text-textsecond flex justify-center items-center p-1 font-royal4" >
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

                    <div className=" w-full h-48  flex gap-4">

                        <div className=" w-1/3 h-full rounded-lg bg-secondbg shadow-2xl border border-zinc-300 flex justify-center items-center">

                           <div > <UserSolvedProblemsStats userName="snikdhendupramanik"  theme={theme} /></div>

                        </div>

                        <div className=" w-2/3 h-full rounded-md  shadow-2xl border border-zinc-300 p-3 bg-white text-textmain font-royal4 font-bold">
                            <GitHubCalendar
                                username="Xeven777"
                                colorScheme='light' />
                        </div>



                    </div>
                    <div className=" w-full h-2/3  flex gap-5  flex-wrap md:flex-nowrap">
                        <div className=" h-full w-2/3 rounded-md bg-secondbg shadow-2xl border border-zinc-300">


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
