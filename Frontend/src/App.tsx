// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Project, Roadmap,Error,UserDashboard,EditUser} from './Pages';
import { CreateRoadmap } from './Components';
import CreateAccount from './Pages/CreateAccount';
import FlowchartPage from './Pages/FlowchartPage';
import "./App.css";
import Signin from './sign-in/[[...index]]';
import Signup from './sign-up/[[...index]]';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='' element={<Home/>}/>
          <Route path="/sign-in" element={<Signin />} />
          <Route path='/sign-up/*' element={<Signup/>}/>
          <Route path='/roadmap' element={<Roadmap/>}/>
          <Route path='/project' element={<Project/>}/>
          <Route path='/dashboard/:userName' element={<UserDashboard/>}/>
          <Route path='/dashboard/:userName/edit' element={<EditUser/>}/>
          <Route path='/dashboard/:userName/roadmap' element={<CreateRoadmap/>}/>
          <Route path="*" element={<Error />} />
          <Route path='/createAccount' element={<CreateAccount/>}/>
          <Route path='/dashboard/:userName/roadmap/newflowchart' element={<FlowchartPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;

