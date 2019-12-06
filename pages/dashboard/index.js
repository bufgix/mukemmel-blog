import React from "react";
import Head from "../../components/Head";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head />
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
