import TextField from '@mui/material/TextField';
import { ImageUpload } from '../Components';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
// import GitHubIcon from '@mui/icons-material/GitHub';


const EditUser = () => {
  return (
    <div className=' w-full  h-screen bg-blue-100 p-7'>

      <div className=' h-full w-full bg-white shadow-lg border-zinc-300 rounded-lg overflow-y-auto p-8'>

        <div className=' h-auto border-b-4 border-zinc-100 flex p-5'>

          <div className=' flex-1  flex flex-col'>
            <h1 className='text-2xl font-extrabold font-royal4  text-blue-900'>
              Personal
            </h1>
            <span className=' text-lg font-semibold font-royal4  text-blue-900'>Use a permanent address where you can receive mail.</span>
          </div>

          <div className='w-1/2  flex flex-col gap-5 justify-center items-center h-auto p-4'>

            <div>
              <ImageUpload />
            </div>
            <div className=' flex gap-3 w-full  border-red justify-evenly'>

              <TextField
                required
                id="outlined-required"
                label="Name"
                placeholder='John Doe'
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                placeholder='John@gmail.com'
              />

            </div>

            <div className=' w-4/5'>
              <TextField fullWidth label="College Name" id="fullWidth" />
            </div>

            <div className='flex gap-3 w-full  justify-evenly'>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  required
                  className=' w-56'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                // onChange={handleChange}
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
              />
            </div>

          </div>

        </div>

        <div className=' h-auto border-b-4 border-zinc-100 flex p-5'>

          <div className=' flex-1  flex flex-col'>
            <h1 className='text-2xl font-extrabold font-royal4  text-blue-900'>
              Social Links
            </h1>
            <span className=' text-lg font-semibold font-royal4  text-blue-900'>Your Social Links.</span>
          </div>

          <div className='w-1/2  flex flex-col gap-5 justify-center items-center h-auto p-4'>


            <div className=' flex gap-3 w-full  border-red justify-evenly'>

              <TextField
                id="outlined-required"
                label="Github"
                placeholder='github.com'
              />
              <TextField
                id="outlined-required"
                label="Linkedin"
                placeholder='github.com'
              />

            </div>

            <div className=' flex gap-3 w-full  border-red justify-evenly'>

              <TextField
                id="outlined-required"
                label="Twitter"
                placeholder='github.com'
              />
              <TextField
                id="outlined-required"
                label="Portfolio website"
                placeholder='github.com'
              />

            </div>



          </div>

        </div>

        <div className=' h-auto border-b-4 border-zinc-100 flex p-5'>

          <div className=' flex-1  flex flex-col'>
            <h1 className='text-2xl font-extrabold font-royal4  text-blue-900'>
              Technical Skills
            </h1>
            <span className=' text-lg font-semibold font-royal4  text-blue-900'>Highlighting technical expertise.</span>
          </div>

          <div className='w-1/2  flex flex-col gap-5 justify-center items-center h-auto p-4'>




            <div className=' flex gap-3 w-4/5  border-red justify-evenly'>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Technical Skills</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

            </div>



          </div>

        </div>

        <div className=' h-auto flex p-5'>

          <div className=' flex-1  flex flex-col'>
            <h1 className='text-2xl font-extrabold font-royal4  text-blue-900'>
            Achievement
            </h1>
            <span className=' text-lg font-semibold font-royal4  text-blue-900'>Highlighting your expertise.</span>
          </div>

          <div className='w-1/2  flex flex-col gap-5 justify-center items-center h-auto p-4'>




            <div className=' flex gap-3 w-4/5  border-red justify-evenly'>

            <TextField
                fullWidth
                id="outlined-required"
                label="Achievement"
                placeholder='hori bol'
              />

            </div>



          </div>

        </div>

      </div>

    </div>
  );
}

export default EditUser;
