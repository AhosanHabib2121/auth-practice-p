import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import auth from "../configFirbase/Firebase.config";


export const authContextApi = createContext(null)

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    
    // create(register)with email password
    const createRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);

    }
    
    // profile update
    const profileUpdate = (name, image) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        })
    }
    // email verification
    const registerEmailVerified = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser);
    }
    
    // login email password
    const loginEmailPass = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // auth state change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
            // console.log('currentUser', currentUser)
        })
        return () => {
            unSubscribe();
        }
    }, [])

    // logOUt
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    // forget password
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    
    //login with google
    const loginWithGoogle = () => {
       return signInWithPopup(auth, googleProvider)

    }

    // login with github
    const loginWithGithub = () => {
        return signInWithPopup(auth,githubProvider)
    }
    

    

    const createData = {createRegister, profileUpdate, registerEmailVerified,loginEmailPass, logOut, user, loading, forgetPassword, loginWithGoogle,loginWithGithub};
    return (
        <authContextApi.Provider value={createData}>
            { children }
        </authContextApi.Provider>
    );
};

AuthContext.propTypes = {
    children: PropTypes.node
}
export default AuthContext;