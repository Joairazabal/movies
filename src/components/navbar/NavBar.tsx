import React, {useState} from "react";
import Search from "../search/Search";
import {Link} from "react-router-dom";
import Logout from "../login/Logout";
import useUser from "../../hooks/useUser";
import Login from "../login/Login";
import {details, navText, user} from "../../redux/types";
import PopUser from "./popUser";
import MovilMenu from "./MovilMenu";
import ButtonLenguage from "./ButtonLenguage";
import {useTranslation} from 'react-i18next'

export default function Navbar(): JSX.Element {

    const userParse = useUser();
    const {t} = useTranslation();
    return (
        <nav className="w-full bg-primary-200 flex h-[10vh] items-center justify-between top-0 ">
            <div className="flex w-auto gap-20 items-center lg:ml-10 sm:ml-4">
                <div className="z-20">
                    <Link to={'/'}>
                        <h1 className=' font-Logo font-black text-secundary-50 lg:text-6xl sm:text-4xl md:text-5xl '>Ji</h1>
                    </Link>
                </div>
                <div className=" lg:block sm:hidden">
                    <ul className="flex gap-8 text-secundary font-Nunito text-2xl ">
                        <li className=" lg:buttom">
                            <Link to={'/'}>
                                {
                                t('navBar.home')
                            }</Link>
                        </li>
                        <li className=" lg:buttom">
                            <Link to={'/movies'}>
                                {
                                t('navBar.movies')
                            }</Link>
                        </li>
                        <li className=" lg:buttom">
                            <Link to={'/series'}>Series</Link>
                        </li>
                        <li className=" lg:buttom">
                            <Link to={
                                userParse ?. email ? '/favorites' : '/login'
                            }>
                                {
                                userParse ?. email ? t('favorites') : t('navBar.login')
                            }</Link>
                        </li>

                    </ul>
                </div>

            </div>
            <div className="lg:mr-10 flex items-center lg:gap-8 sm:gap-4 md:gap-8 ">
                <div className="lg:flex lg:block sm:hidden">
                    {
                    userParse ?. email.length ? <PopUser user={userParse}/> : <Link to='/login'>
                        <button className="text-secundary font-Nunito text-lg rounded-lg hover:scale-110 hover:duration-200">
                            {
                            t('navBar.login')
                        }</button>
                    </Link>
                } </div>
                <Search/>
                <div className="lg:block sm:hidden md:hidden">
                    <ButtonLenguage/>
                </div>
            </div>


            <MovilMenu/>

        </nav>

    )

}
