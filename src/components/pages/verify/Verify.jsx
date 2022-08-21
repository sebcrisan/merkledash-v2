import React, { useContext, useState, useRef, useEffect } from 'react'
import "./verify.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';

export default function Verify() {
    const {darkMode} = useContext(DarkModeContext)
    const {currentUser, handleVerifyEmail, updatePassword} = useAuth();
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [mode, setMode] = useState("");
    const [modeName, setModeName] = useState("");
    const [message, setMessage] = useState("");
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [loading, setLoading] = useState(false);

    // Handles all the params in the url passed by firebase
    const handleResult = () => {
        // get params
        const params = new URLSearchParams(window.location.search);
        // Get the action to complete.
        let mode = params.get("mode");
        // Get the one-time code from the query parameter.
        let actionCode = params.get("oobCode");
        // (Optional) Get the continue URL from the query parameter if available.
        let continueUrl = params.get("continueUrl");
        // Handle the given mode i.e. verifyEmail
        setMode(mode);
        handleMode(mode, actionCode, continueUrl);
    }

    // Handles the mode fetched from params
    const handleMode = (mode, actionCode, continueUrl) =>  {
        // Handle the user management action.
        switch (mode) {
            case 'resetPassword':
            // Display reset password handler and UI.
            break;
            case 'recoverEmail':
            // Display email recovery handler and UI.
            // handleRecoverEmail(auth, actionCode, lang);
            break;
            case 'verifyEmail':
            // Display email verification handler and UI.
            handleEmail(actionCode, continueUrl);
            break;
            default:
                console.log("Error, invalid mode");
            // Error: invalid mode.
        }
    }

    // Handle email verification
    const handleEmail = async (actionCode, continueUrl) => {
        try{
            await handleVerifyEmail(actionCode);
            setVerified(true);
        }catch(e){
            setError(e.message);
            console.log(e.message);
        }
    }

    // Handle password reset
    const resetPassword = async (e) => {
        console.log("reset password init");
        e.preventDefault();
        // check if both password fields match
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match!");
        }
        setLoading(true);
        setError("");
        if(passwordRef.current.value){
            updatePassword(passwordRef.current.value).then(()=>{
                setMessage("Password Reset Successfully!");
            }).catch((error)=>{
                if(error.message.includes("requires-recent-login")){
                    setError("You need to relog in order to update your account!");
                }
                else{
                    setError(error.message.split("Firebase: ")[1].split("(")[0]);
                }
            }).finally(()=>{
                setLoading(false);
            })
        }
        setLoading(false);
    }

    // Get url params on load
    useEffect(() => {
        handleResult();
        return () => {};
    }, []);

    // Parses mode into nicer looking string
    useEffect(()=>{
        let mapping = {
            "resetPassword": "Reset Password",
            "verifyEmail": "Verify Email",
            "recoverEmail": "Recover Email"
        }
        setModeName(mapping[mode]);
    }, [mode])

    return (
        <div className='profile'>
            <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="profileContainer">
                <Navbar></Navbar>
                <div className="profileTitle">
                    {modeName}
                </div>
                <div className="bottom">
                    <div className="left">
                        {/* Verify Email */
                            mode == "verifyEmail" &&  
                            <div className="verifyMsg">
                            {
                                currentUser.emailVerified
                                ?
                                <Alert variant='success'>Your email has been successfully verified!</Alert>
                                :
                                <>
                                    {verified ? <Alert variant="success">Your email has been successfully verified!</Alert> : <Alert variant='info'>Your email has not yet been verified.</Alert>}
                                </>
                            }
                            </div>
                        }
                        {/* Reset Password */
                            mode == "resetPassword" &&
                            <Card className='form'>
                                <Card.Body className='cardBody'>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {message && <Alert variant="success">{message}</Alert>}
                                    <Form onSubmit={resetPassword}>
                                        <Form.Group id="password" className='mb-4'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" ref={passwordRef} placeholder='Your new password'/>
                                        </Form.Group>
               
                                        <Form.Group id="password-confirm" className='mb-4'>
                                        <Form.Label>Password Confirmation</Form.Label>
                                        <Form.Control type="password" ref={passwordConfirmRef} placeholder='Confirm your new password'/>
                                        </Form.Group>  

                                        <Button disabled={loading} className="btn submitbtn w-100 mt-4" type="submit">
                                            Confirm
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
