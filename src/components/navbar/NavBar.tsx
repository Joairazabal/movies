import React, { useState} from "react";
import Search from "../search/Search";
import {Link} from "react-router-dom";
import NavMovile from "./NavMovile";
import Logout from "../login/Logout";
import useUser from "../../hooks/useUser";
import Login from "../login/Login";
import { user } from "../../redux/types";
import PopUser from "./popUser";

export default function Navbar(): JSX.Element {

    const [close, setClose] = useState(false)

    const handleOpen = (e : any) => {
        e.preventDefault();
        setClose(true)
    }
    const handleClose = (e : any) => {
        e.preventDefault();
        setClose(false)
    }

    const user:user|null= useUser();
    
console.log(user)
    return (
        <nav className="w-full bg-primary-200 flex h-[10vh] items-center justify-between top-0 ">
            <div className="flex w-auto gap-20 items-center ml-10">
                <div>
                    <h1 className=' font-Logo font-black text-secundary-50 lg:text-6xl sm:text-4xl '>Ji</h1>
                </div>
                <div className=" lg:block sm:hidden">
                    <ul className="flex gap-8 text-secundary font-Nunito text-2xl ">
                        <li className="border-l-2 border-secundary-50 pl-2">
                            <Link to={"/"}>home</Link>
                        </li>
                        <li className="border-l-2 border-secundary-50 pl-2">
                            <Link to={'/movies'}>movies</Link>
                        </li>
                        <li className="border-l-2 border-secundary-50 pl-2">
                            <Link to={'/series'}>series</Link>
                        </li>
                    </ul>
                </div>
              
            </div>
            <div className="lg:mr-10 flex items-center lg:gap-8 ">
                {user!==null?
                <PopUser/>
                :
                <Link to='/login'><button className="text-secundary font-Nunito text-lg rounded-lg">Log in</button></Link>
                }
                <Search/>
            </div>

            <div className="w-11 h-11 mr-6 relative cursor-pointer flex lg:hidden sm:block "
                onClick={
                    close == false ? handleOpen : handleClose
            }>
                <div className={
                    close == false ? 'w-10 bg-secundary absolute rounded h-[4px] mt-3 duration-500 ' : 'w-10 bg-secundary absolute rounded h-[4px] mt-3 rotate-45 top-3 duration-500'
                }></div>
                <div className={
                    close == false ? 'w-10 bg-secundary absolute rounded h-[4px] mt-6 duration-500' : 'opacity-0'
                }></div>
                <div className={
                    close == false ? 'w-10 bg-secundary absolute rounded h-[4px] mt-9  duration-500 ' : 'w-10 bg-secundary absolute rounded h-[4px] mt-3 -rotate-45 top-3 duration-500'
                }></div>
            </div>

        </nav>

    )

}
