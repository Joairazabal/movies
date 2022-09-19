import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

export default function Logout() {

const {logout}=useAuth0();
    
  return (
    <button onClick={()=>logout({ returnTo: 'http://localhost:3000/' })} className='text-secundary font-Nunito text-2xl border border-secundary-50 px-3 rounded-lg'>Logout</button>
  )
}
