import {React, useState} from 'react'
import "./home.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { useContext } from "react";
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import treeLight from "../../../assets/images/treeLightTxt.png";
import treeDark from "../../../assets/images/treeDarkTxt.png";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  const {darkMode} = useContext(DarkModeContext)
   
  return (
    <div className='home'>
      <Sidebar className={darkMode ? "dark" : "light"}/>
      <div className="homeContainer">
        <Navbar></Navbar>
        <div className="desc">
          <p className="title">Merkle Dash</p>
          <p className="subtitle">A dashboard and API that you can use to manage your merkle proofs</p>
        </div>
        <div className="imgContainer">
          <img className="tree" src={darkMode ? treeDark : treeLight } alt="merkle tree" />
          <div className="examples">
            <code>GET "v1/:projectName/proof/:address/:key" -&gt; &#123;proof: [myProof, myProof]&#125;</code>
            <code>GET "v1/:projectName/root/:key" -&gt; &#123;root: 0xabc123...&#125;</code>
          </div>
          <Link to="/getstarted"><Button variant="contained">Get Started</Button></Link>
        </div>
      </div>
    </div>
  )
}
