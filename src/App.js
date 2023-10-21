import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Signin from './Components/Signin';
import SignUp from './Components/SignUp';
import Cart from './Components/Cart';
import Myorders from './Components/Myorders';
import { AuthProvider } from './Components/Contexts/AuthContexts';
import { CartProvider } from './Components/Contexts/CartContext';

// import PrivateRoute from './Components/PrivateRoute';


function App() {
  
  return (
    <>
    <ToastContainer />
      <Router>
          <AuthProvider>
              <CartProvider>
                <Routes>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/myorders" element={<Myorders />} />
                </Routes>
              </CartProvider>
          </AuthProvider>
        </Router>
    </>
  );
}

export default App;
