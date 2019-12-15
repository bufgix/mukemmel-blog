import React from "react";
import Head from "../../components/Head";
import fetch from "isomorphic-unfetch";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { FaCheckCircle, FaPlusCircle, FaEye, FaThList } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import CreatePost from "../../components/createPost";
import ListPost from "../../components/listPosts";

import "./dashboard.css";
import "./tagstyle.css";
import "../index.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "all", // "create"
      prevTitle: "",
      prevMdContent: "",
      postWillUpdate: null
    };
  }

  renderRightSide() {
    const {
      currentPage,
      prevTitle,
      prevMdContent,
      postWillUpdate
    } = this.state;

    if (currentPage === "all") {
      return <ListPost update={this.updatePost.bind(this)} />;
    } else if (currentPage === "create") {
      return (
        <CreatePost
          tags={this.props.tags}
          save={this.save.bind(this)}
          title={prevTitle}
          content={prevMdContent}
        />
      );
    } else if (currentPage === "update") {
      postWillUpdate.details =
        `![Banner](${postWillUpdate.imageUrl})\n` + postWillUpdate.details;
      return (
        <CreatePost
          tags={this.props.tags}
          save={this.save.bind(this)}
          updatePost={postWillUpdate}
          isUpdate={true}
        />
      );
    }
  }

  save(prevTitle, prevMdContent) {
    this.setState({
      prevTitle,
      prevMdContent
    });
  }

  updatePost(post) {
    this.setState({
      currentPage: "update",
      postWillUpdate: post
    });
  }

  render() {
    const {
      user: { picture, displayName },
    } = this.props;
    return (
      <div>
        <Head />
        <Container className="dashboard-container">
          <Row>
            <Col md={4}>
              <div className="profilebox-border-wrap mt-3 mt-sm-3">
                <div className="profilebox ">
                  <div className="profilebox-profile-img text-center m-1">
                    <Image
                      src={picture}
                      roundedCircle
                      height={150}
                      width={150}
                    />
                  </div>
                  <h5 className="profilebox-name text-center mt-2">
                    {displayName} <FaCheckCircle />
                  </h5>
                  <ul>
                    <li>
                      <FaPlusCircle />
                      <a
                        href="#"
                        onClick={() => {
                          this.setState({
                            currentPage: "create"
                          });
                        }}
                      >
                        Yeni yazı
                      </a>
                    </li>
                    <li>
                      <FaThList />
                      <a
                        href="#"
                        onClick={() => {
                          this.setState({
                            currentPage: "all"
                          });
                        }}
                      >
                        Tüm yazılar
                      </a>
                    </li>
                    <li>
                      <FaEye />
                      <a href="/" target="_blank">
                        Siteyi gör
                      </a>
                    </li>
                    <li>
                      <FiLogOut />
                      <a href="/user/logout">Çıkış Yap</a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col className="dashboard-content mt-3" md={8}>
              {this.renderRightSide()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Dashboard.getInitialProps = async ({ req, query }) => {
  const tags = await (await fetch(`${process.env.DOMAIN}/api/tags`)).json();
  return {
    user: req.user,
    tags
  };
};

export default Dashboard;
