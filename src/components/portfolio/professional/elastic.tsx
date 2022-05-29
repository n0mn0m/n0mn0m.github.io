import React from 'react';
import ProjectItem from './item';

const ElasticProjects = () => {
  return (
    <ProjectItem
      orgName="Elastic"
      projectInfo={[
        {
          title: 'GCP Marketplace',
          description:
            'Integrate the Elastic Cloud offering with the GCP Marketplace so customers can create clusters from their GCP dashboard.',
          technologies: [
            'Python 3',
            'GCP',
            'PubSub',
            'Postgres',
            'Elasticsearch',
            'Docker',
            'docker-compose',
          ],
        },
        {
          title: 'Python 2 to 3 migrations',
          description:
            'Started the migration of the Python 2 billing system to Python 3',
          technologies: ['Python 2 &amp; 3', 'Tornado', 'Docker', 'pytest'],
        },
      ]}
    />
  );
};

export default ElasticProjects;
