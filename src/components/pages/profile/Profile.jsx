import React, { useContext, useState, useRef, useEffect } from 'react'
import "./profile.scss";
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { DarkModeContext } from "../../../contexts/DarkModeContext";
import {Card, Button, Alert, Spinner, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../../contexts/AuthContext';
import VerifyEmail from '../../verifyemail/VerifyEmail';

export default function Profile() {
    const {darkMode} = useContext(DarkModeContext)
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updatePassword, updateEmail} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);

    // Reload user on load
    useEffect(()=>{
        currentUser.reload().then(()=>{
        currentUser.emailVerified ? setVerified(true) : setVerified(false);
        });
    },[])
    // update profile 
    async function handleSubmit(e) {
        setMessage("");
        e.preventDefault();
        // check if both password fields match
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match!");
        }
        // promises array that will collect email and password update promises, then execute
        const promises = [];
        setLoading(true);
        setError("");
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value));
        }
        if(promises.length > 0){
            Promise.all(promises).then(()=>{
                setMessage("Profile updated successfully!")
                // navigate("/dashboard");
            }).catch((error) => {
                if(error.message.includes("requires-recent-login")){
                    setError("You need to relog in order to update your account!");
                }
                else{
                    setError("Failed to update account!");
                }
            }).finally(() => {
                setLoading(false);
                return;
            })
        }
        setLoading(false);
    }

    return (
        <div className='profile'>
            <Sidebar className={darkMode ? "dark" : "light"}/>
            <div className="profileContainer">
                <Navbar></Navbar>
                <div className="profileTitle">
                    Update Profile
                </div>
                {!currentUser.emailVerified && (!verified && <VerifyEmail version=""></VerifyEmail>)}
                <div className="bottom">
                    <div className="left">
                        <Card className='form'>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>

                            {/* Email */}
                            <Form.Group id="email" className='mb-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                            </Form.Group>

                            {/* Password */}
                            <Form.Group id="password" className='mb-4'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same'/>
                            </Form.Group>

                            {/* Password Confirm */}
                            <Form.Group id="password-confirm" className='mb-4'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                            </Form.Group>

                            {/* Update Button */}
                            <Button disabled={loading} className="btn submitbtn w-100 mt-4" type="submit">
                            Update
                            </Button>
                            </Form>
                        </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
