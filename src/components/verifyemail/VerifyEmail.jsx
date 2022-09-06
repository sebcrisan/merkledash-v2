import React, {useState, useEffect} from 'react'
import "./verifyEmail.scss";
import {Button, Alert, Spinner} from 'react-bootstrap';
import {useAuth} from '../../contexts/AuthContext';
export default function VerifyEmail(props) {

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {currentUser, verifyMail, logout} = useAuth();
    // Set verified on initial render
    useEffect(() => {
        switch (props.version) {
            case "":
                setMessage("You are currently not verified. Please verify your email to view your projects and dashboard!")
                break;
            case "projects":
                setMessage("You are currently not verified. Please verify your email to view your projects!");
                break;
            case "dashboard":
                setMessage("You are currently not verified. Please verify your email to view your dashboard!");
                break;
            default:
                break;
        }
        return () => {};
    }, []);

    // Loop that checks if a user is verified, by reloading the user. If verified, end loop and refresh page
    const initVerificationLoop = () => {
        const looper = setInterval(()=>{
            currentUser.reload().then(()=>{currentUser.emailVerified && endVerificationLoop(looper)});
        }, 1000);
    }

    // Ends the verification loop, logs user out
    const endVerificationLoop = (looper) => {
        clearInterval(looper);
        //refresh page
        window.location.reload();
    }
    // User email verification
    const verify = async () => {
        setLoading(true);
        try{
        await verifyMail(currentUser);
        }catch{
        setError("Too many verification requests! Please try again later!");
        }
        setLoading(false);
        setMessage("Verification email sent, click the link provided in the email to verify your email address...");
        initVerificationLoop();
    }
  return (
    <>
        {error ?
        <Alert className='verifyMsg' variant="danger">{error}</Alert>
        :
        <Alert className='verifyMsg' variant='info'>{message}
        <Button disabled={loading} className='btn w-100 mt-4' onClick={()=>{verify()}}>
            {loading ?
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
                :
            "Verify"
            }
        </Button>
        </Alert>
        }
    </>
  )
}
