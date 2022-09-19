import React from "react";
import Search from "../search/Search";
import { Link } from "react-router-dom";

export default function () {
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
            <a href="">series</a>
          </li>
        </ul>
        </div>
        <div className="mr-10">
        <Search />
      </div>
      
    </nav>
  );
}
