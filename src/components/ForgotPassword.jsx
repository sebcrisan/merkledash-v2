import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
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
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>

            {/* Email */}
            <Form.Group id="email" className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            {/* Reset Password Button */}
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          
          {/* Login */}
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>

      {/* Sign Up */}
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
