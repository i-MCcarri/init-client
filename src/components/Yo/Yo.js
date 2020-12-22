import React, { Fragment } from 'react';
import logo from '../../Images/logo.png';

function Yo() {
    /*This component renders the logo and the about page*/
    return (
        <Fragment className='landing-page-container'>
            <div className='logo-wrapper'>
                <img className='main-logo' src={logo} alt='a bee landing on a honeycomb' />
            </div>
            <div className='desc-wrapper'>
                <p>
                    Hello, programmer. Welcome to init, a social media site for developers to post demos, connect, and collab over their work. 
                </p>
            </div>
        </Fragment>

    );
};

export default Yo;
