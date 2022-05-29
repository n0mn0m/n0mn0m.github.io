import React from 'react';

interface PrProps {
  title: string;
  url: string;
}

interface ProjectProps {
  description: string;
  prs: PrProps[];
}

interface ProjectItemProps {
  projectName: string;
  projectInfo: ProjectProps[];
}

const createSummary = (projectInfo: ProjectProps[]) => {
  return projectInfo.map((project) => (
    <>
      <p>
        <strong>Summary</strong>
      </p>
      <p>{project.description}</p>
      <p>
        <strong>PR</strong>
      </p>
      <p>
        {project.prs.map((pr) => (
          <div key={Math.random()}>
            <a href={pr.url}>{pr.title}</a>
          </div>
        ))}
      </p>
    </>
  ));
};

const ProjectItem = ({ projectName, projectInfo }: ProjectItemProps) => {
  return (
    <>
      <h3>{projectName}</h3>
      <ol>{createSummary(projectInfo)}</ol>
    </>
  );
};

export default ProjectItem;
