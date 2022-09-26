import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

export default function Profile() {

    const {user} = useAuth0();
    console.log(user)
    return (<img src={
            user ?. picture
        }
        className='h-10 w-10 rounded-full'
        alt='asda'/>)
}
