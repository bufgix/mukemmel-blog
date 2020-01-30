import React from "react";
import Head from "../components/Head";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./index.css";
import "./about.css";

class About extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <Container className="container mt-5">
          <div className="h-100 d-flex justify-content-center align-items-center text-about">
            <div>
              <p>
                Selam, ben <strong>Ömer</strong>. Yazılım üretiyorum.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default About;
