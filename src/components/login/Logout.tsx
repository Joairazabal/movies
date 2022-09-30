import React from 'react'
import firebaseApp from '../../fireBase'
import {signOut, getAuth} from 'firebase/auth'

export default function Logout() {

    const auth = getAuth(firebaseApp);


    return (
        <button onClick={
                () => signOut(auth)
            }
            className='text-secundary-500 font-Nunito text-md rounded-lg'>Log out</button>
    )
}
