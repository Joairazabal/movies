import React from 'react'
import firebaseApp from '../../fireBase'
import {signOut, getAuth} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import useLenguages from '../../hooks/useLenguages';

export default function Logout() {
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const allText= useLenguages();

    const handleLogOut = (e : React.MouseEvent < HTMLButtonElement >) => {
        e.preventDefault();
        signOut(auth);
        localStorage.clear()
        navigate('/')
    }

    return (
        <button onClick={
                (e) => handleLogOut(e)
            }
            className='text-secundary-500 font-Nunito text-md rounded-lg'>{allText.leng.navBar.logout}</button>
    )
}
