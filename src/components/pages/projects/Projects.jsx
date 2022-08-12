import React, {useEffect, useState, useRef} from 'react'
import "./projects.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import DataTable from '../../dataTable/DataTable';
import { useAuth } from '../../../contexts/AuthContext';
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import VerifyEmail from '../../verifyemail/VerifyEmail';

export default function Projects() {
  const [loading, setLoading] = useState(false);
  const {currentUser, logout, addDocWithName, getDocSnap, getAllDocs, verifyMail} = useAuth();
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("You are currently not verified. Verify your email address to view and create projects!");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  // Get list of projects 
  async function getProjectList(){
    const id = currentUser.uid;
    setLoading(true);
    const snap = await getAllDocs(id);
    const docs = snap.docs;
    setProjects(docs);
    setLoading(false);
  }

  // Load list of projects on initial render, and reload user
  useEffect(() => {
    currentUser.reload().then(()=>{
      if(currentUser.emailVerified == true){
        setVerified(true);
        // User is verified, try to get a list of project for that user
        try{getProjectList();}catch(error){console.log(error.message)}
      }
      else{
        setVerified(false);
      }
    });
    return () => {};
  }, []);

  return (
    <div className='projects'>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {verified ?
        <>
          {loading ?
          <div className="spinner">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
              :
              <DataTable rows={projects}/>
          }
        </>
          :
          (!currentUser.emailVerified && <VerifyEmail version="projects"></VerifyEmail>)
          }
      </div>
    </div>
  )
}
