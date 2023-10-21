import React, { useRef, useState } from 'react'
import { Button, Container, Form, ToastContainer } from 'react-bootstrap'
import './Filter.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContexts';
import { toast } from 'react-toastify';
import NavbarComp from './NavbarComp';

function SignUp() {
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async(e)  => {
        e.preventDefault()
        try {
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/');
          } catch {
            console.log("Failed to create an account", emailRef.current.value, passwordRef.current.value);
            toast.error("Failed to create an account")
          } 
          setLoading(false)
        }

  return (
    <div>
        <NavbarComp />
        <h1 className='center' style={{marginTop: "10%"}}>Sign Up</h1>
        <Container className='center mt-5'>
            <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="userid">
                    <Form.Control type="text"  ref={userNameRef} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" ref={passwordRef} placeholder="Password" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Sign Up
                </Button>
            </Form>
        </Container>
        <ToastContainer />
    </div>
  )
}

export default SignUp

