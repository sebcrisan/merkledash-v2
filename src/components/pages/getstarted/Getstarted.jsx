import React, {useEffect, useState, useRef} from 'react'
import "./getStarted.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";

export default function GetStarted() {
  const menuItems = [
    "Introduction"
    ,"Signing Up"
    , "Verifying Email"
    , "Creating a Project"
    , "Get the merkle root"
    , "Get the merkle proof"
    , "API Reference"
  ]
  return (
    <div className='getStarted'>
      <Sidebar menuItems={menuItems}/>
      <div className="getStartedContainer">
        <Navbar/>
        <div className="getStartedTitle">
            Documentation
        </div>
        {
          menuItems.map(el => <div id={el} key={el} className="heading">{el}</div>)
        }
      </div>
    </div>
  )
}
