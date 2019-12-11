import React from "react";
import ReactMarkdown from "react-markdown";
import { Container, Image } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import Social from "../components/Social";
import Head from "../components/Head";
import { parseDate } from "../components/utils";
import { Analytics } from "../components/googleAnalytics";
import fetch from "isomorphic-unfetch";
import hljs from "highlight.js";
import $ from "jquery";

import "highlight.js/styles/atelier-plateau-dark.css";
import "../pages/index.css";
import "./details.css";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Analytics.logPageView(window.location.pathname);
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
    $("iframe").wrap("<div class='iframe-container' />");
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <Head />
        <Container className="blog-container">
          <div className="blog mt-3 mt-sm-3 mb-5">
            <Image src={post.imageUrl} fluid />
            <h1 className="blog-title mt-2">{post.title}</h1>
            <p className="text-muted">
              <FaClock /> {parseDate(post.date)}
            </p>
            <hr className="fancy-hr" />
            <div className="blog-content">
              <ReactMarkdown source={post.details} escapeHtml={false} />
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

BlogPost.getInitialProps = async ({ req, query, res }) => {
  const resData = await fetch(
    `${process.env.DOMAIN}/api/posts/${query.postSlug}`
  );
  if (resData.status == 404) {
    res.redirect(`/?notFound=${true}`);
  } else {
    const postData = await resData.json();
    return { post: postData };
  }
};

export default BlogPost;
