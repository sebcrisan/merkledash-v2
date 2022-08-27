import {React, useContext,useState} from 'react'
import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation} from "react-router-dom";
import { DarkModeContext } from '../../contexts/DarkModeContext';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect } from 'react';

export default function Sidebar(props) {
  const {dispatch} = useContext(DarkModeContext)
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Intersection Observer for detecting scroll
  useEffect(()=>{
    initObserver();
    return () => {}
  },[]);

  const initObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = () => {
      console.log("Detected");
    }
    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector('#Introduction');
    observer.observe(target);
  }

  // Logout user
  async function handleLogout(){
    try{
      await logout();
      navigate("/");
    } catch{
     alert("Failed to log out");
    }
  }
  // Set menu open by default if on documentation page
  useEffect(()=>{
    location.pathname == "/getstarted" && setMenuOpen(true);
    return () => {};
  }, []);

  // Toggle documentation menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  } 

  // Menu items: string[]
  const menuItems = props.menuItems;

  return (
    <div className='sidebar'>
      <Link to="/" style={{textDecoration: "none"}}><div className="top"><span className="logo">&lt; Merkle Dash / &gt;</span></div></Link>
      <hr />
          <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{textDecoration: "none"}}><li><DashboardIcon className='icon'/><span>Dashboard</span></li></Link>
          <Link onClick={toggleMenu} to="/getstarted" style={{textDecoration: "none"}}>
            <li>
              <ArticleIcon className='icon'/>
              <span>Documentation</span>
              {
                menuOpen ?
                <KeyboardArrowDownIcon className='menuArrow'></KeyboardArrowDownIcon>
                :
                <KeyboardArrowRightIcon className='menuArrow'></KeyboardArrowRightIcon>
              }
              
            </li>
          </Link>
          {
            menuOpen &&
            menuItems.map(el => <a key={el} href={`#${el}`}><li><span>{el}</span></li></a>)
          }
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
