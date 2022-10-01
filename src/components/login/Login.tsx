import React, {ChangeEvent, useState} from 'react'
import firebaseApp from '../../fireBase'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect
} from 'firebase/auth'
import {RiGoogleFill} from 'react-icons/ri'
import {useNavigate} from 'react-router-dom'
import Navbar from '../navbar/NavBar'

export default function Login({usuario} : any) {
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(false);
    const [form, setForm] = useState({email: '', password: ''})
    
    type FormElment = React.FormEvent < HTMLFormElement >;
    
    const navigate= useNavigate();

    const handleRegister = (e : any) => {
        e.preventDefault();
        !user ? setUser(true) : setUser(false)

    }

    const submitHandler = (event : ChangeEvent < HTMLInputElement >) => {
        event.preventDefault();
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value
        })

    }

    async function submitForm(event : FormElment) {
        event.preventDefault();
        if (user) {
            const usuario = await createUserWithEmailAndPassword(auth, form.email, form.password)
            navigate('/')
        } else {
            signInWithEmailAndPassword(auth, form.email, form.password)
            navigate('/')
        }
    }


    const handleGoogleRedirect=(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    signInWithRedirect(auth, googleProvider);
    navigate('/')

    }

    return (
        <>
        <Navbar/>
        <div className=' forNow h-[90vh] flex justify-center items-center '>
            <form action="" className='border  border-secundary-50 rounded-lg  flex flex-col justify-around lg:h-[50%] lg:w-[30%] sm:w-[80%] sm:h-[50%]'
                onSubmit={
                    event => submitForm(event)
            }>
                <div className='flex justify-center'>
                    <h1 className=' font-Nunito text-2xl text-secundary-50'>
                        {
                        user ? 'Register' : 'Log in'
                    }</h1>
                </div>
                <div className='ml-8'>
                    <div className='flex flex-col '>
                        <label className='text-sm text-secundary font-PT'>Email address</label>
                        <input onChange={
                                event => submitHandler(event)
                            }
                            className=' bg-primary-0 rounded-md border text-secundary  border-primary placeholder:text-xs w-[80%] mt-1'
                            type='email'
                            placeholder='Enter email'
                            name='email'/>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <label className='text-sm text-secundary font-PT '>Password</label>
                        <input className=' bg-primary-0 rounded-md border w-[80%] border-primary text-secundary  placeholder:text-xs mt-1' type='password' name='password'
                            onChange={
                                event => submitHandler(event)
                            }
                            placeholder='Enter password'/>
                        <button className='border  bg-secundary-50  rounded-md text-secundary w-max mt-4 px-2 flex items-center gap-2' type='submit'>Log in
                        </button>
                    </div>
                    <div className='flex flex-col gap-3 mt-10'>

                        <button className='border  bg-secundary-50  rounded-md text-secundary w-max px-1 py-[3px] flex items-center gap-2'
                            onClick={
                                (e) => handleGoogleRedirect(e)
                        }>iniciar con google
                            <RiGoogleFill/></button>
                        <button className='border border-primary rounded-md text-secundary w-max px-1 py-[3px]'
                            onClick={
                                (e) => handleRegister(e)
                        }>
                            {
                            user ? 'ya tienetes cuenta? iniciar sesion' : 'aun no tienes cuenta? registrate'
                        }</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}
