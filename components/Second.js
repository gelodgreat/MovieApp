import React, { Component } from "react";
import { Layout, Text, Button, Input } from "react-native-ui-kitten";

export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Layout style={{ flex: 2, padding: 10 }} />;
  }
}
