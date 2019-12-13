import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import removeMarkdown from "remove-markdown";
import { parseDate } from "./utils";
import { Row, Col, Image } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import textElipsis from "text-ellipsis";

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post, dataAos } = this.props;
    return (
      <div className="post my-4" data-aos={dataAos}>
        <h2 className="post-title">{post.title}</h2>
        <p className="text-muted">
          <FaClock /> {parseDate(post.date)}
        </p>
        <hr className="fancy-hr" />
        <Row>
          <Col md={4}>
            <Image src={post.imageUrl} fluid />
          </Col>
          <Col md={8} className="align-items-end">
            <div className="post-content">
              {textElipsis(removeMarkdown(post.details), 200)}{" "}
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
    slug: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired,
  dataAos: PropTypes.string
};

Post.defaultProps = {
  dataAos: "fade-up"
};

export default Post;
