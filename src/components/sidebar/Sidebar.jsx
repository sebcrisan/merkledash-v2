import {React, useContext, useState, useEffect} from 'react'
import "./sidebar.scss";
// import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation} from "react-router-dom";
import { DarkModeContext } from '../../contexts/DarkModeContext';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ConfirmDialog from "../confirmdialog/ConfirmDialog";
import { HashLink } from 'react-router-hash-link';

export default function Sidebar(props) {
  const {dispatch} = useContext(DarkModeContext)
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: "", });

  // Refs passed from other component 
  const refs = props.elementsRef;
  // Visibility state tracking
  const [currentEntry, setCurrentEntry] = useState("");
  // Init intersection observer
  const initObserver = (refs) => {
    const observer = new IntersectionObserver((entries)=>{
      let entry = entries[0];
      if(entry.isIntersecting){
        let id = entry.target.id;
        setCurrentEntry(id);
      }
    }, {
      rootMargin: `0px 0px -${window.innerHeight - 65}px 0px`
    })
    refs.current.forEach(
      ref => {
        observer.observe(ref.current);
      }
    );
  }
  useEffect(()=>{
    refs != undefined && initObserver(refs);    
  },[]);
  
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
          <p className="title">DOCS</p>
          {/* <Link to="/dashboard" style={{textDecoration: "none"}}><li><DashboardIcon className='icon'/><span>Dashboard</span></li></Link> */}
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
            menuItems.map((el, index) => <HashLink key={index} to={`#${el}`}><li><span className={el == currentEntry ? "currentEntry" : undefined}>{el.replace(/-/g, " ")}</span></li></HashLink>)
          }
          <p className="title">PROJECTS</p>
          <Link to="/projects" style={{textDecoration: "none"}}><li><ConstructionIcon className='icon'/><span>Projects</span></li></Link>
          <p className="title">USER</p>
          {currentUser ?
            <>
              <Link to="/profile" style={{textDecoration: "none"}}><li><PersonOutlineOutlinedIcon className='icon'/><span>Profile</span></li></Link>
              <li onClick={()=>{
                setConfirmDialog({
                   isOpen: true,
                   title: `Are you sure you want to logout?`,
                   subTitle: "",
                   onConfirm: () => {handleLogout()}
                })}}><LogoutIcon className='icon'/><span>Logout</span></li>
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  )
}
