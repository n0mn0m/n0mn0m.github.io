import React from 'react';
import ResumeItem from './item';
import Anchor from '../element/anchor';

const ResumeExperience = () => {
  return (
    <>
      <h1>Professional Experience</h1>
      <ol style={{ listStyleType: 'none' }}>
        <ResumeItem
          jobRole="Lead ML Tooling Engineer"
          dateRange="06/2021 - Current"
          organization={
            <Anchor
              anchorContent="Flock Safety"
              href="https://www.flocksafety.com/"
            />
          }
          responsibilities={[
            <span key={0}>
              Designed and implemented audio and object tracking annotation
              tools.
            </span>,
            <span key={1}>
              Responsible for identifying candidates to grow the team,
              onboarding and training new engineers, and managing the team's
              technical roadmap.
            </span>,
            <span key={2}>
              Lead the designed and implementation of image annotation tools.
            </span>,
            <span key={3}>
              Set up and maintain frontend build and testing tools.
            </span>,
            <span key={4}>
              Designed and implemented a data versioning tool to support
              annotation lineage and management.
            </span>,
            <span key={5}>
              Lead the design and implementation of an annotation campaign
              process to streamline the collection and validation of data across
              tools.
            </span>,
            <span key={6}>
              Responsible for supporting and securing data interfaces allowing
              service to service, frontend and other ad hoc integrations.
            </span>,
            <span key={7}>
              Mentor other engineers and collaborate across teams for new
              product features.
            </span>,
          ]}
        />
        <ResumeItem
          jobRole="Software Engineer"
          dateRange="02/2021 - 05/2021"
          organization={
            <Anchor anchorContent="RENCI" href="https://renci.org/" />
          }
          responsibilities={[
            <span key={1}>
              Working to develop the{' '}
              <a
                href="https://github.com/helxplatform"
                target="_blank"
                rel="noreferrer nofollow"
              >
                HeLx Platform
              </a>{' '}
              to support NIH HEAL research.
            </span>,
            <span key={2}>
              Refactor HeLx platform Django application to surface data via REST
              endpoints.
            </span>,
            <span key={3}>
              Collaborated on a new react based frontend for the HeLx Appstore.
            </span>,
            <span key={4}>
              Instrument Kubernetes pod utilization and surface data through
              service endpoints.
            </span>,
            <span key={5}>
              Refactor application packaging and update continuous integration
              practices.
            </span>,
          ]}
        />
        <ResumeItem
          jobRole="Lead Software Engineer"
          dateRange="06/2020 - 02/2021"
          organization={
            <Anchor anchorContent="Samtec" href="https://www.samtec.com/" />
          }
          responsibilities={[
            <span key={1}>
              Lead/manage the development of new asset management system to
              synchronize asset data and streamline existing assets.
            </span>,
            <span key={2}>
              Created an improved asset maintenance system to support global
              operations.
            </span>,
            <span key={3}>
              Collaborate with engineers and internal stakeholders to execute
              feature implementations and process improvement.
            </span>,
            <span key={4}>
              Provide key insights for organizational planning on long-term data
              management and optimization.
            </span>,
            <span key={5}>
              Showcase leadership by mentoring, coaching, and training engineers
              in new practices/tools/technology.
            </span>,
            <span key={6}>
              Develop and oversee continuous integration and deployment
              infrastructure to increase overall productivity.
            </span>,
          ]}
        />
        <ResumeItem
          jobRole="Senior Software Engineer"
          dateRange="08/2019 - 06/2020; 07-2015 - 03/2019"
          organization={
            <Anchor anchorContent="Humana" href="https://www.humana.com/" />
          }
          responsibilities={[
            <span key={1}>
              Spearheaded the creation of a provider fax routing system by
              building out OCR as a service for patient record documents.
            </span>,
            <span key={2}>
              Facilitated the implementation of middleware layer/rule management
              for company Sytrue initiatives.
            </span>,
            <span key={3}>
              Setup, deployed, and managed first real time NLP services on Azure
              to strengthen job progression and computer capabilities.
            </span>,
            <span key={4}>
              Collaborated on breast cancer research project by utilizing NLP to
              research stage information based on diagnosis markers.
            </span>,
            <span key={5}>
              Increased Doctor Patient Note OCR post processing data throughput
              by migrating localized python services to pyspark.
            </span>,
            <span key={6}>
              Monitored potential fraud rule detection by processing provider
              documentation a set of NLP rules.
            </span>,
            <span key={7}>
              Built/managed a library of queries and reports to assist fraud
              investigators.
            </span>,
            <span key={8}>
              Assisted NLP development team in the transition to Agile
              methodologies through change management and team leadership
              skills.
            </span>,
            <span key={9}>
              Foster continuous process improvement by implementing Azure
              identity service (MSAL/AAD) into C# and Python services.
            </span>,
            <span key={10}>
              Develop prem to Azure Databricks deployment service, ADLS
              Generation 2 C# library, and CLI.
            </span>,
            <span key={11}>
              Served as architect and senior developer of the Retail Data
              Science Research and Development platform.
            </span>,
            <span key={12}>
              Introduced and streamlined multiple software development practices
              like version control, continuous integration/deployment, code
              review, and dependency management.
            </span>,
          ]}
        />
        <ResumeItem
          jobRole="Senior Software Engineer"
          dateRange="04/2019 - 08/2019"
          organization={
            <Anchor anchorContent="Elastic" href="https://www.elastic.co/" />
          }
          responsibilities={[
            <span key={1}>
              Partnered with cross-functional teams to develop end-to-end
              testing framework for customer journey through GCP marketplace to
              Elastic.
            </span>,
            <span key={2}>
              Provided value-added contributions in the migration of backend
              services from Python 2 to Python 3.7.
            </span>,
            <span key={3}>
              Applied expansion efforts and process improvements in automated
              testing practices for Python 2 and 3 code bases.
            </span>,
            <span key={4}>
              Built a tool that enabled data migration from Elasticsearch to
              Postgres.
            </span>,
            <span key={5}>
              Formulated the billing integration service for Elastic stack and
              Google Cloud Platform Marketplace.
            </span>,
            <span key={6}>
              Delivered troubleshooting and production incident response for
              billing services and clusters.
            </span>,
          ]}
        />
        <ResumeItem
          jobRole="Senior Analytic Consultant | Analytic Consultant | Developer"
          dateRange="01/2012 - 07/2015"
          organization={
            <Anchor anchorContent="Aspect" href="https://www.alvaria.com/" />
          }
          responsibilities={[
            <span key={1}>
              Built out Microsoft SSIS/SSAS analytics infrastructure to support
              customer service call center operations for PetSafe, Delta, and
              Jet Blue.
            </span>,
            <span key={2}>
              Created enhanced web-based data visualizations to facilitate
              cross-functional application development teams on healthcare
              projects.
            </span>,
            <span key={3}>
              Delivered on-site consulting and guidance to clients by evaluating
              call center analytic needs.
            </span>,
            <span key={4}>
              Developed new productivity KPIs for call center clients via
              Microsoft BI stack to transform overall day-to-day operations and
              facilitate process improvement.
            </span>,
            <span key={5}>
              Headed client training programs on business intelligence
              tools/concepts to assist in future BI projects and process
              improvement identification.
            </span>,
            <span key={6}>
              Served as developer on SharePoint 2013 C# Applications, C# MVP
              Applications, and custom C# CLI applications to handle token
              management.
            </span>,
          ]}
        />
        <ResumeItem
          jobRole="Junior Developer"
          dateRange="03/2012 - 11/2012"
          organization={
            <Anchor
              anchorContent="All Safe Industries"
              href="https://www.allsafeindustries.com/"
            />
          }
          responsibilities={[
            <span key={1}>
              Built a product catalog ETL to consolidate product data into a
              single CMS.
            </span>,
            <span key={2}>
              Analyzed historical sales trends to improve decision making for
              web store strategies.
            </span>,
          ]}
        />
        <ResumeItem
          jobRole="Intern"
          dateRange="01/2011 - 05/2011"
          organization={
            <Anchor
              anchorContent="Owensboro Catholic High School"
              href="https://owensborocatholic.org/schools/ochs/"
            />
          }
          responsibilities={[
            <span key={1}>
              Developed VB6 scripts for printer fleet management by scripting
              out the install/management for printers across all computer labs.
            </span>,
            <span key={2}>
              Administered active directory group policy/deployment by
              developing policies and implementing across all school groups.
            </span>,
          ]}
        />
      </ol>
    </>
  );
};

export default ResumeExperience;
