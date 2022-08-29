import React, {useRef, createRef} from 'react'
import "./notFound.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import {hashMap} from '../../contentManager/ContentManager';

export default function NotFound() {
  // Get menu items (keys from hashmap)
  const menuItems = Object.keys(hashMap);
  // Create dynamic refs for each menu item
  const elementsRef = useRef(menuItems.map(() => createRef()));
  return (
    <div className='getStarted'>
      <Sidebar menuItems={menuItems} elementsRef={elementsRef}/>
      <div className="getStartedContainer">
        <Navbar/>
      </div>
    </div>
  )
}
