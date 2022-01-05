import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBehanceSquare,
  faGithubAlt,
  faGoodreads,
  faMedium,
  faStackExchange,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCube,
  faTools,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';

const SocialBar = () => {
  return (
    <nav className="social-nav">
      <a
        href="https://medium.com/@n0mn0m"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link"
        style={{ color: 'hsl(0, 0%, 0%)' }}
      >
        <FontAwesomeIcon icon={faMedium} />
      </a>
      <a
        href="https://github.com/n0mn0m"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link"
        style={{ color: 'hsl(0, 0%, 0%)' }}
      >
        <FontAwesomeIcon icon={faGithubAlt} />
      </a>
      <a
        href="https://www.behance.net/alexandhagerma1"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link"
        style={{ color: 'hsl(0, 0%, 0%)' }}
      >
        <FontAwesomeIcon icon={faBehanceSquare} />
      </a>
      <a
        href="https://www.goodreads.com/user/show/115806718-alexander"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link"
        style={{ color: 'hsl(25, 48%, 23%)' }}
      >
        <FontAwesomeIcon icon={faGoodreads} />
      </a>
      <a
        href="https://hackaday.io/n0mn0m"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link hackaday-icon"
        style={{ color: 'hsl(41, 47%, 54%)' }}
      >
        <FontAwesomeIcon icon={faTools} />
      </a>
      <a
        href="https://stackexchange.com/users/1598654/alexander?tab=accounts"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link stackexchange-icon"
        style={{ color: 'hsl(213, 54%, 46%)', fontSize: '1.8rem' }}
      >
        <FontAwesomeIcon icon={faStackExchange} />
      </a>
      <a
        href="https://www.thingiverse.com/n0mn0m/designs"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link thingiverse-icon"
        style={{ color: 'hsl(211, 96%, 56%)' }}
      >
        <FontAwesomeIcon icon={faCube} />
      </a>
      <a
        href="https://en.gravatar.com/iin0mn0mii"
        target="_blank"
        rel="noreferrer nofollow"
        className="social-link gravatar-icon"
        style={{ color: 'hsl(222, 74%, 44%)' }}
      >
        <FontAwesomeIcon icon={faUserAstronaut} />
      </a>
    </nav>
  );
};

export default SocialBar;
