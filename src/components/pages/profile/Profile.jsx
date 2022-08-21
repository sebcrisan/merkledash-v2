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

export default function Profile() {
    const {darkMode} = useContext(DarkModeContext)
    const emailRef = useRef();
    const passwordRef = useRef();
    const {currentUser, updateEmail, reauthWithCreds} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [verified, setVerified] = useState(false);

    // Set this to true when implementing a method that involves viewing sub components
    const [viewingOptions, setViewingOptions] = useState(true);
    // View password verification subcomponent
    const [viewEnterPassword, setViewEnterPassword] = useState(false);
    // View change email subcomponent, requires password verification
    const [viewChangeEmail, setViewChangeEmail] = useState(false);
    // View change password subcomponent
    const [viewChangePassword, setViewChangePassword] = useState(false);

    // Reload user on load
    useEffect(()=>{
        currentUser.reload().then(()=>{
        currentUser.emailVerified ? setVerified(true) : setVerified(false);
        });
    },[])
    
    // Toggle viewing password verification
    const viewPasswordVerification = () => {
        setViewingOptions(!viewingOptions);
        setViewEnterPassword(true);
    }
    // Password verification
    const verifyPassword = async (passwordInput) => {
        setError('');
        try{
            const cred = EmailAuthProvider.credential(currentUser.email, passwordInput)
            reauthWithCreds(currentUser, cred).then(()=>{
                setViewEnterPassword(false);
                setViewChangeEmail(true);
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
        setViewingOptions(true);
    }

    return (
        <div className='profile'>
            <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="profileContainer">
                <Navbar></Navbar>
                <div className="profileTitle" onClick={back}>
                    {!viewingOptions && <ArrowBackIcon className='backArrow'></ArrowBackIcon>}
                    Update Profile
                </div>
                {verified ?
                <>
                  <div className="bottom">
                    <div className="left">
                        <Card className='form'>
                        <Card.Body className='cardBody'>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}

                            
                            {/* Profile Options */
                                viewingOptions &&
                                <ul>
                                    <li onClick={viewPasswordVerification}><MailOutlineIcon className='icon'/><span>Change Email</span><ArrowForwardIosIcon className='arrow'/></li>
                                    <Link to="/forgot-password" className='forgotPw' style={{textDecoration: "none"}}><li onClick={togglePasswordView}><KeyIcon className='icon'/><span>Change Password</span><ArrowForwardIosIcon className='arrow'/></li></Link>
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
                                viewChangeEmail && 
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
