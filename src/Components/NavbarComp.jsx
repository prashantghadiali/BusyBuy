import React, { useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBasketShopping, faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './Contexts/AuthContexts';
import { toast } from 'react-toastify';
import { CartContext } from './Contexts/CartContext';
// import { useValue } from './Context';

function NavbarComp() {
  // const { signIn, setSignIn } = useValue();
  const { currentUser, setCurrentUser, logout } = useAuth();


  const handleSignOut = async () => {
    try {
      await logout()
      setCurrentUser(null)
    } catch(err) {
      console.log("Failed to sign out", err.message)
    }
  };
  return (
    <>
        <Navbar >
            <Container>
              <Nav.Link href="/">
                <Navbar.Brand>Busy Buy</Navbar.Brand>
              </Nav.Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Nav>
                    <Nav.Link href="/">
                        <Navbar.Text>
                          <FontAwesomeIcon icon={faHouse} />  Home
                        </Navbar.Text>
                    </Nav.Link>
                    {currentUser ? 
                      <>
                        <Nav.Link href="/myorders">
                          <Navbar.Text>
                            <FontAwesomeIcon icon={faBasketShopping} style={{color: "#5c92f0",}} /> My Orders
                          </Navbar.Text>
                        </Nav.Link>
                        <Nav.Link href="/cart">
                          <Navbar.Text>
                            <FontAwesomeIcon icon={faCartShopping} style={{color: "#5c92f0",}} /> Cart
                          </Navbar.Text>
                        </Nav.Link>
                        <Nav.Link onClick={handleSignOut}>
                          <Navbar.Text>
                            <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign Out
                          </Navbar.Text>
                        </Nav.Link>
                      </>
                      :
                    <Nav.Link href="/signin">
                      <Navbar.Text>
                        <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign In
                      </Navbar.Text>
                    </Nav.Link>
                  }
                  </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default NavbarComp
