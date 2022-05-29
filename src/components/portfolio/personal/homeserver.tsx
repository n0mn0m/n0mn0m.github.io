import React from 'react';
import ProjectItem from './item';

const HomeServerProject = () => {
  return (
    <ProjectItem
      projectName="Self Hosted Home Server"
      projectInfo={[
        {
          description:
            'A home server used to run my website, git repos, build pipelines and more.',
          technologies: [
            'Docker',
            'docker-compose',
            'traefik2',
            'Minio',
            'Postgres',
            'bash',
            'TeamCity',
            'nginx',
          ],
        },
      ]}
    />
  );
};

export default HomeServerProject;
