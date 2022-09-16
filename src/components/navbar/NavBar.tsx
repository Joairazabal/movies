import React from "react";
import Search from "../search/Search";
import { Link } from "react-router-dom";

export default function () {
  return (
    <nav className="w-full bg-primary-200 flex h-24 items-center justify-around top-0 sticky">
      <div>
        <h1 className=" font-PT text-2xl text-secundary">Movies app</h1>
      </div>
      <div className="flex w-auto gap-11 items-center">
        <ul className="flex gap-4 text-secundary font-Nunito text-3xl">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <a href="#">Movies</a>
          </li>
          <li>
            <a href="#">Series</a>
          </li>
          <li>
            <a href="#">Genres</a>
          </li>
        </ul>
        <div>
        <Search />
      </div>
      </div>
    </nav>
  );
}
