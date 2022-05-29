import React from 'react';
import ProjectItem from './item';

const RingsProject = () => {
  return (
    <ProjectItem
      projectName="Rings"
      projectInfo={[
        {
          description:
            'A react app that can take an image and transform it into various patterns using paper.js',
          technologies: ['TypeScript', 'React', 'Paper.js'],
        },
      ]}
    />
  );
};

export default RingsProject;
