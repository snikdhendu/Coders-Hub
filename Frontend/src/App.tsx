// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Project, Roadmap,Signin, Signup ,Error,UserDashboard,EditUser} from './Pages';


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/roadmap' element={<Roadmap/>}/>
          <Route path='/project' element={<Project/>}/>
          <Route path='/dashboard/*' element={<UserDashboard/>}/>
          <Route path='/dashboard/edit' element={<EditUser/>}/>
          <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

