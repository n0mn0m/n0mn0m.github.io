import React, { MutableRefObject, useRef } from 'react';
import { Link } from 'react-router-dom';

const CodingPortfolio = () => {
  const professionalRef = useRef(null);
  const personalRef = useRef(null);
  const ossRef = useRef(null);

  const handleBackClick = (targetRef: MutableRefObject<HTMLElement | null>) => {
    if (targetRef !== null && targetRef.current !== null) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>
        Programming Projects & Contributions
      </h1>
      <ul style={{ textAlign: 'center', listStyle: 'none' }}>
        <li>
          <Link
            to="#professional"
            onClick={() => handleBackClick(professionalRef)}
          >
            Professional
          </Link>
        </li>
        <li>
          <Link to="#personal" onClick={() => handleBackClick(personalRef)}>
            Personal
          </Link>
        </li>
        <li>
          <Link to="#oss" onClick={() => handleBackClick(ossRef)}>
            Open Source
          </Link>
        </li>
      </ul>
      <h2 id="professional" ref={professionalRef}>
        Professional
      </h2>
      <h3>Flock Safety</h3>
      <ol>
        <li>Annotation Platform</li>
        <p>
          <strong>Summary</strong>
        </p>
        <p>
          Design and develop tools for annotating and managing ML model training
          datasets.
        </p>
        <p>
          <strong>Core Technology</strong>
        </p>
        <p>
          Python, Django, TypeScript, React, Postgres, DoltDB, Kubernetes,
          Docker, Jenkins, OAuth2, REST
        </p>
      </ol>
      <h3>RENCI</h3>
      <ol>
        <li>
          <a href="https://rencisystems.web.unc.edu/helx/">HeLx</a>
        </li>
        <p>
          <strong>Summary</strong>
        </p>
        <p>
          HeLx is a digital home for data science communities. RENCI leverages
          HeLx to empower plant genomics, biomedical, clinical, and neuroscience
          researchers to do work with their tools, close to the data, in the
          cloud, at scale:
        </p>
        <p>
          <strong>Core Technology</strong>
        </p>
        <p>Python, React, bash, Kubernetes, Docker, Jenkins, OIDC, REST</p>
      </ol>
      <h3>Samtec</h3>
      <ol>
        <li>
          <p>Asset Management System</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Build out an asset management platform to synchronize existing asset
            data and centralize the ongoing management of assets in one
            location.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            C# 8, .NET Core, Typescript, Angular 11, REST APIs, MongoDB, SQL
            Server, AWS, SQS, SNS, Fargate, CloudFront, S3, Azure Pipelines,
            Docker, bash/PowerShell, git
          </p>
        </li>
        <li>
          <p>Asset Maintenance System</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>Build an asset maintenance system to support global operations.</p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            C#, .NET Core, Typescript, Angular 11, Quartz.NET, REST APIs,
            MongoDB, AWS, SQS, SNS, Fargate, CloudFront, S3, Azure Pipelines,
            Docker, bash/PowerShell, git
          </p>
        </li>
      </ol>
      <h3>Humana</h3>
      <ol>
        <li>
          <p>Provider Fax Routing System</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Build out OCR as a service for provider patient record fax documents
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            Python 3, REST, Tesseract, Jupyter, Docker, docker-compose, Azure
            Dev Ops, Azure Pipelines, Azure Functions, Azure Queues, Azure Blob
            Storage, CosmosDB Artifactory, git, bash
          </p>
        </li>
        <li>
          <p>Sytrue Middleware</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Support a middleware layer and rule management for Humana Sytrue
            initiatives
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            Python 3, Django, REST, Jupyter, NLP, Docker, docker-compose, Azure
            Dev Ops, Azure Pipelines, Azure Blob Storage, Azure Datalake Storage
            Gen 2, SQL Server, Databricks, Apache Spark, Artifactory, git
          </p>
        </li>
        <li>
          <p>Sytrue Middleware</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Support a middleware layer and rule management for Humana Sytrue
            initiatives
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            Python 3, Django, REST, Jupyter, NLP, Docker, docker-compose, Azure
            Dev Ops, Azure Pipelines, Azure Blob Storage, Azure Datalake Storage
            Gen 2, SQL Server, Databricks, Apache Spark, Artifactory, git
          </p>
        </li>
        <li>
          <p>Breast Cancer Research Project</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Research using NLP to assist in the understanding of stage
            information based on diagnosis markers.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>Python 3, PySpark, NLP, SQL, HDFS, bash</p>
        </li>
        <li>
          <p>Doctor Patient Note OCR</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Increase OCR post processing data throughput by migrating localized
            python services to pyspark.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>Python 3, PySpark, SQL, XML, HDFS, Flask, REST, bash</p>
        </li>
        <li>
          <p>Potential Fraud Rule Detection</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Process provider documentation against a set of NLP rules to flag
            the need for provider rule setup.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>Python 2, SQL, Red Hat Linux, Netezza, SQL Server</p>
        </li>
        <li>
          <p>Fraud Rule Evaluation</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>Evaluate the effectiveness of provider review rules.</p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>Python 3, SQL, SQL Server</p>
        </li>
        <li>
          <p>SIU Investigator Reports</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Build out a library of queries and reports to assist fraud
            investigators.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>C#, SSIS, SQL, SQL Server, Excel, QuickLogic</p>
        </li>
      </ol>
      <h3>Elastic</h3>
      <ol>
        <li>
          <p>GCP Marketplace</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Integrate the Elastic Cloud offering with the GCP Marketplace so
            customers can create clusters from their GCP dashboard.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            Python 3, GCP, PubSub, Postgres, Elasticsearch, Docker,
            docker-compose
          </p>
        </li>
        <li>
          <p>Python 2 to 3 migration</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Started the migration of the Python 2 billing system to Python 3
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>Python 2 &amp; 3, Tornado, Docker, pytest</p>
        </li>
      </ol>
      <h3>Aspect Software</h3>
      <ol>
        <li>
          <p>PetSafe, Delta, Jet Blue</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Build out Microsoft SSIS/SSAS analytics infrastructure to support
            customer service call center operations.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            C#, SSIS, SSAS, SSRS, SQL, MDX, SQL Server 2008, Excel Power BI,
            Powershell
          </p>
        </li>
        <li>
          <p>Data Visualization</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Build out web-based data visualizations to support various
            application development teams focused on healthcare projects.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            C#, .NET Framework 3.5, Razor Pages, KendoUI, JavaScript, JQuery,
            REST Apis SQL Server 2008
          </p>
        </li>
      </ol>
      <h3>All Safe Industries</h3>
      <ol>
        <li>
          <p>Product Catalog ETL</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Built an application to consolidate various sources of product data
            into our web CMS.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>C#, .NET Framework 3, Razor Pages, REST</p>
        </li>
      </ol>
      <h3>Owensboro Catholic High School</h3>
      <ol>
        <li>
          <p>Printer fleet management</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Scripted out the install and management of printers across computer
            labs.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>VB6, COM</p>
        </li>
        <li>
          <p>Active Directory Group Policy management and deployment</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Develop Active Directory group policies and role them out across
            school groups
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>Windows XP, Active Directory 2008</p>
        </li>
      </ol>
      <h2 id="personal" ref={personalRef}>
        Personal
      </h2>
      <ol>
        <li>
          <p>Circuit Roomba</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Setup SMS interaction with home roomba to be able to text commands
            the roomba would process and respond to.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>CircuitPython, SMS, Twilio, Raspberry Pi, LoRa</p>
        </li>
        <li>
          <p>On Air</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Trained an NLP model to run on an ESP32 responding to a wake word
            and command do toggle a status indicator display.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            C++, Tensorflow Lite, ESP-IDF, CircuitPython, Rust, SledDB, REST
            API, bash
          </p>
        </li>
        <li>
          <p>Rings</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            A react app that can take an image and transform it into various
            patterns using paper.js
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>TypeScript, React, Paper.js</p>
        </li>
        <li>
          <p>Valentine</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            A bluetooth sensor that changes board LED colors based on the count
            of devices in local proximity.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>CircuitPython, Bluetooth</p>
        </li>
        <li>
          <p>Self Hosted Home Server</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            A home server used to run my website, git repos, build pipelines and
            more.
          </p>
          <p>
            <strong>Core Technology</strong>
          </p>
          <p>
            Docker, docker-compose, traefik2, Minio, Postgres, bash, TeamCity,
            nginx
          </p>
        </li>
      </ol>
      <h2 id="oss" ref={ossRef}>
        Open Source Contributions
      </h2>
      <ol>
        <li>
          <p>aioodbc</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>Documentation updates based on using the library.</p>
          <p>
            <strong>PR</strong>
          </p>
          <ul>
            <li>
              <a href="https://github.com/aio-libs/aioodbc/pull/176">
                Configuration tuning documentation
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p>Apache Arrow</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Documentation and minor behavior updates based on using the library.
          </p>
          <p>
            <strong>PRs</strong>
          </p>
          <ul>
            <li>
              <a href="https://github.com/apache/arrow/pull/1765/files">
                Add hash path
              </a>
            </li>
            <li>
              <a href="https://github.com/apache/arrow/pull/1820/files">
                Documentation updates
              </a>
            </li>
            <li>
              <a href="https://github.com/apache/arrow/pull/2057">
                Memory subpool allocation
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p>Code Louisville</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Volunteer Instructor and content creator for Python web and data
            analysis tracks.
          </p>
          <p>
            <strong>Repo</strong>
          </p>
          <ul>
            <li>
              <a href="https://github.com/CodeLouisville/PythonClassProject">
                Python course repo
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p>Firefox mobile android</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>Mobile browser update for a bug I and others experienced.</p>
          <p>
            <strong>PRs</strong>
          </p>
          <ul>
            <li>
              <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=769391">
                Orientation bug fix
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p>pymssql</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>
            Help get the library update to cut a new release addressing several
            bugs and issues users encountered.
          </p>
          <p>
            <strong>PRs</strong>
          </p>
          <ul>
            <li>
              <a href="https://github.com/pymssql/pymssql/pull/587">
                2.1.4 release coordinator
              </a>
            </li>
            <li>
              <a href="https://github.com/pymssql/pymssql/pull/577">
                Build updates
              </a>
            </li>
            <li>
              <a href="https://github.com/pymssql/pymssql/pull/591">
                Assist others to contribute to the project
              </a>
            </li>
            <li>
              <a href="https://github.com/pymssql/pymssql/pulls?q=is%3Apr+author%3An0mn0m+">
                etc
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p>wavesurfer.js</p>
          <p>
            <strong>Summary</strong>
          </p>
          <p>Update region event broadcasting during teardown</p>
          <p>
            <strong>PRs</strong>
          </p>
          <ul>
            <li>
              <a href="https://github.com/katspaugh/wavesurfer.js/pull/2409">
                Region plugin event fix
              </a>
            </li>
          </ul>
        </li>
      </ol>
    </article>
  );
};

export default CodingPortfolio;
