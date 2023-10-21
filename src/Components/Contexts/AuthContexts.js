import React, { useContext, useState, useEffect } from "react"
// import firebase from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const auth = getAuth();

// sign up with firebase
async  function signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up: ", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign up error: ", errorCode, errorMessage);
    }
  }

  // log in with firebase
  async function login(email, password) {
    try {   
          await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              toast.success("Sign up Successfully!")
              setCurrentUser(user);
              navigate('/')
              console.log("user", user);
          })
          } catch (error) {
            console.error(error.message);
            toast(error.message)
          }
  }

  // logout
  const logout = async() => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate('/signin')
      toast.success("Log Out Succesfully");
      // Add any additional actions after successful logout here
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  }

  // for auth state available on every related page. not empty after routes changed.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}