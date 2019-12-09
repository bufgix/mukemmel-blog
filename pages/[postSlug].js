import React from "react";
import ReactMarkdown from "react-markdown";
import { Container, Image } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import Social from "../components/Social";
import Head from "../components/Head";
import fetch from "isomorphic-unfetch";
import hljs from "highlight.js";
import Swal from "sweetalert2";

import "highlight.js/styles/atelier-plateau-dark.css";
import "../pages/index.css";
import "./details.css";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  render() {
    const { post } = this.props;
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

BlogPost.getInitialProps = async ({ req, query, res }) => {
  const resData = await fetch(
    `${process.env.DOMAIN}/api/posts/${query.postSlug}`
  );
  if (resData.status == 404) {
    Swal.fire({ text: "Helllo" });
    res.redirect(`/?notFound=${true}`);
  } else {
    const postData = await resData.json();
    return { post: postData };
  }
};

export default BlogPost;
