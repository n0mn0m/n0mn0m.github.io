import React from 'react';
import ProjectItem from './item';

const HumanaProjects = () => {
  return (
    <ProjectItem
      orgName="Humana"
      projectInfo={[
        {
          title: 'Provider Fax Routing System',
          description:
            'Build out OCR as a service for provider patient record fax documents',
          technologies: [
            'Python 3',
            'REST',
            'Tesseract',
            'Jupyter',
            'Docker',
            'docker-compose',
            'Azure Dev Ops',
            'Azure Pipelines',
            'Azure Functions',
            'Azure Queues',
            'Azure Blob Storage',
            'CosmosDB Artifactory',
            'git',
            'bash',
          ],
        },
        {
          title: 'Sytrue Middleware',
          description:
            'Support a middleware layer and rule management for Humana Sytrue initiatives',
          technologies: [
            'Python 3',
            'Django',
            'REST',
            'Jupyter',
            'NLP',
            'Docker',
            'docker-compose',
            'Azure Dev Ops',
            'Azure Pipelines',
            'Azure Blob Storage',
            'Azure Datalake Storage Gen 2',
            'SQL Server',
            'Databricks',
            'Apache Spark',
            'Artifactory',
            'git',
          ],
        },
        {
          title: 'Breast Cancer Research Project',
          description:
            'Research using NLP to assist in the understanding of stage information based on diagnosis markers.',
          technologies: ['Python 3', 'PySpark', 'NLP', 'SQL', 'HDFS', 'bash'],
        },
        {
          title: 'Doctor Patient Note OCR',
          description:
            'Increase OCR post processing data throughput by migrating localized python services to PySpark.',
          technologies: [
            'Python 3',
            'PySpark',
            'SQL',
            'XML',
            'HDFS',
            'flask',
            'REST',
            'bash',
          ],
        },
        {
          title: 'Potential Fraud Rule Detection',
          description:
            'Process provider documentation against a set of NLP rules to flag the need for provider rule setup.',
          technologies: [
            'Python 2',
            'SQL',
            'Red Hat Enterprise Linux (RHEL)',
            'Netezza',
            'SQL Server',
          ],
        },
        {
          title: 'Fraud Rule Evaluator',
          description: 'Evaluate the effectiveness of provider review rules.',
          technologies: ['Python 3', 'SQL', 'SQL Server'],
        },
        {
          title: 'SUI Investigator Reports',
          description:
            'Build out a library of queries and reports to assist fraud.',
          technologies: [
            'C#',
            'SSIS',
            'SQL',
            'SQL Server',
            'Excel',
            'QuickLogic',
          ],
        },
      ]}
    />
  );
};

export default HumanaProjects;
