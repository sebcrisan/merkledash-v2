import React, {useEffect, useState} from 'react'
import "./single.scss"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import CsvPreview from '../../csvpreview/CsvPreview';
import {Spinner, Button, Alert} from 'react-bootstrap';
import { useAuth} from '../../../contexts/AuthContext';
import axios from 'axios';

export default function Single() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [root, setRoot] = useState("");
  const {currentUser, getDocSnap} = useAuth();
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [error, setError] = useState("Something went wrong while trying to fetch data");

  // Get project data
  async function getProjectData(){
    let projectName = window.location.pathname.split("/projects/")[1];
    setProjectName(projectName);
    setError("");
    setLoading(true);
    const docSnap = await getDocSnap(currentUser.uid, projectName);
    // check if data exists
    if (docSnap.exists()) {
      let data = docSnap.data();
      // set project name
      setProjectId(projectName);
      // create columns
      let headers = [{
        field: "id",
        headerName: "Data",
        width: 130
      }]
      setCols(headers);
      // create rows
      let rowData = [];
      for(let i=0; i < data.list.length; i++){
        let obj = {
          "id": data.list[i]
        }
        rowData.push(obj);
      }
      setRows(rowData);
      // get root
      setRoot(data.root);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      // reset project name
      setProjectId("");
    }
    setLoading(false);
  }

  // Load project data on initial render
  useEffect(() => {
    getProjectData();
    return () => {};
  }, []);

  // Get merkle root using API call
  const getRoot = async () => {
    const baseUrl = "http://localhost:8080";
    const api = axios.create({
      baseURL: `${baseUrl}`
    })
    let res = await api.get(`/v1/${projectName}/root`);
    let root = "";
    if (res.statusText == "OK"){
      root = res.data.root;
      setRoot(root);
    }
    else{
      setError("Something went wrong while trying to fetch data")
    }
    //TODO: update document with root in db
  }

  return (
    <div className='single'>
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            {error && <Alert className='verifyMsg' variant="danger">{error}</Alert>}
            <div className="item">
              <div className="details">
                <div className="detailItem"><span className="itemKey">Title</span></div>
                <div className="detailItem"><span className="itemValue">{projectId}</span></div>
                <div className="detailItem"><span className="itemKey">Root</span></div>
                <div className="detailItem"><span className="itemValue">{root !== "" ? root : <Button onClick={getRoot} variant="primary" disabled={loading} className="btn rootbtn w-100 mt-4">Get Root</Button>}</span></div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending (Last 6 Months)"/>
          </div> */}
        </div>
        <div className="bottom">
          <h1 className="title">Project Data</h1>
          {loading ?
          <div className="spinner">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
              :
              <CsvPreview rows={rows} columns={cols}/>
          }
        </div>
      </div>

    </div>
  )
}
