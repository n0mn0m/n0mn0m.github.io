import { Link } from 'react-router-dom';
import '../assets/app.css';
import Footer from './frame/footer';
import Header from './frame/header';
import SocialBar from './social/menu';

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
