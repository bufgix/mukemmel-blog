import React from "react";
import Head from "../../components/Head";
import fetch from "isomorphic-unfetch";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { FaCheckCircle, FaPlusCircle, FaEye, FaThList } from "react-icons/fa";

import CreatePost from "../../components/createPost";
import ListPost from "../../components/listPosts";

import "./dashboard.css";
import "../index.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "all" // "create"
    };
  }

  renderRightSide() {
    const { currentPage } = this.state;
    if (currentPage === "all") {
      return <ListPost />;
    } else if (currentPage == "create") {
      return <CreatePost />;
    }
  }

  render() {
    return (
      <div>
        <Head />
        <Container>
          <Row>
            <Col md={4}>
              <div className="profilebox-border-wrap mt-3 mt-sm-3">
                <div className="profilebox ">
                  <div className="profilebox-profile-img text-center m-1">
                    <Image
                      src="https://lh3.googleusercontent.com/a-/AAuE7mAv79oyT2WWIe4GY8AhBgFFzLIcAsjV5XQW-qsnXA"
                      roundedCircle
                      height={150}
                      width={150}
                    />
                  </div>
                  <h5 className="profilebox-name text-center">
                    Faruk Oruç <FaCheckCircle />
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
                      <a href="#">Siteyi gör</a>
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

export default Dashboard;
