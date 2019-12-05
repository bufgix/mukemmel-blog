import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Row, Col, Image } from "react-bootstrap";
import { FaClock } from "react-icons/fa";

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="post my-4" data-aos="fade-up">
        <h2 className="post-title">{post.title}</h2>
        <p className="text-muted">
          <FaClock /> {post.date}
        </p>
        <hr className="fancy-hr" />
        <Row>
          <Col md={4}>
            <Image src="/post-image.webp" fluid />
          </Col>
          <Col md={8} className="align-items-end">
            <div className="post-content">
              {post.details}{" "}
              <Link href={`/${post.slug}`}>
                <a className="read-more">Devamını oku</a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired
};

export default Post;
