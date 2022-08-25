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
          <div className="widgets">
          <Widget/>
          <Widget/>
          <Widget/>
          <Widget/>
          </div>
          <div className="charts">
            <Featured/>
            <Chart aspect={2 / 1} title="Total API Calls Each Month"/>
          </div>
          <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List/>
          </div>
        </>
        : 
        (!currentUser.emailVerified && <VerifyEmail version="dashboard"></VerifyEmail>)
        }
      </div>
    </div>
  )
}
