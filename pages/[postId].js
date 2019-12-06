import React from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Container, Image } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import Social from "../components/Social";
import Head from "../components/Head";

import "highlight.js/styles/atelier-plateau-dark.css";
import hljs from "highlight.js";
import "../pages/index.css";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      hljs.initHighlightingOnLoad();
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <Head />
        <Container>
          <div className="blog mt-3 mt-sm-3 mb-5">
            <Image src="/post-image.webp" fluid />
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
  const res = await fetch(`http://localhost:3000/api/post/${query.postId}`);
  const json = await res.json();
  return { post: json.post };
};

export default BlogPost;
