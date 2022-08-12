import React, {useEffect, useState, useRef} from 'react'
import "./new.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CsvPreview from '../../csvpreview/CsvPreview';

export default function New() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {currentUser, logout, addDocWithName, getDocSnap, getAllDocs} = useAuth();
  const projectRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [viewProject, setViewProject] = useState(false);

  // Convert csv to array
  function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // set the headers state so we can easily use them later
    let headersObj = [];
    for(let i = 0; i < headers.length; i++){
      let col = {
        field: headers[i],
        headerName: headers[i],
        width: 130
      }
      if(i == 0){
        col.field = "id";
      }
      headersObj.push(col);
    }
    setCols(headersObj);
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object["id"] = values[0];
        object[header] = values[index];
        return object;
      }, {});
      return el;
  });

  // return the array
  return arr;
  }
  
  // Upload file
  useEffect(()=>{
    const uploadFile = () => {
      setError("");
      // file reader
      let reader = new FileReader();
      reader.readAsText(file);

      // file reader result
      reader.onload = function() {
        // handle result based on file type 
        try{
          let result = reader.result;
          let data = [];
          let headers = [{
            field: "id",
            headerName: "Data",
            width: 130
          }]
          switch (file.type) {
            case "text/plain":
              // handle plaintext
              let lines = result.split("\r\n");
              for(let i = 0; i < lines.length; i++){
                let obj = {
                  "id": lines[i]
                }
                data.push(obj);
              }
              setCols(headers);
              setRows(data);
              break;
            case "text/csv":
              // handle csv
              data = csvToArray(result);
              setRows(data);
              break;
            case "application/json":
              // handle json
              let jsonData = JSON.parse(result);
              let dataList = jsonData.data;
              if(typeof dataList == "undefined"){
                setError('Could not find "data" field in JSON');
                return;
              }
              for(let i = 0; i < dataList.length; i++){
                let obj = {
                  "id": dataList[i]
                }
                data.push(obj);
              }
              setCols(headers);
              setRows(data);
              console.log(rows);
              break;
            default:
              break;
          }
        }catch(e){
          setError(e.message);
        }
      };

      // file reader error
      reader.onerror = function() {
        setError("Something went wrong while reading the file");
        console.log(reader.error);
      };
    };
    file && !error && uploadFile();
  }, [file]);

  // Create Project
  async function createProject(projectName){
    setLoading(false);
    setError("");
    setMessage("");
    setViewProject(false);
    try{
      // check if project with name already exists
      setLoading(true);
      const docSnap = await getDocSnap(currentUser.uid, projectName);
      if(docSnap.exists()){
        setError(`Project with name ${projectName} already exists`);
        setLoading(false);
        return;
      }
      // convert data to db object format
      let list = [];
      for(let i = 0; i < rows.length; i++) {
        let d = rows[i].id;
        list.push(d);
      }
      let data = {"list": list, "root": ""}
      // doc.data() will be undefined in this case
      await addDocWithName(currentUser.uid, projectName, data);
      setMessage(`Project ${projectName} successfully created!`);
      setLoading(false);
      setViewProject(true);
    } catch(e){
      setError(e.message);
      setLoading(false);
    }
  }

  // User file select
  function handleFile(e){
    setError("");
    setMessage("");
    let file = e.target.files[0];
    const supportedFormats = ['text/plain', 'text/csv', 'application/json'];
    if(file && file.type){
      // check if file is of type supported formats
      if(0 > supportedFormats.indexOf(file.type)){
        setError("Please upload a file of a supported type (.txt, .json, .csv)");
        return;
      }
      // check if file is not too big, 1MB limit
      if(file.size > 1048576){
        setError("File too large (Max: 1MB)");
        return;
      }
      setFile(file);
    }
  }

  // Submit project form
  async function handleSubmitProject(e){
    e.preventDefault();
    await createProject(projectRef.current.value);
  }

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="newTitle">
          Add New Project
        </div>
        <div className="bottom">
            <div className="left">
              <Card className='form'>
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {message && <Alert variant="success">{message}{<Link style={{textDecoration:"none"}} to={`/projects/${projectRef.current.value}`}> View Project</Link>}</Alert>}
                  <Form onSubmit={handleSubmitProject}>
                    <Form.Group id="project" className='mb-4'>
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control type="input" ref={projectRef} required />
                    </Form.Group>
                    <Form.Group id="data" className='mb4'>
                      <Form.Label>Upload Project Data</Form.Label>
                      <Form.Control type="file" onChange={handleFile} required />
                    </Form.Group>
                    <Button variant="primary" disabled={loading} type="submit" className="btn submitbtn w-100 mt-4">Create Project</Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
            <div className="right">
              {loading ? 
               <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
               </Spinner> :
               file && !error ? 
               <CsvPreview rows={rows} columns={cols}/> :
               "File not uploaded"
              }
            </div>
        </div>
      </div>
    </div>
  )
}
