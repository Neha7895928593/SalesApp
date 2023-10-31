import React from 'react';


import './App.css';
import Navbars from './Navbars';
import Salapp from './Salapp';
import Addsale from './Addsale';
import Top5sal from './Top5sal';
import Todayrevenue from './Todayrevenue';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Logout from './Logout';





function App() {
  return (
    <>
    <Router>
      
      
      <Navbars/>
      <div className='container' >
      <Routes>
        < Route  element={<Salapp/>} exact path='/salapp' >
        </Route>
        
        < Route  element={<Todayrevenue/>} exact path='/todayrevenue'>

        </Route>
        
        < Route 
         element={< Addsale />} exact path='/addsale'>
          
        </Route>
        
        < Route  element={<Top5sal/>} exact path='/top5sal'>
          
        </Route>
        < Route  element={<Login/>} exact path='/login'>
          
        </Route>
        < Route  element={<Register/>} exact path='/register'>
          
        </Route>
        < Route  element={<Logout/>} exact path='/logout'>
          
        </Route>
        </Routes>

      </div>
     
    </Router>
    </>

      
      )

    
}
      export default App;