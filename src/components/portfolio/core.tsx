import React from 'react';
import {
  faCodeBranch,
  faMusic,
  faPenAlt,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Footer from '../frame/footer';
import Home from '../frame/home';
import '../../assets/portfolio.css';
import '../../assets/app.css';

const Portfolio = () => (
  <>
    <Home />
    <div className="app">
      <p>This area is a work in progress.</p>
      <p>
        I want to create an interactive section for each group below,
        <br />
        but for now you can find a list of my programming projects{' '}
        <Link to="/project-list" target="_blank">
          here
        </Link>
        .
      </p>
      <div className="icon-group">
        <div className="icon-container">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="#">
            <FontAwesomeIcon
              icon={faPenAlt}
              mask={faSquareFull}
              inverse
              className="icon"
              size="2x"
            />
          </Link>
        </div>
        <div className="icon-container">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="#">
            <FontAwesomeIcon
              icon={faCodeBranch}
              mask={faSquareFull}
              inverse
              className="icon"
              size="2x"
            />
          </Link>
        </div>
        <div className="icon-container">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="#">
            <FontAwesomeIcon
              icon={faMusic}
              mask={faSquareFull}
              inverse
              className="icon"
              size="2x"
            />
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Portfolio;
