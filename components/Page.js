import React, { Component } from "react";

class Page extends Component {
  render() {
    return <main>{this.props.children}</main>;
  }
}

export default Page;
