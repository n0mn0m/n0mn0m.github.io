import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Link to="/" style={{ padding: 5, paddingTop: 10, textAlign: 'center' }}>
      Home
    </Link>
  );
};

export default Home;
