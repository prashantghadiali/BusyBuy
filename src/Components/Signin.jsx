import React, { useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './Filter.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './Contexts/AuthContexts';
import NavbarComp from './NavbarComp';

function Signin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            toast.error("Failed to log in");
        }

        setLoading(false)
      };
  return (
    <div>
        <NavbarComp />
        <h1 className='center' style={{marginTop: "10%"}}>Sign In</h1>
        <Container className='center mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email"
                            ref={emailRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password"
                            ref={passwordRef} />
                </Form.Group>
                <Button variant="success" type="submit">
                    Sign In
                </Button>
            </Form>
        </Container>
        <Link to='/signup'>
            <Form.Text className='center'>
                <b>
                    Or SignUp instead
                </b>
            </Form.Text>
        </Link>
    </div>
  )
}

export default Signin
