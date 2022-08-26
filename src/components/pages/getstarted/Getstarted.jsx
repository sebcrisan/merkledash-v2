import React, {useEffect, useState, useRef} from 'react'
import "./getStarted.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";

export default function GetStarted() {
  return (
    <div className='projects'>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
      </div>
    </div>
  )
}
