import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="app-footer">
      &copy; Alexander Hagerman 2020, more details are{' '}
      <Link to="/copyright">available</Link>.
    </footer>
  );
};

export default Footer;
