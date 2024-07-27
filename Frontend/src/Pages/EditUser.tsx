import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useUser } from '@clerk/clerk-react';
import { ImageUpload } from '../Components';  // Ensure the correct import path

const EditUser: React.FC = () => {
  const { user } = useUser();

  const [collegeName, setCollegeName] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [achievement, setAchievement] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(user?.imageUrl || '');

  const handlePhotoUpload = (newPhotoUrl: string) => {
    setProfilePhotoUrl(newPhotoUrl);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress || 'No email address found',
      collegeName,
      year,
      location,
      github,
      linkedin,
      twitter,
      portfolio,
      technicalSkills,
      achievement,
      profilePhotoUrl
    };
    console.log(formData);
  };

  if (!user) {
    return null;
  }

  return (
    <div className='w-full h-screen bg-mainbg p-7'>
      <div className='h-full w-full bg-secondbg shadow-lg border-zinc-300 rounded-lg overflow-y-auto scrollbar-thin scrollbar-webkit p-8'>
        <form onSubmit={handleSubmit}>
          <div className='h-auto border-b-4 border-zinc-100 flex p-5'>
            <div className='flex-1 flex flex-col'>
              <h1 className='text-2xl font-extrabold font-royal4 text-textmain'>
                Personal
              </h1>
              <span className='text-lg font-semibold font-royal4 text-textmain'>
                Use a permanent address where you can receive mail.
              </span>
            </div>

            <div className='w-1/2 flex flex-col gap-5 justify-center items-center h-auto p-4'>
              <div>
                <ImageUpload onUpload={handlePhotoUpload} />
              </div>
              <div className='flex gap-3 w-full border-red justify-evenly'>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  placeholder='John Doe'
                  defaultValue={user.fullName}
                  disabled
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  placeholder='John@gmail.com'
                  defaultValue={user.primaryEmailAddress?.emailAddress || 'No email address found'}
                  disabled
                  className='text-sm'
                />
              </div>
              <div className='w-4/5'>
                <TextField
                  fullWidth
                  label="College Name"
                  id="fullWidth"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                />
              </div>
              <div className='flex gap-3 w-full justify-evenly'>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    required
                    className='w-56'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Year"
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <MenuItem value={1}>First Year</MenuItem>
                    <MenuItem value={2}>Second Year</MenuItem>
                    <MenuItem value={3}>Third Year</MenuItem>
                    <MenuItem value={4}>Fourth Year</MenuItem>
                    <MenuItem value={0}>Pass Out</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="outlined"
                  label="Location"
                  placeholder='Kolkata'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='h-auto border-b-4 border-zinc-100 flex p-5'>
            <div className='flex-1 flex flex-col'>
              <h1 className='text-2xl font-extrabold font-royal4 text-textmain'>
                Social Links
              </h1>
              <span className='text-lg font-semibold font-royal4 text-textmain'>
                Your Social Links.
              </span>
            </div>

            <div className='w-1/2 flex flex-col gap-5 justify-center items-center h-auto p-4'>
              <div className='flex gap-3 w-full border-red justify-evenly'>
                <TextField
                  id="outlined-required"
                  label="Github"
                  placeholder='github.com'
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
                <TextField
                  id="outlined-required"
                  label="Linkedin"
                  placeholder='linkedin.com'
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className='flex gap-3 w-full border-red justify-evenly'>
                <TextField
                  id="outlined-required"
                  label="Twitter"
                  placeholder='twitter.com'
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <TextField
                  id="outlined-required"
                  label="Portfolio website"
                  placeholder='portfolio.com'
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='h-auto border-b-4 border-zinc-100 flex p-5'>
            <div className='flex-1 flex flex-col'>
              <h1 className='text-2xl font-extrabold font-royal4 text-textmain'>
                Technical Skills
              </h1>
              <span className='text-lg font-semibold font-royal4 text-textmain'>
                Highlighting technical expertise.
              </span>
            </div>

            <div className='w-1/2 flex flex-col gap-5 justify-center items-center h-auto p-4'>
              <div className='flex gap-3 w-4/5 border-red justify-evenly'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Technical Skills</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={technicalSkills}
                    label="Technical Skills"
                    onChange={(e) => setTechnicalSkills(e.target.value)}
                  >
                    <MenuItem value="Skill1">Skill1</MenuItem>
                    <MenuItem value="Skill2">Skill2</MenuItem>
                    <MenuItem value="Skill3">Skill3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className='h-auto flex p-5'>
            <div className='flex-1 flex flex-col'>
              <h1 className='text-2xl font-extrabold font-royal4 text-textmain'>
                Achievement
              </h1>
              <span className='text-lg font-semibold font-royal4 text-textmain'>
                Highlighting your expertise.
              </span>
            </div>

            <div className='w-1/2 flex flex-col gap-5 justify-center items-center h-auto p-4'>
              <div className='flex gap-3 w-4/5 border-red justify-evenly'>
                <TextField
                  fullWidth
                  id="outlined-required"
                  label="Achievement"
                  placeholder='hori bol'
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <Button type="submit" variant="contained" color="primary" className=' p-3'>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
