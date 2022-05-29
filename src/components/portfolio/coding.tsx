import React, { MutableRefObject, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProfessionalProjects from './professional/projects';
import PersonalProjects from './personal/projects';
import OpenSourceProjects from './open source/projects';

const CodingPortfolio = () => {
  const professionalRef = useRef(null);
  const personalRef = useRef(null);
  const ossRef = useRef(null);

  const handleBackClick = (targetRef: MutableRefObject<HTMLElement | null>) => {
    if (targetRef !== null && targetRef.current !== null) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>
        Programming Projects & Contributions
      </h1>
      <ul style={{ textAlign: 'center', listStyle: 'none' }}>
        <li>
          <Link
            to="#professional"
            onClick={() => handleBackClick(professionalRef)}
          >
            Professional
          </Link>
        </li>
        <li>
          <Link to="#personal" onClick={() => handleBackClick(personalRef)}>
            Personal
          </Link>
        </li>
        <li>
          <Link to="#oss" onClick={() => handleBackClick(ossRef)}>
            Open Source
          </Link>
        </li>
      </ul>
      <h2 id="professional" ref={professionalRef}>
        Professional
      </h2>
      <ProfessionalProjects />
      <h2 id="personal" ref={personalRef}>
        Personal
      </h2>
      <PersonalProjects />
      <h2 id="oss" ref={ossRef}>
        Open Source Contributions
      </h2>
      <OpenSourceProjects />
    </article>
  );
};

export default CodingPortfolio;
