import React from 'react';
import MenuLayout from '@/app/(main-menu)/layout.jsx';

const NotFound = () => {
  return (
    <MenuLayout>
      <div className="notFound-container">
        <h1 className="notFound-heading">404</h1>
        <p className="notFound-text">
          Oops! Looks like the page you&#39;re looking for doesn&#39;t exist.
        </p>
        <p className="notFound-text">
          Go back to <a href="/" className="notFound-link">the login page</a>
        </p>
      </div>
    </MenuLayout>
  );
};

export default NotFound;