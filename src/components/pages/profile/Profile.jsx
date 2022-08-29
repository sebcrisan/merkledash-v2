import React, { useContext, useState, useRef, useEffect } from 'react'
import "./profile.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';
import VerifyEmail from '../../verifyemail/VerifyEmail';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EmailAuthProvider } from 'firebase/auth';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Profile() {
    const {darkMode} = useContext(DarkModeContext)
    const emailRef = useRef();
    const passwordRef = useRef();
    const {currentUser, updateEmail, reauthWithCreds} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [verified, setVerified] = useState(false);
    const [passwordVerified, setPasswordVerified] = useState(false);

    // Set this to true when implementing a method that involves viewing sub components
    const [viewingOptions, setViewingOptions] = useState(true);
    // View password verification subcomponent
    const [viewEnterPassword, setViewEnterPassword] = useState(false);
    // View change email subcomponent, requires password verification
    const [viewChangeEmail, setViewChangeEmail] = useState(false);
    // View change password subcomponent
    const [viewChangePassword, setViewChangePassword] = useState(false);
    // View API key subcomponent
    const [viewKey, setViewKey] = useState(false);
    // Api key visibility
    const [keyVisible, setKeyVisible] = useState(false);
    const toggleVisibility = () => {
        setKeyVisible(!keyVisible);
    }

    // Reload user on load
    useEffect(()=>{
        currentUser.reload().then(()=>{
        currentUser.emailVerified ? setVerified(true) : setVerified(false);
        });
    },[])

    
    // User wants to view email change - set states to initiate the process
    const tryViewEmail = () => {
        setPasswordVerified(false);
        setViewingOptions(false);
        setViewEnterPassword(true);
        setViewChangeEmail(true);
    } 

    // User wants to view API key - set states to initiate the process
    const tryViewKey = () => {
        setPasswordVerified(false);
        setViewingOptions(false);
        setViewEnterPassword(true);
        setKeyVisible(false);
        setViewKey(true);
    }
    // Password verification
    const verifyPassword = async (passwordInput) => {
        setError('');
        try{
            const cred = EmailAuthProvider.credential(currentUser.email, passwordInput)
            reauthWithCreds(currentUser, cred).then(()=>{
                setViewEnterPassword(false);
                setPasswordVerified(true);
                setError('');
            }).catch((error)=>{
                setError("Wrong password")
            })
        }
        catch(error){
            setError(error.message)
        }
    }
    // Change Email 
    const handleChangeEmail = async (e) => {
        setMessage('');
        e.preventDefault();
        setLoading(true);
        setError('');
        if(emailRef.current.value !== currentUser.email){
            updateEmail(emailRef.current.value).then(()=>{
                setMessage("Email updated successfully!")
            }).catch((error) => {
                if(error.message.includes("requires-recent-login")){
                    setError("You need to relog in order to update your account!");
                }
                else{
                    setError("Failed to update email!");
                }
            }).finally(() => {
                setLoading(false);
                setViewChangeEmail(false);
                setViewingOptions(true);
                return;
            })
        }
        setLoading(false);
    }
    // Toggle viewing change password
    const togglePasswordView = () => {
        setError('');
        setViewingOptions(!viewingOptions);
        setViewChangePassword(!viewChangePassword);
    }
    // Back to options view
    const back = () => {
        setViewEnterPassword(false);
        setViewChangePassword(false);
        setViewChangeEmail(false);
        setViewKey(false);
        setViewingOptions(true);
    }

    return (
        <div className='profile'>
            <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="profileContainer">
                <Navbar></Navbar>
                {verified ?
                <>
                <div className="profileTitle" onClick={back}>
                    {!viewingOptions && <ArrowBackIcon className='backArrow'></ArrowBackIcon>}
                    Update Profile
                </div>
                  <div className="bottom">
                    <div className="left">
                        <Card className='form'>
                        <Card.Body className='cardBody'>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}

                            
                            {/* Profile Options */
                                viewingOptions &&
                                <ul>
                                    <li onClick={tryViewEmail}><MailOutlineIcon className='icon'/><span>Change Email</span><ArrowForwardIosIcon className='arrow'/></li>
                                    <Link to="/forgot-password" className='forgotPw' style={{textDecoration: "none"}}><li onClick={togglePasswordView}><LockIcon className='icon'/><span>Change Password</span><ArrowForwardIosIcon className='arrow'/></li></Link>
                                    <li onClick={tryViewKey}><KeyIcon className='icon'/><span>API Key</span><ArrowForwardIosIcon className='arrow'/></li>

                                </ul>
                            }

                            {/* Verify Password */
                                viewEnterPassword && 
                                <>
                                <Form>
                                    <Form.Group id="verifyPw" className='mb-4'>
                                    <Form.Label>You need to enter your password to continue</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                                    </Form.Group>
                                </Form>
                                <div className="w-100 text-center mt-3">
                                    <Link to="/forgot-password" className='forgotPw' style={{textDecoration: "none"}}>Forgot Password?</Link>
                                </div>
                                <Button disabled={loading} onClick={()=>{verifyPassword(passwordRef.current.value)}} className="btn submitbtn w-100 mt-4">
                                        Confirm
                                </Button>
                                </>
                            }

                            {/* Change Email */
                                viewChangeEmail && passwordVerified &&
                                <>
                                  <Form onSubmit={handleChangeEmail}>
                                    <Form.Group id="email" className='mb-4'>
                                    <Form.Label>Please enter your new email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email}></Form.Control>
                                    </Form.Group>
                                    <Button disabled={loading} className="btn submitbtn w-100 mt-4" type="submit">
                                            Confirm
                                    </Button>
                                    </Form>
                                </>
                            }

                            {/* View API Key */
                                viewKey && passwordVerified &&
                                <>
                                  <Form>
                                    <Form.Group id="apiKey" className='mb-4'>
                                    <Form.Label>Your API Key</Form.Label>
                                    <input type={keyVisible ? "text" : "password"} className="form-control" defaultValue={currentUser.uid}></input>
                                    <span>{keyVisible ? <VisibilityOffIcon className='visibilityIcon' onClick={toggleVisibility}></VisibilityOffIcon>
                                     :
                                     <VisibilityIcon className='visibilityIcon' onClick={toggleVisibility}></VisibilityIcon>}</span>
                                    </Form.Group>
                                    </Form>
                                </>
                            }
                        </Card.Body>
                        </Card>
                    </div>
                </div>  
                </>
                :
                !currentUser.emailVerified && (!verified && <VerifyEmail version=""></VerifyEmail>)
                }
            </div>
        </div>
    )
}
