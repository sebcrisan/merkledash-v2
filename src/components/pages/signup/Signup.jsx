import React, { useContext, useState, useRef } from 'react'
import "./signup.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';

export default function Login() {
    const {verifyMail, currentUser} = useAuth();
    const {darkMode} = useContext(DarkModeContext)
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Sign Up
    async function handleSubmit(e) {
        e.preventDefault();
        // Validate password fields match
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match!");
        }
        try {
            setError("");
            setLoading(true);
            // create the user account
            const userCred = await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/projects");
        } catch(e) {
            console.log(e);
            let err = e.message.split("Firebase: ")[1].split("(");
            let finalErr = err[0];
            if(err[1].includes("email-already-in-use")){
                finalErr = "Email already in use"
            }
            setError(finalErr);
        }
        setLoading(false);
    }

    return (
        <div className='signup'>
            <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="signupContainer">
                <Navbar></Navbar>
                <div className="signupTitle">
                    Sign Up
                </div>
                <div className="bottom">
                    <div className="left">
                        <Card className='form'>
                            <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>

                                {/* Email */}
                                <Form.Group id="email" className='mb-4'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>

                                {/* Password */}
                                <Form.Group id="password" className='mb-4'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>

                                {/* Password Confirm*/}
                                <Form.Group id="password-confirm" className='mb-4'>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>

                                {/* Sign Up */}
                                <Button disabled={loading} className="btn submitbtn w-100 mt-4" type="submit">
                                Sign Up
                                </Button>
                            </Form>

                            {/* Login */}
                            <div className="w-100 text-center mt-2">
                                Already have an account? <Link to="/login" className="loginLink" style={{textDecoration: "none"}}>Login</Link>
                            </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
