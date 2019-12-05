import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Particles from "../components/particles";
import Post from "../components/post";
import Typewriter from "typewriter-effect";
import ReactMarkdown from "react-markdown";
import { Container } from "react-bootstrap";
import AOS from "aos";

import "./index.css";
import "aos/dist/aos.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: null
    };
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
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
        </Head>
        <Particles />
        <Container
          style={{ height: screenHeight }}
          className="banner text-center"
        >
          <p className="bn-ov">
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
          </p>
        </Container>
        <Container>
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </Container>

        <style jsx>{``}</style>
      </div>
    );
  }
}

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  return { posts: json.posts };
};

export default Home;
