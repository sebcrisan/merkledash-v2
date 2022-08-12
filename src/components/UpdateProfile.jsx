import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updatePassword, updateEmail} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // update profile 
    function handleSubmit(e) {
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
        Promise.all(promises).then(()=>{
            navigate("/dashboard");
        }).catch(() => {
            setError("Failed to update account");
        }).finally(() => {
            setLoading(false);
        })
    }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      
      {/* Cancel */}
      <div className="w-100 text-center mt-2">
        <Link to="/dashboard">Cancel</Link>
      </div>
    </>
  )
}
