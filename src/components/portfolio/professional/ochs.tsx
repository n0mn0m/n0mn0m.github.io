import React from 'react';
import ProjectItem from './item';

const OchsProjects = () => {
  return (
    <ProjectItem
      orgName="Owensboro Catholic High School"
      projectInfo={[
        {
          title: 'Printer Fleet Management',
          description:
            'Scripted out the install and management of printers across computer labs.',
          technologies: ['VB6', 'COM'],
        },
        {
          title: 'Active Directory Group Policy Management and Deployment',
          description:
            'Develop Active Directory group policies and role them out across school groups',
          technologies: ['Windows XP', 'Active Directory 2008'],
        },
      ]}
    />
  );
};

export default OchsProjects;
