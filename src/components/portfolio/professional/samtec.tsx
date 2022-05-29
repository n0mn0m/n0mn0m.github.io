import React from 'react';
import ProjectItem from './item';

const SamtecProjects = () => {
  return (
    <ProjectItem
      orgName="Samtec"
      projectInfo={[
        {
          title: 'Asset Management System',
          description:
            'Build out an asset management platform to synchronize existing asset data and centralize the ongoing management of assets in one location.',
          technologies: [
            'C#',
            '.NET Core',
            'Typescript',
            'Angular 11',
            'REST APIs',
            'MongoDB',
            'AWS',
            'SQS',
            'SNS',
            'Fargate',
            'CloudFront',
            'S3',
            'Azure Pipelines',
            'Docker',
            'bash/PowerShell',
            'git',
          ],
        },
        {
          title: 'Asset Maintenance System',
          description:
            'Build an asset maintenance system to support global operations.',
          technologies: [
            'C#',
            '.NET Core',
            'Typescript',
            'Angular 11',
            'Quartz.NET',
            'REST APIs',
            'MongoDB',
            'AWS',
            'SQS',
            'SNS',
            'Fargate',
            'CloudFront',
            'S3',
            'Azure Pipelines',
            'Docker',
            'bash/PowerShell',
            'git',
          ],
        },
      ]}
    />
  );
};

export default SamtecProjects;
