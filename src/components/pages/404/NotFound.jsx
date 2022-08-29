import React, {useRef, createRef} from 'react'
import "./notFound.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import {hashMap} from '../../contentManager/ContentManager';

export default function NotFound() {
  // Get menu items (keys from hashmap)
  const menuItems = Object.keys(hashMap);
  // Create dynamic refs for each menu item
  return (
    <div className='notFound'>
      <Sidebar menuItems={menuItems}/>
      <div className="notFoundContainer">
        <Navbar/>
        <div className='notFoundHeader'>
          404
        </div>
        <div className='notFoundTxt'>
          <p>Ain't nobody here but us chickens!</p>
        </div>
      </div>
    </div>
  )
}
