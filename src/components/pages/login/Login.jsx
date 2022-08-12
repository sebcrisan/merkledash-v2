import React, { useContext, useState, useRef } from 'react'
import "./login.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';

export default function Login() {
    const {darkMode} = useContext(DarkModeContext)
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Login
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/dashboard");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    }

    return (
        <div className='login'>
            <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="loginContainer">
                <Navbar></Navbar>
                <div className="loginTitle">
                    Log In
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

                                {/* Login */}
                                <Button disabled={loading} className="btn submitbtn w-100 mt-4" type="submit">
                                Log In
                                </Button>
                            </Form>

                            {/* Forgot Password */}
                            <div className="w-100 text-center mt-3">
                                <Link to="/forgot-password" className='forgotPw' style={{textDecoration: "none"}}>Forgot Password?</Link>
                            </div>

                            {/* Sign Up */}
                            <div className="w-100 text-center mt-3">
                                Need an account? <Link to="/signup" className='signup' style={{textDecoration: "none"}}>Sign Up</Link>
                            </div>
                            </Card.Body>
                        </Card>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}
