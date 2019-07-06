import React, { Component } from "react";
import { Layout, Text, Button, Input } from "react-native-ui-kitten";

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
  }

  async getTrendingMovies() {
    try {
      var response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=f95f50d1981cb3d3febf773bf6938429&language=en-US&page=1"
      ).catch(error => {
        console.error(error);
      });
      var jsonized = await response.json();
      this.setState({ trendingMovies: jsonized.results });
    } catch (error) {}
  }

  render() {
    return (
      <Layout style={{ flex: 2, padding: 10 }}>
        <Button style={{ marginTop: 10 }}>Second</Button>
      </Layout>
    );
  }
}
