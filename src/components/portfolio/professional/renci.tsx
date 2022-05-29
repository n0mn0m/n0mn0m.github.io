import React from 'react';
import ProjectItem from './item';

const RenciProjects = () => {
  return (
    <ProjectItem
      orgName="RENCI"
      projectInfo={[
        {
          title: 'HeLx',
          description:
            'HeLx is a digital home for data science communities. RENCI leverages HeLx to empower plant genomics, biomedical, clinical, and neuroscience researchers to do work with their tools, close to the data, in the cloud, at scale:',
          technologies: [
            'Python',
            'React',
            'bash',
            'Kubernetes',
            'Docker',
            'Jenkins',
            'OIDC',
            'REST',
          ],
        },
      ]}
    />
  );
};

export default RenciProjects;
