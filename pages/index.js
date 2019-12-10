import React from "react";
import fetch from "isomorphic-unfetch";
import Particles from "../components/particles";
import Post from "../components/post";
import Social from "../components/Social";
import Head from "../components/Head";
import NotifyController from "../components/notifyController";
import { Analytics } from "../components/googleAnalytics";
import Typewriter from "typewriter-effect";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import AOS from "aos";

import "./index.css";
import "aos/dist/aos.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: null
    };
    Analytics.logPageView("/");
  }

  componentDidMount() {
    AOS.init();
    this.setState({
      screenHeight: window.innerHeight / 1.5
    });
  }
  render() {
    const { posts } = this.props;
    const { screenHeight } = this.state;
    return (
      <NotifyController {...this.props}>
        <Head />
        <Particles height={screenHeight} />
        <Container
          data-aos="zoom-in"
          style={{ height: screenHeight }}
          className="d-flex flex-column banner text-center"
        >
          <div className="bn-ov">
            Make it{" "}
            <div className="typewriter">
              <Typewriter
                options={{
                  strings: ["work", "right", "fast"],
                  autoStart: true,
                  loop: true
                }}
              />
            </div>
            .
          </div>
          <Social />
        </Container>
        <Container>
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </Container>

        <style jsx>{``}</style>
      </NotifyController>
    );
  }
}

Home.getInitialProps = async ({ req, query }) => {
  const res = await fetch(`${process.env.DOMAIN}/api/posts`);
  const posts = await res.json();
  return {
    posts,
    events: {
      notFound: query.notFound,
      exit: query.exit,
      create: query.create
    }
  };
};

export default Home;
