import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Container, Image } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import Social from "../components/Social";
import Head from "../components/Head";
import axios from "axios";

import "highlight.js/styles/atelier-plateau-dark.css";
import hljs from "highlight.js";
import "../pages/index.css";
import "./details.css";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    const { slug } = this.props;
    axios
      .get(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/posts/${slug}`
      )
      .then(res => {
        this.setState({ post: res.data }, () => {
          hljs.initHighlighting.called = false;
          hljs.initHighlighting();
        });
      })
      .catch(err => {
        if (err.response.status == 404) {
          Router.push("/");
        }
      });
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        <Head />
        <Container>
          <div className="blog mt-3 mt-sm-3 mb-5">
            <Image src={post.imageUrl} fluid />
            <h1 className="blog-title mt-2">{post.title}</h1>
            <p className="text-muted">
              <FaClock /> {post.date}
            </p>
            <hr className="fancy-hr" />
            <div className="blog-content">
              <ReactMarkdown source={post.details} />
            </div>
          </div>
        </Container>
        <Container className="d-flex flex-column banner text-center my-3">
          <Social />
        </Container>
      </div>
    );
  }
}

BlogPost.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  return { slug: query.postSlug };
};

export default BlogPost;
