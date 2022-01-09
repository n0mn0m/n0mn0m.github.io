import { Link } from 'react-router-dom';
import Anchor from './element/anchor';
import Footer from './frame/footer';
import Home from './frame/home';
import AppleMusicPlayer from './music/player';

const About = () => {
  return (
    <>
      <Home />
      <div className="app">
        <article
          style={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 450,
            flexWrap: 'wrap',
            margin: '0 auto',
          }}
        >
          <p>Hi, I'm Alexander</p>
          <p>
            For more than a decade I have been fortunate to work across many
            domains with a lot of inventive individuals. I have learned a lot
            from those who have spent time introducing me to new ideas and
            philosophies, and I enjoy every opportunity I have to collaborate
            with others.
          </p>
          <p>
            Day to day I work on projects at the intersection of humans and
            computers. I enjoy the challenge of making applications
            understandable while seeing how the devices we use impact how we
            interpret the world around us.
          </p>
          <p>
            In my spare time I enjoy tinkering with hardware, swimming, cooking,
            playing music with Maris, and story telling with friends.
          </p>
          <p>
            If you want to chat you can{' '}
            <a href="mailto:alexander@burningdaylight.io">message</a> me, or a{' '}
            <Anchor anchorContent="patch" href="https://github.com/n0mn0m/" />.
          </p>
          <p>
            My resume is available for{' '}
            <Link to="/resume" target="_blank">
              review
            </Link>
            , and I maintain a project list{' '}
            <Link to="/project-list" target="_blank">
              here
            </Link>
            .
          </p>
        </article>
        <section>
          <AppleMusicPlayer />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
