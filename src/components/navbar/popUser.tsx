import React, {useState} from 'react'
import useUser from '../../hooks/useUser'
import Logout from '../login/Logout';

export default function PopUser() {

    const [open, setOpen] = useState(false);

    const user = useUser();

    const handleOpen = (e : React.MouseEvent < HTMLButtonElement >) => {
        e.preventDefault();
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <div>
            <button onClick={
                (e) => handleOpen(e)
            }><img src={
                        user ?. photoURL
                    }
                    alt={
                        user.displayName
                    }
                    className='h-10 rounded-full active:border active:border-secundary-50 alt font-Nunito text-secundary-50 items-center'/></button>
            <div className={
                open ? "visible bg-secundary-200 absolute z-10 w-[15rem] mt-3 h-[10rem] rounded-lg   " : 'hidden '
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
                <ul className='w-full flex flex-col items-center mt-2'>
                    <li>
                        <a className='text-secundary font-Nunito text-md rounded-lg'>My favorites</a>
                    </li>
                    <li>
                        <a className='text-secundary font-Nunito text-md rounded-lg'>My information</a>
                    </li>
                    <li><Logout/></li>
                </ul>
            </div>
        </div>
    )
}
