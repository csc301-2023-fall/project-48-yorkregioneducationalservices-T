import * as React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

/**
 * Template for layout of pages with Header and Footer
 **/
export default function MenuLayout({ children }) {
    return (
      <div id='menu-layout'>
        <Header/>
        <div id='app-content'>
            {children}
        </div>
        <Footer/>
      </div>
    )
}