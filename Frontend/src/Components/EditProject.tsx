import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import TechStackSelector from './TechStackSelector';

const EditUser: React.FC = () => {
  const { user } = useUser();

  const [projectName, setProjectName] = useState('');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployLink, setDeployLink] = useState('');

  const handleSubmit = () => {
    console.log({
      projectName,
      projectTagline,
      projectDescription,
      projectType,
      githubLink,
      deployLink,
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className='w-full h-full bg-white dark:border-b-slate-700 dark:bg-background p-2'>
      <div className='h-full w-full bg-white dark:border-b-slate-700 dark:bg-background shadow-lg rounded-lg overflow-y-auto scrollbar-thin p-3'>
        <div className='h-full flex justify-center items-center flex-col overflow-y-auto gap-4'>
          <div className='w-full flex justify-center items-center flex-col gap-4 h-fit mt-60 pb-8 border-b-4 border-dotted border-zinc-200'>
            <div className='flex-1 flex flex-col justify-center items-center'>
              <h1 className='text-2xl font-extrabold font-royal4 text-textmain dark:text-white'>
                Project details
              </h1>
              <span className='text-lg font-semibold font-royal4 text-textmain dark:text-white'>
                Tell us more about this project
              </span>
            </div>
            <div className='flex gap-20'>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                    What is your Project's Name?
                  </span>
                </div>
                <input
                  required
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain dark:text-white text-xl font-royal4 font-medium border-textmain w-96"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                    What is your Project's Tagline?
                  </span>
                </div>
                <input
                  required
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96 dark:text-white text-xl font-royal4 font-medium"
                  value={projectTagline}
                  onChange={(e) => setProjectTagline(e.target.value)}
                />
              </label>
            </div>

            <label className="form-control w-full pl-24 pr-8">
              <div className="label">
                <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                  Tell us brief about your project
                </span>
              </div>
              <textarea
                required
                className="textarea textarea-bordered h-24 bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-full dark:text-white text-xl font-royal4 font-medium"
                placeholder="Add project details here"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              ></textarea>
            </label>

            <div className='flex gap-20'>
              <label className="form-control w-full max-w-xs text-textthird dark:text-white font-royal4 text-xl font-bold">
                <div className="label">
                  <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                    Project Type
                  </span>
                </div>
                <select
                  className="select select-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96 dark:text-white text-xl font-royal4 font-medium"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option disabled selected className='text-textthird dark:text-white font-royal4 text-xl font-bold'>
                    Pick one
                  </option>
                  <option className='text-textthird dark:text-white font-royal4 text-xl font-normal'>
                    Team Project
                  </option>
                  <option className='text-textthird dark:text-white font-royal4 text-xl font-normal'>
                    Solo project
                  </option>
                </select>
              </label>

              <TechStackSelector />
            </div>

            <div className='flex gap-20'>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                    Add github Link
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96 dark:text-white text-xl font-royal4 font-medium"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-textthird dark:text-white font-royal4 text-xl font-bold">
                    Add deploy link
                  </span>
                </div>
                <input
                  required
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered bg-white dark:border-b-slate-700 dark:bg-background text-textmain border-textmain w-96 dark:text-white text-xl font-royal4 font-medium"
                  value={deployLink}
                  onChange={(e) => setDeployLink(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <button className="btn btn-primary w-24 dark:text-white text-xl font-royal4 font-medium" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
