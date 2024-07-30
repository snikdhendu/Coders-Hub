// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Project, Roadmap,Signin, Signup ,Error,UserDashboard,EditUser} from './Pages';
import { CreateRoadmap } from './Components';


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/roadmap' element={<Roadmap/>}/>
          <Route path='/project' element={<Project/>}/>
          <Route path='/dashboard/:userName' element={<UserDashboard/>}/>
          <Route path='/dashboard/:userName/edit' element={<EditUser/>}/>
          <Route path='/dashboard/:userName/roadmap' element={<CreateRoadmap/>}/>
          <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

