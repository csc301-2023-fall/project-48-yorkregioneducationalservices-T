import * as React from 'react';
import Footer from '../components/footer';
import Image from 'react-bootstrap/Image';
import LoginForm from '../components/loginForm';

const LoginHeader = () => {
  return (
    <div className='nav-header'>
      <Image
        className='login-logo'
        src='YRESLOGONEW.webp'
        alt='YRES Logo'
        fluid
      />
      <div className='login-title'>
        YRES Scheduling Tool
      </div>
    </div>
  )
}

export default function Login() {
    return (
      <div id='menu-layout'>
        <LoginHeader/>
        <div id='app-content'>
            <LoginForm/>
        </div>
        <Footer/>
      </div>
    )
}