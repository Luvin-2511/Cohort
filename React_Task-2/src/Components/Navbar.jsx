import React from 'react'
import Navbut from './Navbut'

const Navbar = () => {
    return (
        <div className='nav'>
            <h3>Horizon Courts</h3>
            <ul>
                <Navbut text='About us' />
                <Navbut text='Services' />
                <Navbut text='Coaches' />
                <Navbut text='Events' />
                <Navbut text='Contacts' />
            </ul>
            <div className="book">
                Book now
                <i class="ri-arrow-right-up-fill"></i>
            </div>
        </div>
    )
}

export default Navbar
