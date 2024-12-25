import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Pages/Firebase/firebase.init';
import axios from 'axios';
// import auth from '../firebase.init';



export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    // create user with email and pass
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    // log in user 
    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // sing out user based email and pass

    const logOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }

    
    const loginWithGoogle = () =>{
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    const userInfo ={
        
        createUser,
        loginUser,
        logOutUser,
        loginWithGoogle,
        user,
        loading,

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser?.email) {
            setUser(currentUser);
      
            try {
              const response = await axios.post("https://assignment-test-11-server.vercel.app/jwt", {
                userEmail: currentUser?.email,
              }, 
              {withCredentials: true}
            );
              console.log(response.data); // Access the data here
            } catch (error) {
              console.error("Error fetching JWT:", error);
            }
          } else {
            // Handle logout case
            setUser(currentUser)
             await axios.get('https://assignment-test-11-server.vercel.app/logout', {
                withCredentials: true
             })
            
            setUser(null); // Clear user state
          }
      
          setLoading(false);
        });
      
        return () => {
          unsubscribe();
        };
      }, []);
      
    

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;