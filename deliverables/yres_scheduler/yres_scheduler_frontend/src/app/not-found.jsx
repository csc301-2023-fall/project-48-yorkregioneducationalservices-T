import React from 'react';
import MenuLayout from '@/app/(main-menu)/layout.jsx';

const NotFound = () => {
  return (
    <MenuLayout children = {
    <div className="notFound-container">
      <h1 className="notFound-heading">404</h1>
      <p className="notFound-text">
        Oops! Looks like the page you're looking for doesn't exist.
      </p>
      <p className="notFound-text">
        Go back to <a href="/" className="notFound-link">the login page</a>
      </p>
    </div>
    } />
    
  );
};

export default NotFound;