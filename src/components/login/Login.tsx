import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

export default function Login() {

const {loginWithRedirect}= useAuth0()
const {user, isAuthenticated}= useAuth0()

  return (
    <button onClick={()=>loginWithRedirect()} className='text-secundary
     font-Nunito text-2xl border border-secundary-50 px-3 rounded-lg'>login</button>
    )
}
