import React, {useState, useEffect} from 'react'
import "./dashboard.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import Widget from '../../widget/Widget';
import Chart from '../../chart/Chart';
import Featured from '../../featured/Featured';
import List from '../../table/Table';
import { useContext } from "react";
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import {useAuth} from '../../../contexts/AuthContext';
import VerifyEmail from '../../verifyemail/VerifyEmail';

export default function Dashboard() {
  const {darkMode} = useContext(DarkModeContext)
  const {currentUser} = useAuth();
  const [verified, setVerified] = useState(false);

  // Reload user on load
  useEffect(()=>{
    currentUser.reload().then(()=>{
      currentUser.emailVerified ? setVerified(true) : setVerified(false);
    });
  },[])

  return (
    <div className='dashboard'>
      <Sidebar className={darkMode ? "dark" : "light"}/>
      <div className="dashContainer">
      <Navbar></Navbar>
      {verified ?
        <>
          <div className="charts">
            {/* <Featured/> */}
            <Chart aspect={2 / 1} title="Some bogus chart that might later provide insight of sorts. If people are actually using this project I might show API calls here.
            If server gets overloaded then I will have to monetize it and then this will be useful for tracking spending / hitting limits"/>
          </div>
        </>
        : 
        (!currentUser.emailVerified && <VerifyEmail version="dashboard"></VerifyEmail>)
        }
      </div>
    </div>
  )
}
