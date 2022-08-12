import { useAuth } from '../contexts/AuthContext';
import React, {useEffect, useState, useRef} from 'react'
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {currentUser, logout, addDocWithName, getDocSnap, getAllDocs} = useAuth();
  const [uid, setUid] = useState("");
  const [projects, setProjects] = useState([]);
  const projectRef = useRef();
  const navigate = useNavigate();

  // User ID on render
  useEffect(()=> {
    setUid(currentUser.uid);
  }, []);

  // Logout user
  async function handleLogout(){
    setError("");
    try{
      await logout();
      navigate("/login");
    } catch{
      setError("Failed to log out");
    }
  }

  // Create Project
  async function createProject(projectName){
    let data = {"list": ["a", "b"], "root": "abc"};
    setLoading(false);
    setError("");
    setMessage("");
    try{
      // check if project with name already exists
      setLoading(true);
      const docSnap = await getDocSnap(uid, projectName);
      if(docSnap.exists()){
        setError(`Project with name ${projectName} already exists`);
        setLoading(false);
        return;
      }
      // doc.data() will be undefined in this case
      await addDocWithName(uid, projectName, data);
      setMessage(`Project ${projectName} successfully created!`);
      // refresh project list to show added project
      await getProjectList();
      setLoading(false);
    } catch(e){
      setError(e.message);
      setLoading(false);
    }
  }

  // Submit project form
  async function handleSubmitProject(e){
    e.preventDefault();
    await createProject(projectRef.current.value);
  }

  // Get list of projects 
  async function getProjectList(){
    const id = currentUser.uid;
    setLoading(true);
    const snap = await getAllDocs(id);
    const docs = snap.docs;
    setProjects(docs);
    setLoading(false);
  }

  // Load list of projects on initial render
  useEffect(() => {
    getProjectList();
    return () => {};
  }, []);

  

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <strong>UID: </strong>{uid}
          <strong>Projects: </strong>
          {loading ?
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            <div>{(projects.length == 0) ?
              "You don't have any projects yet"
               : projects.map(project => (
                 <h1 key={project.id}>{project.id}</h1>
               ))}
             </div>
          }
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
          <Form onSubmit={handleSubmitProject}>
            <Form.Group id="project" className='mb-4'>
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="input" ref={projectRef} required />
            </Form.Group>
            <Button variant="primary" disabled={loading} type="submit" className="btn btn-primary w-100 mt-3" >Create Project</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}
