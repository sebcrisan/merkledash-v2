import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
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
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/dashboard");
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
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Login */}
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </>
  )
}
