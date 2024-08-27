import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@apollo/client";
import { editUser } from "../graphql/mutation/userMutation";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../Components/theme-provider";
import {
  setCollegeName,
  setEmail,
  setFirstName,
  setLastName,
  setLocation,
  setYear,
  setProfileUrl,
  setGithubLink,
  setLeetcodeLink,
  setLinkedInLink,
  setPortfolioLink,
  setTwitterLink,
  setAbout,
  setTechnology,
  setProjects,
  setFlowcharts,
} from "../../features/userSlice";
import { RootState } from "../../store";

const UPDATE_USER = editUser;

import { ImageUpload, TechStackSelector } from "../Components"; // Ensure the correct import path
import { useNavigate } from "react-router-dom";

const EditUser: React.FC = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  if (!user) {
    return null;
  }

  const userState = useSelector((state: RootState) => state.user);


  const firstName = user.fullName ? user.fullName.split(" ")[0] : "";
  const [bio, setBio] = useState(userState.about || "");
  const [collegeName, setCollege] = useState(userState.collegeName || "");
  const [year, setY] = useState(userState.year || "");
  const [location, setLoc] = useState(userState.location || "");
  const [github, setGithub] = useState(userState.links.github || "");
  const [linkedin, setLinkedin] = useState(userState.links.linkedIn || "");
  const [twitter, setTwitter] = useState(userState.links.twitter || "");
  const [portfolio, setPortfolio] = useState(userState.links.portfolio || "");
  const [leetcode, setLeetcode] = useState(userState.links.leetcode || "");
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [achievement, setAchievement] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    userState.profileUrl || user?.imageUrl || ""
  );

  console.log(technicalSkills);

  const handlePhotoUpload = (newPhotoUrl: string) => {
    setProfilePhotoUrl(newPhotoUrl);
  };

  const [updateUserMutation] = useMutation(UPDATE_USER);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    updateUserMutation({
      variables: {
        clerkUserId: user?.id,
        bio,
        collegeName,
        location,
        github,
        linkedIn: linkedin,
        twitter,
        portfolio,
        leetcode,
        profileUrl: profilePhotoUrl,
      },
    })
      .then(({ data }) => {
        console.log("User updated successfully:", data);
        const userData = data?.UPDATE_USER?.user;
        dispatch(setCollegeName(userData?.collegeName));
        dispatch(setEmail(userData?.email));
        dispatch(setFirstName(userData?.firstName));
        dispatch(setLastName(userData?.lastName));
        dispatch(setLocation(userData?.location));
        dispatch(setProfileUrl(userData?.profileUrl));
        dispatch(setGithubLink(userData?.links.github));
        dispatch(setLeetcodeLink(userData?.links.leetcode));
        dispatch(setLinkedInLink(userData?.links.linkedIn));
        dispatch(setPortfolioLink(userData?.links.portfolio));
        dispatch(setTwitterLink(userData?.links.twitter));
        dispatch(setProjects(userData?.projects));
        dispatch(setFlowcharts(userData?.flowcharts));
        dispatch(setAbout(userData?.about));
        dispatch(setYear(userData?.year));
        dispatch(setTechnology(userData?.technologies));

        navigate(`/dashboard/${firstName}`);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="w-full h-screen bg-mainbg dark:bg-black lg:p-7 p-4">
      {/* Container for the form and its content */}
      <div className="h-full lg:w-full w-full overflow-x-hidden border bg-white dark:border-b-slate-700 dark:bg-background shadow-lg border-zinc-300 rounded-lg overflow-y-auto scrollbar-thin scrollbar-webkit lg:p-8 p-4">
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="h-auto border-b-4 border-zinc-100 flex lg:p-5 p-0  flex-col lg:flex-row">
            <div className="flex-1 flex flex-col  lg:py-20 py-0">
              <h1 className="text-2xl font-extrabold font-royal4 text-textmain">
                Personal
              </h1>
              <span className="text-lg font-semibold font-royal4 text-textmain">
                Use a permanent address where you can receive mail.
              </span>
            </div>

            {/* Right-side of the Personal Information Section */}
            <div className="lg:w-1/2 w-full flex flex-col gap-5 justify-center items-center h-auto p-4">
              <div className=" lg:w-full w-80 ">
                {/* Image upload component */}
                <ImageUpload onUpload={handlePhotoUpload} />
              </div>
              <div className="flex gap-3 w-full justify-evenly lg:flex-row flex-col ">
                <div className=" lg:w-1/2 w-full ">
                  {/* Name Input Field */}
                  <label className="form-control w-24 max-w-xs ">
                    <div className="label">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Name:
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Name"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain lg:w-fit w-72"
                      defaultValue={user.fullName || ""}
                      disabled
                    />
                  </label>
                </div>
                <div className="w-1/2 ">
                  {/* Email Input Field */}
                  <label className="form-control w-24 max-w-xs ">
                    <div className="label ">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Email:
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Email"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain lg:w-fit w-72"
                      value={
                        user.primaryEmailAddress?.emailAddress ||
                        "No email address found"
                      }
                      disabled
                    />
                  </label>
                </div>
              </div>
              {/* About Yourself Section */}
              <div className="flex gap-3 w-full justify-evenly  lg:pr-11 pr-0">
                <div className="w-full ">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold ">
                        About yourself:
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Full Stack Developer || Btech'26 "
                      className="textarea textarea-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-full"
                      value={bio}
                      // defaultValue={userData.about || ""}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              {/* College Name Section */}
              <div className=" flex  w-full">
                <label className="form-control w-full  lg:pr-11 pr-0">
                  <div className="label ">
                    <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                      College Name:
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="College Name"
                    className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-full"
                    value={collegeName}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </label>
              </div>

              {/* Year and Location Fields */}
              <div className="flex gap-3 w-full justify-evenly lg:flex-row flex-col">
                <div className="w-1/2">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Year:
                      </span>
                    </div>
                    <select
                      required
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain lg:w-64 w-72"
                      value={year}
                      onChange={(e) => setY(e.target.value)}
                    >
                      <option disabled selected>
                        Pick one
                      </option>
                      <option value={1}>First Year</option>
                      <option value={2}>Second Year</option>
                      <option value={3}>Third Year</option>
                      <option value={4}>Fourth Year</option>
                      <option value={0}>Pass Out</option>
                    </select>
                  </label>
                </div>

                <div className="w-1/2 ">
                  <label className="form-control w-96 ">
                    <div className="label ">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Your Location:
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Location"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-72"
                      value={location}
                      onChange={(e) => setLoc(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="h-auto border-b-4 border-zinc-100 flex lg:p-5 p-0  flex-col lg:flex-row py-6">
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl font-extrabold font-royal4 text-textmain">
                Social Links
              </h1>
              <span className="text-lg font-semibold font-royal4 text-textmain">
                Your Social Links.
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-5 justify-center items-center h-auto p-4">
              <div className="flex gap-3 w-full justify-evenly lg:flex-row flex-col ">
                <div className=" lg:w-1/2 w-full">
                  {/* Github Input Field */}
                  <label className="form-control w-24 max-w-xs ">
                    <div className="label">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Github :
                      </span>
                    </div>
                    <input
                      type="url"
                      placeholder="Github"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-72"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                  </label>
                </div>
                <div className="w-1/2">
                  {/* Linkedin Input Field */}
                  <label className="form-control w-24 max-w-xs ">
                    <div className="label ">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Linkedin:
                      </span>
                    </div>
                    <input
                      type="url"
                      placeholder="Linkedin"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-72"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 w-full justify-evenly lg:flex-row flex-col  ">
                <div className=" lg:w-1/2 w-full ">
                  {/* Twitter Input Field */}
                  <label className="form-control w-24 max-w-xs ">
                    <div className="label">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Twitter:
                      </span>
                    </div>
                    <input
                      type="url"
                      placeholder="Twitter"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-72"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </label>
                </div>
                <div className="w-1/2 ">
                  {/* Portfolio Website Input Field */}
                  <label className="form-control w-24 max-w-xs ">
                    <div className="label ">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Portfolio:
                      </span>
                    </div>
                    <input
                      type="url"
                      placeholder="Portfolio Website"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-72"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-3 w-full lg:justify-evenly justify-start">
                <div className="w-1/2 ">
                  <label className="form-control lg:w-24 max-w-xs ">
                    <div className="label ">
                      <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                        Leetcode:
                      </span>
                    </div>
                    <input
                      type="url"
                      placeholder="Leetcode"
                      className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-72"
                      value={leetcode}
                      onChange={(e) => setLeetcode(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Tech stack Select Section */}
          <div className="h-auto border-b-4 border-zinc-100 flex lg:p-5 p-0  flex-col lg:flex-row py-6">
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl font-extrabold font-royal4 text-textmain">
                Technical Skills
              </h1>
              <span className="text-lg font-semibold font-royal4 text-textmain">
                Highlighting technical expertise.
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-5 justify-center items-center h-auto ">
              <div className="w-full pl-2 ">
                <TechStackSelector setTech={setTechnicalSkills} />
              </div>
            </div>
          </div>

          {/* Achivement Section */}

          <div className="h-auto  flex lg:p-5 p-0  flex-col lg:flex-row border-b-4 border-zinc-100 py-6">
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl font-extrabold font-royal4 text-textmain">
                Achivements
              </h1>
              <span className="text-lg font-semibold font-royal4 text-textmain">
                Showcase your achivements.
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-5 justify-center items-center h-auto">
              <div className="w-full  lg:pl-2 pl-0">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold ">
                      Achivements:
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Achievements"
                    className="textarea textarea-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain lg:w-full w-72"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center p-5 ">
            <button
              type="submit"
              className="btn btn-primary font-royal4 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
