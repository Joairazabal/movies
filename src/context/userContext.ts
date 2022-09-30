import {createContext} from 'react'
const UserContext= createContext({
    uid:'',
    displayName:'',
    email:'',
    photoURL: '',
    accessToken: ''

})

export default UserContext