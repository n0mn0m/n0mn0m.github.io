import { faCreativeCommonsZero } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Home from './frame/home';

const Copyright = () => {
  return (
    <>
      <Home />
      <section style={{ textAlign: 'center' }}>
        <h1>Welcome to burningdaylight.io</h1>
        <p>
          This is my little space on the web that I like to use to tinker with
          various tools. The site is currently on it's 5th incarnation and a
          continual work in progress.
        </p>
      </section>
      <section style={{ textAlign: 'center' }}>
        <p>Copyright Alexander Hagerman 2022</p>
        <div>
          Site Content/Posts
          <a href="https://creativecommons.org/publicdomain/zero/1.0/">
            {' '}
            Creative Commons CC0 1.0{' '}
          </a>
          <FontAwesomeIcon icon={faCreativeCommonsZero} />
        </div>
        <div>
          Site Code
          <a href="https://opensource.org/licenses/0BSD"> Zero Clause BSD</a>
        </div>
      </section>
    </>
  );
};

export default Copyright;
