import { useState, useContext} from "react";
import { DarkModeContext } from '../../contexts/DarkModeContext';
import "./navbar.scss"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate} from "react-router-dom";
import ConfirmDialog from "../confirmdialog/ConfirmDialog";
import useWindowDimensions from '../../utils/useWindowDimensions';
import MenuIcon from '@mui/icons-material/Menu';


import { Button } from "@mui/material";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArticleIcon from '@mui/icons-material/Article';
import ConstructionIcon from '@mui/icons-material/Construction';
export default function Navbar(props) {
  // keep track of width and height of viewport
  const { height, width } = useWindowDimensions();
  // mobile menu
  const {dispatch} = useContext(DarkModeContext);
  const {darkMode} = useContext(DarkModeContext);

  const [state, setState] = useState({
    left: false,
  });
  const menuItemsLoggedOutObj = {
    "Documentation": {"link": "/getstarted", "component": <ArticleIcon className={`${darkMode && "darkIcon"}`}></ArticleIcon>},
    "Login": {"link": "/login", "component": <PersonOutlineOutlinedIcon className={`${darkMode && "darkIcon"}`}></PersonOutlineOutlinedIcon>}
  }
  const menuItemsLoggedOut = Object.keys(menuItemsLoggedOutObj);
  const menuItemsLoggedInObj = {
    "Documentation": {"link": "/getstarted", "component": <ArticleIcon className={`${darkMode && "darkIcon"}`}></ArticleIcon>},
    "Projects": {"link": "/projects", "component": <ConstructionIcon className={`${darkMode && "darkIcon"}`}></ConstructionIcon>},
    "Profile": {"link": "/profile", "component": <PersonOutlineOutlinedIcon className={`${darkMode && "darkIcon"}`}></PersonOutlineOutlinedIcon>}
  }
  const menuItemsLoggedIn = Object.keys(menuItemsLoggedInObj);
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        {currentUser ?
          <>
          <List>
            {menuItemsLoggedIn.map((text, index) => (
              <Link to={menuItemsLoggedInObj[text]["link"]}>
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {menuItemsLoggedInObj[text]["component"]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider></Divider>
          <List>
            <ListItem disablepadding="true" onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon className={`${darkMode && "darkIcon"}`}></LogoutIcon>
                </ListItemIcon>
                <ListItemText primary={"Logout"}/>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <div className="colorOption" onClick={()=>dispatch({type: "LIGHT"})}></div>
              <div className="colorOption" onClick={()=>dispatch({type: "DARK"})}></div>
            </ListItem>
          </List>
          </>
          :
          <>
          <List>
            {menuItemsLoggedOut.map((text, index) => (
              <Link to={menuItemsLoggedOutObj[text]["link"]}>
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{color: "red"}}>
                      {menuItemsLoggedOutObj[text]["component"]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          </>
        }
    </Box>
  );



  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: "", });
  // Logout user
  async function handleLogout(){
    try{
      await logout();
      navigate("/");
      setConfirmDialog({isOpen:false, title: "", subtitle: ""});
    } catch{
     alert("Failed to log out");
    }
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {currentUser &&
            <Link to="/profile">
              <div className="item">
                <PersonOutlineOutlinedIcon className='icon'/><span>Logged in as {currentUser.email}</span>
              </div>
            </Link>
          }
          {
            width <= 768 ?
            <>{
                !currentUser &&
                <div className="item left">
                  <Link to="/login" style={{textDecoration: "none", marginRight: "15px"}}><PersonOutlineOutlinedIcon className='icon'/><span>Login</span></Link>  
                </div>
              }
              <div className="item">
                <MenuIcon onClick={toggleDrawer('left', true)}></MenuIcon>
              </div>
            </>
            :
            <>
              {currentUser ?
                <div className="item" onClick={()=>{
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are you sure you want to logout?`,
                        subTitle: "",
                        onConfirm: () => {handleLogout()}
                      })}}
                  >
                    <LogoutIcon className='icon'/>
                  </div>
                  :
                  <Link to="/login" style={{textDecoration: "none", marginRight: "15px"}}><PersonOutlineOutlinedIcon className='icon'/><span>Login</span></Link>  
                } 
            </>
          }
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <div>
        <>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
            PaperProps={darkMode ? {sx:{backgroundColor: "#333", color: "#999", borderColor: "#333"}} : {sx:{backgroundColor: "white"}}}
          >
            {list("left")}
          </SwipeableDrawer>
        </>
    </div>
    </div>
  )
}
