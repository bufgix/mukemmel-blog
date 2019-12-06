import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

class CustomHead extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { title } = this.props;
    return (
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>
    );
  }
}

CustomHead.propTypes = {
  title: PropTypes.string
};

CustomHead.defaultProps = {
  title: "Home"
};

export default CustomHead;
