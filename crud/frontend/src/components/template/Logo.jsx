import React from 'react'
import './Logo.css'
import logo from '../../assets/logo2.png'

export default props =>
    <aside className="logo">
        <a href="/" className="logo">
            <img src={logo} alt="Logo" />
        </a>
    </aside>