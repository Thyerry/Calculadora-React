import React from 'react'
import './Main.css'
import Header from './Header'

export default props =>
    <React.Fragment>
        <Header {...props}/>
        <main className="content">
            <div className="p-3 m-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>