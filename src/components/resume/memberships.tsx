import React from 'react';
import Anchor from '../element/anchor';

const ResumeMemberships = () => {
  return (
    <>
      <h1>Memberships</h1>
      <ul>
        <li>
          <Anchor anchorContent="ACM" href="https://www.acm.org" />
        </li>
        <li>
          <Anchor
            anchorContent="Hardware Happy Hour Louisville"
            href="https://h3lou.org"
          />
        </li>
        <li>
          <Anchor anchorContent="DerbyPy" href="https://github.com/derbypy" />
        </li>
      </ul>
    </>
  );
};

export default ResumeMemberships;
