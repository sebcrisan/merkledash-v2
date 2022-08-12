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
    const {currentUser, handleVerifyEmail} = useAuth();
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    // const [mode, setMode] = useState("");
    // const [actionCode, setActionCode] = useState("");
    // const [continueUrl, setContinueUrl] = useState("");
    const navigate = useNavigate();

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
        handleMode(mode, actionCode, continueUrl);
    }

    // Handles the mode fetched from params
    const handleMode = (mode, actionCode, continueUrl) =>  {
        // Handle the user management action.
        switch (mode) {
            case 'resetPassword':
            // Display reset password handler and UI.
            // handleResetPassword(auth, actionCode, continueUrl, lang);
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

    // Get url params on load
    useEffect(() => {
        handleResult();
        return () => {};
    }, []);

    return (
        <div className='profile'>
            <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="profileContainer">
                <Navbar></Navbar>
                <div className="profileTitle">
                    Verify
                </div>
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
            </div>
        </div>
    )
}
