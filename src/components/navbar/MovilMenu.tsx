import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import useLenguages from '../../hooks/useLenguages'
import useUser from '../../hooks/useUser'
import {navText, user} from '../../redux/types'
import Login from '../login/Login'
import Logout from '../login/Logout'
import {useTranslation} from 'react-i18next'
import ButtonLenguage from './ButtonLenguage'

export default function MovilMenu() {
    const [close, setClose] = useState(false)

    const handleOpen = (e : any) => {
        e.preventDefault();
        setClose(true)
    }
    const handleClose = (e : any) => {
        e.preventDefault();
        setClose(false)
    }

    const user: user | null = useUser();
    const allText = useLenguages();

    const {t} = useTranslation();

    console.log(t)
    return (
        <div className=' inline-block sm:block lg:hidden z-30'>
            <div className="w-11 h-11 mr-3 relative cursor-pointer flex lg:hidden sm:block sm:mt-[-6px] z-20"
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
            <div className={
                ` bg-primary-100  gap-4 left-0 w-full absolute  text-secundary ease-linear transition-all duration-[0.4s] entrete translate-x-[-100%]
             ${
                    close ? 'top-0  h-screen  translate-x-[0%]' : ' top-[0vh] h-screen '
                }`
            }>
                <div className='flex flex-col mt-[10vh] gap-8 '>
                    {
                    user ? <div className=' flex items-center gap-3 mt-4 ml-4'>
                        <img src={
                                user.photoURL
                            }
                            alt=""
                            className='h-11 rounded-full'/>
                        <label className='lg:text-md sm:text-xl text-secundary-50 font-PT font-semibold'>
                            {
                            user.displayName
                        }</label>
                    </div> : null
                }

                    <ul className='flex flex-col ml-5 text-2xl font-PT gap-4 items-start  '>
                        <li>
                            <Link to={'/'}>
                                {
                                t('navBar.home')
                            } </Link>
                        </li>
                        <li>
                            <Link to={'/movies'}>
                                {
                                t('navBar.movies')
                            } </Link>
                        </li>
                        <li>
                            <Link to={'/series'}>Series</Link>
                        </li>
                        {
                        user ? <Logout/>: <Link to={'/login'}>
                            <span className='text-xl text-secundary'>
                                {
                                t('navBar.new')
                            }
                                <strong className='text-2xl text-secundary-50 ml-2'>
                                    {
                                    t('navBar.signUp')
                                }</strong>
                            </span>
                        </Link>
                    }
                        <ButtonLenguage/>
                    </ul>
                </div>
            </div>

        </div>


    )
}
