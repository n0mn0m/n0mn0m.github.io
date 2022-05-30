import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './components/app';
import About from './components/about';
import Portfolio from './components/portfolio/core';
import Copyright from './components/copyright';
import Resume from './components/resume/core';
import CodingPortfolio from './components/portfolio/coding';
import MyLists from './components/lists/core';
import BookList from './components/lists/books';
import PodcastList from './components/lists/podcasts';

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
    </Helmet>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="about" element={<About />} />
        <Route path="copyright" element={<Copyright />} />
        <Route path="my-lists" element={<MyLists />} />
        <Route path="my-lists/books" element={<BookList />} />
        <Route path="my-lists/podcasts" element={<PodcastList />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/art" element={<div />} />
        <Route path="portfolio/music" element={<div />} />
        <Route path="portfolio/coding" element={<div />} />
        <Route path="project-list" element={<CodingPortfolio />} />
        <Route path="resume" element={<Resume />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
