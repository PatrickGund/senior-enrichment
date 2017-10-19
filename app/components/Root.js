import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Root = ({ children }) => (
  <div id="main" className="container-fluid">
    <Navbar />
    { children ? children: <div/> }
    <Footer />
  </div>
);

export default Root;
