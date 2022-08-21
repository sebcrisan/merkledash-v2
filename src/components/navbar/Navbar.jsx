import { useState} from "react";
import "./navbar.scss"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate} from "react-router-dom";
import ConfirmDialog from "../confirmdialog/ConfirmDialog";

export default function Navbar() {
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: "", });
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
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  )
}