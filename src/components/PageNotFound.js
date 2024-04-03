import React from 'react';
import{ Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Page Not Found!</h4>
        <p>The page you are looking for does not exist.</p>
        <hr />
        <p className="mb-0">Please check the URL and try again.</p>
        <Link to="/" className="btn btn-primary mt-3">Return to Homepage</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
