import React from 'react';
import Anchor from '../element/anchor';

const ResumeVolunteerOSSExperience = () => {
  return (
    <>
      <h1>Volunteer & Open-Source Experience</h1>
      <ul>
        <li>
          <Anchor
            anchorContent="aioodbc"
            href="https://aioodbc.readthedocs.io/en/latest/"
          />{' '}
          - configuration tuning documentation
        </li>
        <li>
          <Anchor
            anchorContent="Annotorious"
            href="https://recogito.github.io/annotorious/"
          />{' '}
          - docs and gitter chat help
        </li>
        <li>
          <Anchor
            anchorContent="Apache Arrow"
            href="https://arrow.apache.org/"
          />{' '}
          - setup.py and API documentation updates, Subpool implementation, and
          add has capabilities for scalar values in Python
        </li>
        <li>
          <Anchor
            anchorContent="Code Louisville"
            href="https://www.codelouisville.org/"
          />{' '}
          - taught a range of topics including Python, debugging, databases, and
          Django
        </li>
        <li>
          <Anchor
            anchorContent="Firefox Mobile"
            href="https://www.mozilla.org/en-US/firefox/browsers/mobile/"
          />{' '}
          - bug fix for incorrect axis locking
        </li>
        <li>
          <Anchor anchorContent="PyMSSQL" href="https://www.pymssql.org/" /> -
          mentor contributors, updated CI and platform builds, release manager
          for 2.1.4
        </li>
        <li>
          <Anchor
            anchorContent="wavesurfer.js"
            href="https://wavesurfer-js.org/"
          />{' '}
          - region plugin update for event broadcasting
        </li>
      </ul>
    </>
  );
};

export default ResumeVolunteerOSSExperience;
