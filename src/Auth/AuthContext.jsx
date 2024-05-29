import {auth, usersCollection} from '../firebase.js';
import {signOut,sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {createContext, useContext, useEffect, useState} from "react";
import { getDocs, query, where} from "firebase/firestore";

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState()
    const [us,setUs] = useState()


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                setUser(user);
                const user_ref = query(usersCollection, where("UID", "==", user.uid));
                const uss = (await getDocs(user_ref)).docs[0]
                setUs(uss)
                setLoading(false);
            } else {
                // User is not authenticated, handle it accordingly
                setUser(null);
                setLoading(false);
            }

        })
        return unsubscribe
    },[])

    function login(email,password){
         return signInWithEmailAndPassword(auth,email,password)
    }



    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }


    function logOut(){
        return signOut(auth)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    const value = {
        user,
        us,
        login,
        signUp,
        logOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

