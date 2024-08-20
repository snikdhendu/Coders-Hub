import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUser } from "@clerk/clerk-react";
import { Projectimage } from "../Components"; // Ensure the correct import path
import TechStackSelector from "./TechStackSelector";

const EditUser: React.FC = () => {
  const { user } = useUser();

  //const [collegeName, setCollegeName] = useState('');
  const [projectName, setProjectName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  // const [techStack, setTechStack]= useState('');
  const [githubRepoLink, setGithubRepoLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const handlePhotoUpload = (logoUrl: string) => {
    setLogoUrl(logoUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Upload")
    const formData = {
      projectName,projectType,tagline,description,githubRepoLink,liveLink,logoUrl
    };
    console.log(formData);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full h-full  bg-white dark:border-b-slate-700 dark:bg-background p-2">
      <div className="h-full w-full bg-white dark:border-b-slate-700 dark:bg-background shadow-lg  rounded-lg overflow-y-auto scrollbar-thin  p-3">
        <form
          onSubmit={handleSubmit}
          className=" h-full flex justify-center items-center flex-col overflow-y-auto gap-4"
        >
          <div className=" w-full flex justify-center items-center flex-col gap-4  h-fit mt-60 pb-8  border-b-4 border-dotted border-zinc-200">
            <div className="flex-1 flex flex-col justify-center items-center">
              <h1 className="text-2xl font-extrabold font-royal4 text-textmain ">
                Project details
              </h1>
              <span className="text-lg font-semibold font-royal4 text-textmain">
                Tell us more about this project
              </span>
            </div>
            <div className=" flex gap-20">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird font-royal4 text-xl font-bold ">
                    What is your Project's Name?
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered  bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird font-royal4 text-xl font-bold ">
                    What is your Project's Tagline?
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered   bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </label>
            </div>

            <label className="form-control  w-full pl-24 pr-8">
              <div className="label">
                <span className="label-text text-textthird font-royal4 text-xl font-bold">
                  Tell us brief about your project
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-full"
                placeholder="Add project details here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>

            <div className="flex gap-20">
              <label className="form-control w-full max-w-xs text-textthird font-royal4 text-xl font-bold">
                <div className="label">
                  <span className="label-text text-textthird font-royal4 text-xl font-bold">
                    Project Type
                  </span>
                </div>
                <select
                  className="select select-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option
                    disabled
                    value=""
                    className="text-textthird font-royal4 text-xl font-bold"
                  >
                    Pick one
                  </option>
                  <option
                    value="Team Project"
                    className=" text-textthird font-royal4 text-xl font-normal"
                  >
                    Team Project
                  </option>
                  <option
                    value="Solo Project"
                    className="text-textthird font-royal4 text-xl font-normal"
                  >
                    Solo project
                  </option>
                </select>
              </label>

              {/* <label className="form-control w-full max-w-xs text-textthird font-royal4 text-xl font-bold">
                <div className="label">
                  <span className="label-text text-textthird font-royal4 text-xl font-bold">Technology used</span>
                </div>
                <select className="select select-bordered bg-mainbg text-textmain border-textmain w-96">
                  <option disabled selected className='text-textthird font-royal4 text-xl font-bold'>Pick one</option>
                  <option className=' text-textthird font-royal4 text-xl font-normal'>HTML</option>
                  <option className='text-textthird font-royal4 text-xl font-normal'>CSS</option>
                </select>
              </label> */}
              <TechStackSelector />
            </div>

            <div className=" flex gap-20">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird font-royal4 text-xl font-bold ">
                    Add github Link
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered   bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96" value={githubRepoLink} onChange={e => setGithubRepoLink(e.target.value)} 
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird font-royal4 text-xl font-bold ">
                    Add deploy link
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered   bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96" value={liveLink} onChange={e=> setLiveLink(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div>
            <Projectimage onUpload={handlePhotoUpload} />
          </div>

          <div className="w-full flex justify-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className=" p-3 "
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
