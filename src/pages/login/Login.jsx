import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../hook/useAuth";

const Login = () => {
    
    const { loginEmailPass, forgetPassword, loginWithGoogle, loginWithGithub } = useAuth();
    
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate() 
    const emailRef = useRef(null);
    const [eyeToggole, setEyeToggole] = useState(false);

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.pass.value;
        // console.log(email, password)
        setErrorMessage('');
        // signIn
        loginEmailPass(email, password)
            .then((result) => {
                if (result.user.emailVerified) {
                    alert('login successfully')
                    e.target.reset();
                    navigate('/')
                }
                else {
                    alert('Your email is not verify')
                }
            })
            .catch(error => {
                setErrorMessage("Email is incorrect",error.message)
            })
        
    }
    //login with google
    const handleGoogle = () => {
        loginWithGoogle()
            .then(res => {
                console.log(res.user)
                navigate('/')
            })
        .catch(error => {
            console.log(error.message)
        })
    }
    
    // login with github
    const handleGithub = () => {
        loginWithGithub()
            .then(res => {
                // console.log(res.user)
                navigate('/')
            
            })
        .catch(error => {
            console.log(error.message)
        })
    }

    // forget password
    const handleForgetPass = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please provide an email')
            return
        }
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            alert('please write a valid email');
            return
        }
        forgetPassword(email)
            .then(() => {
                alert('please check your email');
            })
            .catch(error => {
                alert(error.message);
            })
    }

    return (
        <div className=" min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center">
                    <h1 className="text-5xl font-bold my-5">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full  max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        {
                            errorMessage && <div className=" my-2">
                                <p className=" text-red-500">{ errorMessage }</p>
                            </div>
                        }
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="Enter your email" className="input input-bordered" required />
                            </div>

                            <div >
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="form-control relative">
                                    <input
                                        type={eyeToggole? "text": "password"}
                                        name="pass"
                                        placeholder="Enter password" className="input input-bordered" required />
                                    <span className=" absolute my-5 right-3" onClick={() => setEyeToggole(!eyeToggole)}>
                                        {
                                            eyeToggole?<AiFillEyeInvisible  className=" text-lg"/> 
                                            :<AiFillEye className=" text-lg"/>
                                        }
                                       
                                    </span>
                                </div>
                                
                                <label className="label">
                                    <a href="#" onClick={handleForgetPass} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6 ">
                                <button className="btn btn-primary normal-case">Login</button>
                            </div>
                        </form>
                        <div className="form-control mt-6 space-y-3">
                            <button onClick={handleGoogle} className="btn btn-secondary normal-case">Google</button>

                            <button onClick={handleGithub}  className="btn btn-accent normal-case">Github</button>
                        </div>
                        <div className=" my-4 ">
                            <p className=" text-slate-500">Create account <Link to='/register' className=" text-blue-500 underline">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;