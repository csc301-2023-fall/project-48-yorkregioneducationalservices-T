import * as React from 'react';
import Footer from '../components/footer';
import Image from 'react-bootstrap/Image';
import options from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

/** 
 * Login Specific Page Layout
 * Props: 
        children - The login component with the required fields
}
**/
export default async function LoginLayout({ children }) {
    const session = await getServerSession(options);

    if (session) {
      redirect('/profiles')
    }

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