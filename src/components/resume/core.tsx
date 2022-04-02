import React from 'react';
import { Link } from 'react-router-dom';
import Anchor from '../element/anchor';
import ResumeItem from './item';
import '../../assets/resume.css';

const ResumeExperience = () => {
  return (
    <>
      <h1>Professional Experience</h1>
      <ol style={{ listStyleType: 'none' }}>
        <ResumeItem
          jobRole="ML Tooling Engineer"
          dateRange="06/2021 - Current"
          organization={
            <Anchor
              anchorContent="Flock Safety"
              href="https://www.flocksafety.com/"
            />
          }
          responsibilities={[
            <span key={1}>
              Lead the design and implementation of audio and image annotation
              tools.
            </span>,
            <span key={2}>
              Set up and maintain frontend build and testing tools.
            </span>,
            <span key={3}>
              Designed and implemented a data versioning tool to support
              annotation lineage and management.
            </span>,
            <span key={4}>
              Responsible for supporting and securing data interfaces allowing
              service to service, frontend and other ad hoc integrations.
            </span>,
            <span key={5}>
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

const ResumeEducation = () => {
  return (
    <>
      <h1>Education</h1>
      <p>
        08/2011 | Bachelor of Science in Computer Information Technologies |
        Western Kentucky University
      </p>
      <h1>Certificates</h1>
      <ul>
        <li>The Technology of Music Production (Coursera, January 2021)</li>
        <li>Developing your Musicianship (Coursera, December 2020)</li>
        <li>CSS for JavaScript Developers (Workshop, October 2020)</li>
        <li>
          UT.6.10x: Embedded Systems - Shape the World: Microcontroller
          Input/Output (edX, November 2019)
        </li>
        <li>
          Triplebyte Certified Generalist Software Engineer (Triplebyte August
          2019)
        </li>
        <li>Data Visualization (Dataquest.io April 2016)</li>
        <li>
          Data Analysis with Pandas: Intermediate Course (Dataquest.io September
          2015)
        </li>
        <li>MCSD: Web Applications (Microsoft, June 2014)</li>
        <li>
          Developing Microsoft Azure and Web Services (Microsoft, June 2014)
        </li>
        <li>
          Developing ASP.NET MVC 4 Web Applications (Microsoft, February 2013)
        </li>
        <li>
          Programming in HTML5, CSS#, JavaScript 70-480 (Microsoft, January
          2013)
        </li>
      </ul>
    </>
  );
};

const ResumeSkills = () => {
  return (
    <>
      <h1>Technical Skills & Competencies</h1>
      <p>
        Python, C#, TypeScript, Rust, .NET Core, Django, React, Angular, Bash,
        PowerShell, SQL, Postgres, Hadoop, Spark, Elasticsearch, RabbitMQ,
        <br />
        Netezza, MongoDB, CosmosDB, SQS, PubSub, S3, Azure Data Lake Storage Gen
        2, S3, HDFS, Apache Spark, XML, JSON, MDX, SSIS, SSAS,
        <br />
        SSRS, AWS, Azure, GCP, DataBricks, Azure Pipelines, Azure DevOps, Linux,
        Docker, Kubernetes, Fargate, Artifactory, Jenkins, Terraform, git,
        <br />
        Software Architecture, Software Testing, Pair Programming, CI/CD
      </p>
    </>
  );
};

const ResumeTalks = () => {
  return (
    <>
      <h1>Talks</h1>
      <ul>
        <li>
          <a href="https://github.com/DerbyPy/python_for_embedded_systems">
            Python for Embedded Hardware
          </a>
          (DerbyPy, Louisville, KY) - June 2019
        </li>
        <li>
          <a href="https://github.com/DerbyPy/what-is-odbc">What is ODBC</a>{' '}
          (DerbyPy, Louisville, KY) - March 2019
        </li>
        <li>
          <a href="https://github.com/DerbyPy/intro-to-pyspark">
            Intro to PySpark
          </a>{' '}
          (DerbyPy, Louisville, KY) - October 2018
        </li>
        <li>
          <a href="https://github.com/DerbyPy/modules-and-packages-intro">
            Python Modules and Packages
          </a>
          (DerbyPy, Louisville, KY) - September 2018
        </li>
        <li>Column Oriented Data (DerbyPy, Louisville, KY) - June 2018</li>
      </ul>
    </>
  );
};

const ResumeAwards = () => {
  return (
    <>
      <h1>Awards</h1>
      <ul>
        <li>Hackaday Connected World Contest Award - Connected Roomba</li>
        <li>2018 Humana Star Award - Data Engineering</li>
      </ul>
    </>
  );
};

const ResumeVolunteerOSSExperience = () => {
  return (
    <>
      <h1>Volunteer & Open-Source Experience</h1>
      <ul>
        <li>
          <Anchor
            anchorContent="aioodbc"
            href="https://aioodbc.readthedocs.io/en/latest/"
          />{' '}
          - configuration tuning documentation
        </li>
        <li>
          <Anchor
            anchorContent="Annotorious"
            href="https://recogito.github.io/annotorious/"
          />{' '}
          - docs and gitter chat help
        </li>
        <li>
          <Anchor
            anchorContent="Apache Arrow"
            href="https://arrow.apache.org/"
          />{' '}
          - setup.py and API documentation updates, Subpool implementation, and
          add has capabilities for scalar values in Python
        </li>
        <li>
          <Anchor
            anchorContent="Code Louisville"
            href="https://www.codelouisville.org/"
          />{' '}
          - taught a range of topics including Python, debugging, databases, and
          Django
        </li>
        <li>
          <Anchor
            anchorContent="Firefox Mobile"
            href="https://www.mozilla.org/en-US/firefox/browsers/mobile/"
          />{' '}
          - bug fix for incorrect axis locking
        </li>
        <li>
          <Anchor anchorContent="PyMSSQL" href="https://www.pymssql.org/" /> -
          mentor contributors, updated CI and platform builds, release manager
          for 2.1.4
        </li>
        <li>
          <Anchor
            anchorContent="wavesurfer.js"
            href="https://wavesurfer-js.org/"
          />{' '}
          - region plugin update for event broadcasting
        </li>
      </ul>
    </>
  );
};

const ResumeMemberships = () => {
  return (
    <>
      <h1>Memberships</h1>
      <ul>
        <li>
          <Anchor anchorContent="ACM" href="https://www.acm.org" />
        </li>
        <li>
          <Anchor
            anchorContent="Hardware Happy Hour Louisville"
            href="https://h3lou.org"
          />
        </li>
        <li>
          <Anchor anchorContent="DerbyPy" href="https://github.com/derbypy" />
        </li>
      </ul>
    </>
  );
};

const Resume = () => {
  return (
    <article style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Alexander Hagerman</h1>
      <div style={{ textAlign: 'center', padding: 0 }}>
        <a href="mailto:alexander@burningdaylight.io?subject=Resume">
          alexander@burningdaylight.io
        </a>
      </div>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Portfolios: <Link to="/portfolio">burningdaylight</Link>&nbsp;|&nbsp;
        <a
          href="https://github.com/n0mn0m"
          target="_blank"
          rel="noreferrer nofollow"
        >
          github
        </a>
      </div>
      <section style={{ textAlign: 'center' }}>
        <p>
          I am a software engineer with over a decade of experience. In that
          time I have worked across a variety of domains, stacks and teams
          building frontend web and mobile interfaces, distributed backend
          services while managing legacy systems. I enjoy working in
          environments that require continuous learning and collaboration to
          solve challenging problems. These days I prefer working on tools that
          empower individuals to create.
        </p>
      </section>
      <section>
        <ResumeExperience />
      </section>
      <section>
        <ResumeEducation />
      </section>
      <section>
        <ResumeAwards />
      </section>
      <section>
        <ResumeSkills />
      </section>
      <section>
        <ResumeTalks />
      </section>
      <section>
        <ResumeVolunteerOSSExperience />
      </section>
      <section>
        <ResumeMemberships />
      </section>
    </article>
  );
};

export default Resume;
