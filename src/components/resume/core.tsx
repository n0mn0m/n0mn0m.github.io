import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/resume.css';
import ResumeExperience from './experience';
import ResumeEducation from './education';
import ResumeAwards from './awards';
import ResumeSkills from './skills';
import ResumeTalks from './talks';
import ResumeVolunteerOSSExperience from './oss';
import ResumeMemberships from './memberships';

const Resume = () => {
  return (
    <article style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Alexander Hagerman</h1>
      <div style={{ textAlign: 'center', padding: 0 }}>
        <a href="mailto:alexander@burningdaylight.io?subject=Resume">
          alexander@burningdaylight.io
        </a>
      </div>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Portfolios: <Link to="/portfolio">burningdaylight</Link>&nbsp;|&nbsp;
        <a
          href="https://github.com/n0mn0m"
          target="_blank"
          rel="noreferrer nofollow"
        >
          github
        </a>
      </div>
      <section style={{ textAlign: 'center' }}>
        <p>
          I am a software engineer with over a decade of experience. In that
          time I have worked across a variety of domains, stacks and teams
          building frontend web and mobile interfaces, distributed backend
          services while managing legacy systems. I enjoy working in
          environments that require continuous learning and collaboration to
          solve challenging problems. These days I prefer working on tools that
          empower individuals to create.
        </p>
      </section>
      <section>
        <ResumeExperience />
      </section>
      <section>
        <ResumeEducation />
      </section>
      <section>
        <ResumeAwards />
      </section>
      <section>
        <ResumeSkills />
      </section>
      <section>
        <ResumeTalks />
      </section>
      <section>
        <ResumeVolunteerOSSExperience />
      </section>
      <section>
        <ResumeMemberships />
      </section>
    </article>
  );
};

export default Resume;
