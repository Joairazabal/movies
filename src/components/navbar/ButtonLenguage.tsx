import React, {useState} from 'react'
import {useTranslation} from 'react-i18next';
import us from './us.png'
import spanish from'./spanish.png'

export default function ButtonLenguage() {

    const {t, i18n} = useTranslation();
    const leng = localStorage.getItem('lng')

    const handleChangeLng = (e : React.MouseEvent < HTMLButtonElement >) => {
        if (leng === 'en') {
            i18n.changeLanguage('es');
            localStorage.setItem("lng", 'es');
            window.location.reload()
        } else {
            i18n.changeLanguage('en');
            localStorage.setItem("lng", 'en');
            window.location.reload()
        }
    };


    return (
        <>
            <button onClick={
                e => handleChangeLng(e)
            }><img src={leng === 'es'? us:spanish} className='h-5 w-8 rounded-sm'/></button>
        </>
    )
}
