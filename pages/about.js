import React from "react";
import Head from "../components/Head";
import { Container } from "react-bootstrap";

import "./index.css";
import "./about.css";

class About extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <Container className="container">
          <h1>About page</h1>
        </Container>
      </div>
    );
  }
}

export default About;
