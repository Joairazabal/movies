import React from "react";
import Search from "../search/Search";
import { Link } from "react-router-dom";
import Login from "../login/Login";
import Profile from "../login/Profile";
import Logout from "../login/Logout";
import {useAuth0} from '@auth0/auth0-react'

export default function () {

const {isAuthenticated}=useAuth0();

  return (
    <nav className="w-full bg-primary-200 flex h-24 items-center justify-between top-0 sticky">
      <div className="flex w-auto gap-20 items-center ml-10">
      <div>
      <h1 className=' font-Logo font-black text-secundary-50 lg:text-6xl sm:text-4xl '>Ji</h1>
      </div>
        <ul className="flex gap-8 text-secundary font-Nunito text-2xl">
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
        <div className="mr-10 flex items-center gap-8">
        {isAuthenticated?
        <div className="flex gap-8 items-center">
        <Profile/>
        <Logout/>
        </div>
        :<Login/>
        }
        <Search />
      </div>
      
    </nav>
  );
}
