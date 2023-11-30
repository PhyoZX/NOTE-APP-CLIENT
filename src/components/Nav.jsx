import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FolderPlusIcon } from '@heroicons/react/24/solid';

import { UserContext } from "../contexts/UserContext";

const Nav = () =>{
    const { token, updateToken } = useContext(UserContext);

    const logoutHandler=()=>{
        updateToken(null);
    }

    return (
        <nav className=" bg-slate-50 py-4 px-10  font-mono">
            <div className=" flex items-center justify-between ">
                <div>
                    <Link to={"/"} className=" text-teal-600 font-bold text-4xl" >SHARENOTE.IO</Link>
                </div>
                <div className=" flex gap-3">
                    {
                        token ? (<><Link to={"/create"} className=" text-teal-600 " ><FolderPlusIcon width={40} /></Link>
                                    <button type=" button" className=" text-teal-600 font-bold mt-2" onClick={logoutHandler} >Logout</button></>) 
                                :(<><Link to={"/login"} className=" text-teal-600 font-bold mt-2">Login</Link>
                                    <Link to={"/register"} className=" text-teal-600 font-bold mt-2">Register</Link></>) 
                    }
                </div>
            </div>
                {
                token && token.user_email && (
                    <p className=" text-right text-sm text-teal-600"><span className=" font-semibold">Login as </span>{token.username}</p>
                    )
                }               
        </nav>
    );
};

export default Nav;