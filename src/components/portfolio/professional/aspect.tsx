import React from 'react';
import ProjectItem from './item';

const AspectProjects = () => {
  return (
    <ProjectItem
      orgName="Aspect Software"
      projectInfo={[
        {
          title: 'PetSafe, Delta, Jet Blue',
          description:
            'Build out Microsoft SSIS/SSAS analytics infrastructure to support customer service call center operations.',
          technologies: [
            'C#',
            'SSIS',
            'SSAS',
            'SSRS',
            'SQL',
            'MDX',
            'SQL Server 2008',
            'Excel Power BI',
            'Powershell',
          ],
        },
        {
          title: 'Data Visualization',
          description:
            'Build out web-based data visualizations to support various application development teams focused on healthcare projects.',
          technologies: [
            'C#',
            'Razor Pages',
            'KendoUI',
            'JavaScript',
            'JQuery',
            'REST Apis',
            'SQL Server 2008',
          ],
        },
      ]}
    />
  );
};

export default AspectProjects;
