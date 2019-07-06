import React, { Component } from "react";
import { Layout, Text, Button, Input } from "react-native-ui-kitten";

export default class Watchlist extends Component {
  static navigationOptions = {
    title: "Your Watchlist",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  getUserWatchlists() {
    return new Promise(async (resolve, reject) => {});
  }

  render() {
    return <Layout style={{ flex: 2, padding: 10 }} />;
  }
}
