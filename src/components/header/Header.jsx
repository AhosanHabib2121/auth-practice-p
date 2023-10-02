import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContextApi } from "../../contextAPI/AuthContext";

const Header = () => {
    const { user, logOut } = useContext(authContextApi)
    const navLinks = <>
        <li><NavLink to= '/' className='mr-2'>Home</NavLink></li>
        <li><NavLink to='/about' className='mr-2'>About</NavLink></li>
        {
            !user? <>
                <li><NavLink to= '/login' className='mr-2'>Login</NavLink></li>
                <li><NavLink to= '/register' className='mr-2'>Register</NavLink></li>
            </> : <>
                <li><NavLink to= '/order' className='mr-2'>Order</NavLink></li>
            </>
         
        }
        
    </>

    const handleSignOut = () => {
        logOut()
        .then(() => {
            alert("SignOut completed")
        })
        .catch()

    }

    return (
        <div className="navbar bg-base-100 px-20 py-5">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                   {navLinks}
                </ul>
                </div>
                <a className=" normal-case text-2xl  font-bold">Auth-Practice-P</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    
                    {
                        user ? <>
                            <div className=" flex items-center gap-3">
                                <div>
                                    <h3>{ user.displayName }</h3>
                            </div>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <summary>
                                            <img src={user?.photoURL} />
                                            
                                         </summary>
                                    </div>
                                </label>
                            </div>
                        </>
                        :<Link to="/login" className="btn btn-sm normal-case">Login</Link>
                    }
                        
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a onClick={handleSignOut}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;