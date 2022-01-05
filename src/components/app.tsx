import { Routes, Route, Link } from 'react-router-dom';
import About from './about';
import Footer from './frame/footer';
import Header from './frame/header';
import SocialBar from './social/menu';
import '../assets/app.css';

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <SocialBar />
        <nav className="main-menu">
          <ul>
            <Link to="about">About</Link>
          </ul>
          <ul>
            <Link to="portfolio">Portfolio</Link>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
}

export default App;
