import React from 'react';
import ProjectItem from './item';

const FlockProjects = () => {
  return (
    <ProjectItem
      orgName="FlockSafety"
      projectInfo={[
        {
          title: 'Annotation Platform',
          description:
            'Design and develop tools for annotating and managing multimedia ML datasets.',
          technologies: [
            'Python',
            'Django',
            'TypeScript',
            'React',
            'Postgres',
            'DoltDB',
            'Kubernetes',
            'Docker',
            'Jenkins',
            'OAuth2',
            'REST',
            'AWS',
            'Auth0',
          ],
        },
      ]}
    />
  );
};

export default FlockProjects;
