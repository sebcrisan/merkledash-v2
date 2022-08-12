import {React, useContext} from 'react'
import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate} from "react-router-dom";
import { DarkModeContext } from '../../contexts/DarkModeContext';

export default function Sidebar() {
  const {dispatch} = useContext(DarkModeContext)
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();
  // Logout user
  async function handleLogout(){
    try{
      await logout();
      navigate("/");
    } catch{
     alert("Failed to log out");
    }
  }
  return (
    <div className='sidebar'>
      <Link to="/" style={{textDecoration: "none"}}><div className="top"><span className="logo">&lt; Merkle Dash / &gt;</span></div></Link>
      <hr />
          <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{textDecoration: "none"}}><li><DashboardIcon className='icon'/><span>Dashboard</span></li></Link>
          <p className="title">PROJECTS</p>
          <Link to="/projects" style={{textDecoration: "none"}}><li><ConstructionIcon className='icon'/><span>Projects</span></li></Link>
          <p className="title">USER</p>
          {currentUser ?
            <>
              <Link to="/profile" style={{textDecoration: "none"}}><li><PersonOutlineOutlinedIcon className='icon'/><span>Profile</span></li></Link>
              <li onClick={handleLogout}><LogoutIcon className='icon'/><span>Logout</span></li>
            </>
            :
            <Link to="/login" style={{textDecoration: "none"}}><li><PersonOutlineOutlinedIcon className='icon'/><span>Login</span></li></Link>
          }
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=>dispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={()=>dispatch({type: "DARK"})}></div>
      </div>
    </div>
  )
}
