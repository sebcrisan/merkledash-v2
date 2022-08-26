import React, {useEffect, useState, useRef} from 'react'
import "./getStarted.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";

export default function GetStarted() {
  return (
    <div className='getStarted'>
      <Sidebar/>
      <div className="getStartedContainer">
        <Navbar/>
        <div className="getStartedTitle">
            Documentation
        </div>
      </div>
    </div>
  )
}
