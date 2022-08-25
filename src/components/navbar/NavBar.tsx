import React from 'react'
import Search from '../search/Search'
import './NavBar.scss'

export default function () {
  return (
    <nav className='nav__container'>
        <div>
           <h1>Movies app</h1> 
        </div>
        <div className='nav__container--items'>
        <ul className='nav__lista'>
         <li><a href="#">Home</a></li>  
         <li><a href="#">Movies</a></li>   
         <li><a href="#">Series</a></li>  
         <li><a href="#">Genres</a></li>  
        </ul>
        </div>
        <div>
            <Search/>
        </div>
    </nav>
  )
}
