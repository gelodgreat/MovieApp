import React, { Component } from "react";
import { Layout, Text, Button, Input } from "react-native-ui-kitten";
import { Image, Card } from "react-native-elements";
var self;

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: this.props.navigation.state.params.id,
      movieDetails: {}
    };
  }

  componentDidMount() {
    self = this;
    this.getMovieDetails();
  }

  async getMovieDetails() {
    try {
      var response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.state.movieId +
          "?api_key=f95f50d1981cb3d3febf773bf6938429&language=en-US"
      ).catch(error => {
        console.error(error);
      });
      var jsonized = await response.json();
      this.setState({ movieDetails: jsonized });
    } catch (error) {}
  }

  render() {
    const movieData = this.state.movieDetails;
    return (
      <Layout style={{ flex: 2 }}>
        <Card title={movieData.title}>
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/original" + movieData.poster_path
            }}
          />
          <Text style={{ marginBottom: 10 }}>{movieData.overview}</Text>

          <Text>Budget: {movieData.budget}</Text>
        </Card>
      </Layout>
    );
  }
}
