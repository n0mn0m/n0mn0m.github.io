import React from 'react';
import ProjectItem from './item';

const AllSafeProjects = () => {
  return (
    <ProjectItem
      orgName="All Safe Industries"
      projectInfo={[
        {
          title: 'Product Catalog ETL',
          description:
            'Built an application to consolidate various sources of product data into our web CMS.',
          technologies: ['C#', '.NET Framework 3', 'Razor Pages', 'REST'],
        },
      ]}
    />
  );
};

export default AllSafeProjects;
