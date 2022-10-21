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
import {useTranslation} from 'react-i18next'
import google from './google.svg'

export default function Login({usuario} : any) {
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(false);
    const [form, setForm] = useState({email: '', password: ''})
    const {t} = useTranslation();

    type FormElment = React.FormEvent < HTMLFormElement >;

    const navigate = useNavigate();

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


    const handleGoogleRedirect = (e : React.MouseEvent < HTMLButtonElement >) => {
        e.preventDefault();
        signInWithRedirect(auth, googleProvider);
        navigate('/')

    }


    return (
        <>
            <Navbar/>
            <div className=' forNow h-[90vh] flex justify-center items-center '>
                <form action="" className='border  bg-secundary rounded-lg  flex flex-col justify-around lg:h-[55%] lg:w-[30%] sm:w-[80%] sm:h-[50%]'
                    onSubmit={
                        event => submitForm(event)
                }>
                    <div className='flex justify-center'>
                        <h1 className=' font-Nunito text-2xl text-primary-500'>
                            {
                            user ? t('login.register') : t('navBar.login')
                        }</h1>
                    </div>
                    <div className='ml-8'>
                        <div className='flex flex-col '>
                            <label className='text-sm text-primary-100 font-PT'>
                                {
                                t('login.email')
                            }</label>
                            <input onChange={
                                    event => submitHandler(event)
                                }
                                className='bg-primary-0  w-[80%] border-secundary-100 text-primary-100 border-b-2 placeholder:text-xs mt-1'
                                type='email'
                                placeholder='Enter email'
                                name='email'/>
                        </div>
                        <div className='flex flex-col w-full mt-4'>
                            <label className='text-sm text-primary-100 font-PT '>
                                {
                                t('login.password')
                            }</label>
                            <input className=' bg-primary-0  w-[80%] border-secundary-100 text-primary-100 border-b-2 placeholder:text-xs mt-1' type='password' name='password'
                                onChange={
                                    event => submitHandler(event)
                                }
                                placeholder='Enter password'/>
                            <button className='  bg-secundary-50  rounded-md text-secundary w-max mt-4 px-3 py-1 flex items-center gap-2 lg:hover:bg-opacity-90 lg:hover:duration-300' type='submit'>
                                {
                                t('navBar.login')
                            } </button>
                        </div>
                        <div className='flex flex-col gap-3 mt-10'>

                            <button className=' rounded-md w-max font-PT px-1 py-[3px] flex items-center gap-2 text-primary-500 lg:hover:scale-105  duration-500 text-base'
                                onClick={
                                    (e) => handleGoogleRedirect(e)
                            }>
                                {
                                t('login.google')
                            }
                                <img src={google}/></button>
                            <button className=' rounded-md text-primary-100 w-max px-1 py-[3px]'
                                onClick={
                                    (e) => handleRegister(e)
                            }>
                                {
                                user ? <span className=' font-PT text-base'>
                                    {
                                    t('login.haveAccount')
                                }</span> : <span className=' font-PT text-base'>
                                    {
                                    t('login.haveNotAccount')
                                }</span>
                            }</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
