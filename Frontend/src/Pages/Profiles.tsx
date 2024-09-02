import { Navbar } from "../Components/Navbar";
import { useQuery } from "@apollo/client";
import { getAllUsers } from "../graphql/query/userQuery";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import Avatar from "react-avatar";

interface ProfileType {
    clerkUserId: string
    firstName: string;
    lastName: string;
    email: string;
    collegeName: string;
    location: string;
    profileUrl: string;
}

const Profiles = () => {
    const { data, loading, error } = useQuery<{ getAllUsers: ProfileType[] }>(getAllUsers);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [profiles, setProfiles] = useState<ProfileType[]>([]);
    console.log(data);

    useEffect(() => {
        if (data) {
            setProfiles(data.getAllUsers);
        }
    }, [data]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredProfiles = profiles.filter((profiles) => {
        const matchesSearch = profiles.firstName.toLowerCase().includes(searchQuery.toLowerCase());
        // const matchesFilter = filterCategory === "All" || project.category === filterCategory;
        return matchesSearch;
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
    console.log(profiles[0]?.clerkUserId);

    return (
        <section className=" min-h-screen">
            <Navbar />
            <div className="bg-white dark:border-b-slate-700 dark:bg-background min-h-screen text-2xl text-slate-200  flex justify-center items-center overflow-x-hidden">
                <div className="p-4 flex justify-center items-center  w-full flex-col">
                    <div className="flex w-full justify-center items-center mb-10 p-5 bg-white dark:border-b-slate-700 dark:bg-background rounded-xl shadow-xl">
                        <div className="relative w-full lg:w-2/3  ">
                            <FaSearch className="absolute left-3 top-3 text-black dark:text-white" />
                            <input
                                type="text"
                                placeholder="Search profiles..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-10 p-2 text-black dark:text-white w-full rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1  lg:w-11/12 w-full">
                        {filteredProfiles.map((profiles) => (

                            // <div
                            //     key={profiles._id}
                            //     className="bg-white border-2 dark:border-b-slate-700 dark:bg-background text-textmain font-bold font-royal4 p-8 rounded-lg shadow-lg cursor-pointer"
                            // // onClick={() => redirectToProjectDetails(project._id)}
                            // >
                            //     <div className="flex justify-between items-center">
                            //         <div className="flex items-center">
                            //             <img src={profiles.profileUrl} alt={profiles.firstName} className="mr-2 w-16 h-16" />
                            //             <span className="text-3xl flex mb-2 cursor-pointer gap-2">
                            //                 <h2>{profiles.firstName}</h2>
                            //                 <h2>{profiles.lastName}</h2>
                            //             </span>
                            //         </div>
                            //     </div>
                            //     <p className="text-xl mb-2">{profiles.location}</p>
                            //     <p className="text-lg italic mb-4">{profiles.email}</p>

                            // </div>
                            <div className="container flex justify-center items-center ">

                                <div className="row  lg:w-11/12 w-full  flex justify-center items-center">
                                    <Link to={`/dashboard/${profiles.clerkUserId}`} className="col-12 col-sm-6 col-md-4 col-lg-3  w-full h-full flex justify-center items-center">
                                        <div className="our-team bg-white border-2 dark:border-b-slate-700 dark:bg-background text-textmain font-bold font-royal4 p-5 rounded-lg shadow-lg cursor-pointer w-full h-full ">

                                            <div className="picture">
                                                <Avatar className=" w-full h-full" size="120" round={true} textSizeRatio={0.8} src={profiles.profileUrl} />

                                            </div>
                                            <div className="team-content h-12 mb-3">
                                                <span className="text-3xl flex mb-2 cursor-pointer gap-2  justify-center">
                                                    <h2 className=" lg:text-3xl text-2xl ">{profiles.firstName}</h2>
                                                    <h2 className=" lg:text-3xl text-2xl">{profiles.lastName}</h2>
                                                </span>
                                               {profiles.location ?(<span className="text-base flex  cursor-pointer gap-2  justify-center items-center ">
                                                    <FaMapMarkerAlt className="text-textmain h-4 w-4" />
                                                    <h2 className=" text-base">{profiles.location}</h2>

                                                </span>):(
                                                    ""
                                                )
                                            }               

                                            </div>
                                            <ul className="social flex justify-center items-center text-white">
                                                <li className=" text-base">{profiles.email}</li>
                                            </ul>

                                        </div>
                                    </Link>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Profiles;
