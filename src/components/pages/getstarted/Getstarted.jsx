import React, {useEffect, useState, useRef, createRef} from 'react'
import "./getStarted.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";

export default function GetStarted() {
  const menuItems = [
    "Introduction"
    ,"Signing-Up"
    , "Verifying-Email"
    , "Creating-a-Project"
    , "Get-the-Merkle-Root"
    , "Get-the-Merkle-Proof"
    , "API-Reference"
  ]
  // Create dynamic refs for each menu item
  const elementsRef = useRef(menuItems.map(() => createRef()));

  return (
    <div className='getStarted'>
      <Sidebar menuItems={menuItems} elementsRef={elementsRef}/>
      <div className="getStartedContainer">
        <Navbar/>
        {/* <div className="getStartedTitle">
            Documentation
        </div> */}
        {
          menuItems.map((el, index) => 
          <div id={el} key={index} ref={elementsRef.current[index]} className="heading">{el.replace(/-/g, " ")}
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias est dicta omnis nisi? A, autem ipsam. Debitis nostrum rerum illum dolorum vitae, accusamus molestias animi enim expedita itaque repellendus iure.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias est dicta omnis nisi? A, autem ipsam. Debitis nostrum rerum illum dolorum vitae, accusamus molestias animi enim expedita itaque repellendus iure.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias est dicta omnis nisi? A, autem ipsam. Debitis nostrum rerum illum dolorum vitae, accusamus molestias animi enim expedita itaque repellendus iure.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias est dicta omnis nisi? A, autem ipsam. Debitis nostrum rerum illum dolorum vitae, accusamus molestias animi enim expedita itaque repellendus iure.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias est dicta omnis nisi? A, autem ipsam. Debitis nostrum rerum illum dolorum vitae, accusamus molestias animi enim expedita itaque repellendus iure.</p>

          </div>)
        }
      </div>
    </div>
  )
}
