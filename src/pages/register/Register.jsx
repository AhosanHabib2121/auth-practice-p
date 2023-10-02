import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../hook/useAuth";


const Register = () => {
    const {
        createRegister,
        profileUpdate,
        registerEmailVerified
    } = useAuth();
    
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [error, setError] = useState('');
    const [eyeToggole, setEyeToggole] = useState(false);

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const image = e.target.image_url.value;
        const email = e.target.email.value;
        const password = e.target.pass.value;
        const checkbox = e.target.checkbox.checked;
        // console.log(name, image, email, password, checkbox)
        setRegisterSuccess('');
        setError('');

        if (password.length < 6) {
            alert('Password must be 6 character')
            return;
        }
        else if (!checkbox) {
            alert('Fill up the checkbox')
            return;
        }

        // registration
        createRegister(email, password)
            .then(data => {
                // console.log(data.user);
    
                // profile update 
                profileUpdate(name, image)
                .then(() => {
                    setRegisterSuccess('Account created Successfully');
                    e.target.reset()
                })

                // email verify
                registerEmailVerified()
                    .then(() => {
                        alert('Please check your email and verify your account')
                        return
                });
                
            })
            .catch(error => {
                setError(error.message)
            })
        
        
      
        

    }
    return (
        <div className=" min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center">
                    <h1 className="text-5xl font-bold my-5">Register now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full  max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        {
                            registerSuccess && <div className=" my-2">
                                <p className=" text-green-500">{ registerSuccess }</p>
                            </div>
                        }
                        {
                            error && <div className=" my-2">
                                <p className=" text-red-500">{ error }</p>
                            </div>
                        }
                        
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Enter your name" className="input input-bordered" required/>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image Url</span>
                                </label>
                                <input type="text" name="image_url" placeholder="Enter image url" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email" className="input input-bordered" required />
                            </div>

                            <div >
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="form-control relative">
                                    <input
                                        type={eyeToggole? "text":"password"}
                                        name="pass" placeholder="Enter password" className="input input-bordered" />
                                    <span className=" absolute my-5 right-3" onClick={() => setEyeToggole(!eyeToggole)}>
                                        {
                                            eyeToggole?<AiFillEyeInvisible  className=" text-lg"/> 
                                            :<AiFillEye className=" text-lg"/>
                                        }
                                       
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 text-left">
                                <input type="checkbox" name="checkbox" id="condition" className="mr-2"/>
                                <label htmlFor="condition" className=" text-slate-500 text-md">accept all condition!</label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary normal-case">Register</button>
                            </div>
                        </form>
                        <div className=" my-4 ">
                            <p className=" text-slate-500">Already exists <Link to='/login' className=" text-blue-500 underline">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;