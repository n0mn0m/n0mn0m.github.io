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
  faTerminal,
  faTools,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import Anchor from '../element/anchor';

const SocialBar = () => {
  return (
    <nav className="social-nav">
      <Anchor
        href="https://medium.com/@n0mn0m"
        className="social-link"
        style={{ color: 'hsl(0, 0%, 0%)' }}
        anchorContent={<FontAwesomeIcon icon={faMedium} />}
      />
      <Anchor
        href="https://github.com/n0mn0m"
        className="social-link"
        style={{ color: 'hsl(0, 0%, 0%)' }}
        anchorContent={<FontAwesomeIcon icon={faGithubAlt} />}
      />
      <Anchor
        href="https://www.behance.net/alexandhagerma1"
        className="social-link"
        style={{ color: 'hsl(0, 0%, 0%)' }}
        anchorContent={<FontAwesomeIcon icon={faBehanceSquare} />}
      />
      <Anchor
        href="https://www.goodreads.com/user/show/115806718-alexander"
        className="social-link"
        style={{ color: 'hsl(25, 48%, 23%)' }}
        anchorContent={<FontAwesomeIcon icon={faGoodreads} />}
      />
      <Anchor
        href="https://hackaday.io/n0mn0m"
        className="social-link"
        style={{ color: 'hsl(41, 47%, 54%)' }}
        anchorContent={<FontAwesomeIcon icon={faTools} />}
      />
      <Anchor
        href="https://www.thingiverse.com/n0mn0m/designs"
        className="social-link"
        style={{ color: 'hsl(211, 96%, 56%)' }}
        anchorContent={<FontAwesomeIcon icon={faCube} />}
      />
      <Anchor
        href="https://stackexchange.com/users/1598654/alexander?tab=accounts"
        className="social-link"
        style={{ color: 'hsl(213, 54%, 46%)', fontSize: '1.8rem' }}
        anchorContent={<FontAwesomeIcon icon={faStackExchange} />}
      />
      <Anchor
        href="https://en.gravatar.com/iin0mn0mii"
        className="social-link"
        style={{ color: 'hsl(222, 74%, 44%)' }}
        anchorContent={<FontAwesomeIcon icon={faUserAstronaut} />}
      />
      <Anchor
        href="https://exercism.org/profiles/n0mn0m"
        className="social-link"
        style={{ color: 'hsl(248, 55%, 55%)', fontSize: '1.8rem' }}
        anchorContent={<FontAwesomeIcon icon={faTerminal} />}
      />
    </nav>
  );
};

export default SocialBar;
