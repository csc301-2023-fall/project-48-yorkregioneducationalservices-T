import * as React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import options from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

/**
 * Template for layout of pages with Header and Footer
 **/
export default async function MenuLayout({ children }) {
    const session = await getServerSession(options);
    return (
      <div id='menu-layout'>
        <Header user={session ? session.user : 'Admin'}/>
        <div id='app-content'>
            {children}
        </div>
        <Footer/>
      </div>
    )
}