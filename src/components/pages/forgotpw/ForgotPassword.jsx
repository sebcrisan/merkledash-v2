import React, { useContext, useState, useRef } from 'react'
import "./forgotPassword.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';

export default function Signup() {
    const {darkMode} = useContext(DarkModeContext)
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // reset password 
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
        }
        setLoading(false);
    }
    
  return (
    <div className='forgotpw'>
        <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="forgotpwContainer">
                <Navbar></Navbar>
                <div className="forgotpwTitle">
                    Password Reset
                </div>
                <div className="bottom">
                    <div className="left">
                        <Card className='form'>
                            <Card.Body>
                                <h2 className="text-center mb-4"></h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <Form onSubmit={handleSubmit}>

                                    {/* Email */}
                                    <Form.Group id="email" className='mb-4'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                    </Form.Group>

                                    {/* Reset Password Button */}
                                    <Button disabled={loading} className="btn submitbtn w-100 mt-4" type="submit">
                                    Reset Password
                                    </Button>
                                </Form>
                                
                                {/* Login */}
                                <div className="w-100 text-center mt-3">
                                    <Link to="/login"  className="loginLink" style={{textDecoration: "none"}}>Login</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
  )
}
