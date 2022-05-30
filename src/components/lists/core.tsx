import React from 'react';
import '../../assets/portfolio.css';
import '../../assets/app.css';
import { Link } from 'react-router-dom';
import Home from '../frame/home';

const MyLists = () => {
  return (
    <>
      <Home />
      <article style={{ padding: 20 }}>
        <section style={{ textAlign: 'center' }}>
          <p>
            Back by popular demand 😉 these are a few list I like to maintain
            and share. <br /> If you have suggestions, or something I should
            checkout for a list{' '}
            <a href="mailto:alexander@burningdaylight.io?subject=Lists">
              reach out
            </a>{' '}
            and let me know.
          </p>
          <ul style={{ listStyleType: 'none' }}>
            <li>
              <Link to="/my-lists/books" target="_blank">
                Books
              </Link>
            </li>
            <li>
              <Link to="/my-lists/podcasts" target="_blank">
                Podcast
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
};

export default MyLists;
