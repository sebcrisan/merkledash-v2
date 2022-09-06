import React, {useRef, createRef} from 'react'
import "./getStarted.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { Post } from './posts/Post';
import {hashMap} from '../../contentManager/ContentManager';

export default function GetStarted() {
  // Get menu items (keys from hashmap)
  const menuItems = Object.keys(hashMap);
  // Create dynamic refs for each menu item
  const elementsRef = useRef(menuItems.map(() => createRef()));
  return (
    <div className='getStarted'>
      <Sidebar menuItems={menuItems} elementsRef={elementsRef}/>
      <div className="getStartedContainer">
        <Navbar/>
        {
          menuItems.map((el, index) => 
          <>
            <div key={index} ref={elementsRef.current[index]} id={el} className="postWrap">
              <Post headingContent={el.replace(/-/g, " ")}>
                {hashMap[el]}
              </Post>
            </div>
            <hr></hr>
          </>
          )
        }
      </div>
    </div>
  )
}
