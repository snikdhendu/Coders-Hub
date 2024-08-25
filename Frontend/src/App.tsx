// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Project, Roadmap,Error,UserDashboard,EditUser,Detailproject} from './Pages';
import { CreateRoadmap } from './Components';
import CreateAccount from './Pages/CreateAccount';
import FlowchartPage from './Pages/FlowchartPage';
import "./App.css";
import Signin from './sign-in/[[...index]]';
import Signup from './sign-up/[[...index]]';
import { RootState } from '../store';
import { useSelector } from "react-redux";

const App = () => {
  const projects = useSelector((state: RootState) => state.user.projects);
  const flowcharts = useSelector((state: RootState) => state.user.flowcharts);
  // const firstName = user?.fullName ? user.fullName.split(' ')[0] : '';
  return (
    <Router>
      <Routes>
          <Route path='' element={<Home/>}/>
          <Route path="/sign-in" element={<Signin />} />
          <Route path='/sign-up/*' element={<Signup/>}/>
          {/* <Route path='/roadmap' element={<Roadmap/>}/> */}
          <Route path='/projects' element={<Project/>}/>
          <Route path='/dashboard/:userName' element={<UserDashboard/>}/>
          <Route path='/dashboard/:userName/edit' element={<EditUser/>}/>
          <Route path='/roadmaps' element={<Roadmap/>}/>
          <Route path='/dashboard/:userName/createroamap' element={<CreateRoadmap/>}/>
          <Route path="*" element={<Error />} />
          <Route path='/createAccount' element={<CreateAccount/>}/>
          <Route path='/roadmaps/:id' element={<FlowchartPage/>}/>
          <Route path={`/projects/:id`} element={<Detailproject />} />
         

      </Routes>
    </Router>
  );
}

export default App;

