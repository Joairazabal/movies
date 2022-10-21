import React, {useState} from 'react'
import useUser from '../../hooks/useUser'
import {user} from '../../redux/types';
import Logout from '../login/Logout';
import noUser from './noUser.png'

export interface Props {
    user: user
}

export default function PopUser({user} : Props) {

    const [open, setOpen] = useState(false);


    const handleOpen = (e : React.MouseEvent < HTMLButtonElement >) => {
        e.preventDefault();
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <div>
            <button onClick={
                    (e) => handleOpen(e)
                }
                className='flex h-full items-center'><img src={
                        user.photoURL
                    }
                    alt={
                        user.displayName
                    }
                    className='h-10 rounded-full active:border active:border-secundary-50 alt font-Nunito text-secundary-50 '/></button>
            <div className={
                open ? "visible bg-secundary-200 absolute z-20 w-[15rem] mt-3 h-[8rem] rounded-lg   " : 'hidden '
            }>
                <div className="absolute content-[''] left-[10%]  bottom-[90%] translate-x-[-50%] h-5 w-5 bg-secundary-200 rotate-[45deg]"></div>
                <div className=' flex items-center gap-3 mt-4 ml-4'>
                    <img src={
                            user.photoURL
                        }
                        alt=""
                        className='h-10 rounded-full'/>
                    <label className='text-md text-secundary-50 font-PT font-semibold'>
                        {
                        user.displayName
                    }</label>
                </div>
                <div className='h-[1px] bg-secundary-100 mt-4 w-full'></div>
                <ul className='w-full flex flex-col items-center justify-center mt-2'>
                    <li><Logout/></li>
                </ul>
            </div>
        </div>
    )
}
