import React from "react";
import fetch from "isomorphic-unfetch";
import Particles from "../components/particles";
import Post from "../components/post";
import Social from "../components/Social";
import Head from "../components/Head";
import NotifyController from "../components/notifyController";
import { Analytics } from "../components/googleAnalytics";
import Typewriter from "typewriter-effect";
import { Container, Button } from "react-bootstrap";
import { FaArrowDown } from "react-icons/fa";
import AOS from "aos";

import "./index.css";
import "aos/dist/aos.css";
import Axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: null,
      posts: props.postsData.posts,
      hasMore: props.postsData.hasMore,
      page: 1
    };
    Analytics.logPageView("/");

    this.loadMore = this.loadMore.bind(this);
    this.iterPostApiCall = this.iterPostApiCall.bind(this);
  }

  loadMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.iterPostApiCall();
      }
    );
  }

  iterPostApiCall() {
    const { page, posts, hasMore } = this.state;
    Axios.get(`${process.env.DOMAIN}/api/posts?page=${page}`)
      .then(res => {
        if (hasMore) {
          this.setState(
            {
              posts: posts.concat(res.data.posts),
              hasMore: res.data.hasMore
            },
            () => {
              scrollBy(0, 50);
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    AOS.init();
    this.setState({
      screenHeight: window.innerHeight / 1.5
    });
  }
  render() {
    const { screenHeight, posts, hasMore } = this.state;
    return (
      <NotifyController events={this.props.events}>
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
            <Post post={post} key={index} dataAos="zoom-in" />
          ))}
        </Container>
        {hasMore ? (
          <Container className="text-center my-2 mb-5">
            <div
              className="load-more"
              onClick={e => {
                e.preventDefault();
                this.loadMore();
              }}
            >
              Daha fazla <FaArrowDown />
            </div>
          </Container>
        ) : null}

        <style jsx>{``}</style>
      </NotifyController>
    );
  }
}

Home.getInitialProps = async ({ req, query }) => {
  const res = await fetch(`${process.env.DOMAIN}/api/posts?page=1`);
  const postsData = await res.json();
  return {
    postsData,
    events: {
      notFound: query.notFound,
      exit: query.exit,
      create: query.create,
      update: query.update,
      wrongUser: query.wrongUser
    }
  };
};

export default Home;
