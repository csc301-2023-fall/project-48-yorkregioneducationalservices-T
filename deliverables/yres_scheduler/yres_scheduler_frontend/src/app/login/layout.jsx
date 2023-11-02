import * as React from 'react';
import Footer from '../components/footer';
import Image from 'react-bootstrap/Image';

// Login Specific Page Layout
export default function LoginLayout({ children }) {
    return (
      <div id='menu-layout'>
        <div id='login-header' className='nav-header'>
          <Image
            className='header-logo'
            src='YRESLOGONEW.webp'
            alt='YRES Logo'
          />
          <div className='login-title'>
            YRES Scheduling Tool
          </div>
        </div>
        <div id='app-content' className='center-align'>
            {children}
        </div>
        <Footer/>
      </div>
    )
}