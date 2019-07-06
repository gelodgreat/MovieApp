import React, { Component } from "react";
import { Layout, Text } from "react-native-ui-kitten";
import { Image, Card } from "react-native-elements";
import { ScrollView } from "react-native";
import MovieReviews from "./MovieReviews";

var self;

export default class MovieDetails extends Component {
  static navigationOptions = {
    title: "Movie Details",
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

    this.state = {
      movieId: this.props.navigation.state.params.id,
      movieDetails: {},
      loading: true
    };
  }

  async componentDidMount() {
    self = this;
    var movieDetailsData = await this.getMovieDetails();

    self.setState({
      movieDetails: movieDetailsData,
      loading: false
    });
  }

  getMovieDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            this.state.movieId +
            "?api_key=f95f50d1981cb3d3febf773bf6938429&language=en-US"
        ).catch(error => {
          console.error(error);
        });

        resolve(await response.json());
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  render() {
    const movieData = this.state.movieDetails;

    if (this.state.loading) {
      return (
        <Layout>
          <Text>Loading...</Text>
        </Layout>
      );
    } else {
      return (
        <ScrollView>
          <Layout style={{ flex: 2 }}>
            <Card title={movieData.title}>
              <Image
                source={{
                  uri:
                    "https://image.tmdb.org/t/p/original" +
                    movieData.poster_path
                }}
              />
              <Text>Id: {movieData.id}</Text>
              <Text style={{ marginBottom: 10 }}>{movieData.overview}</Text>
              <Text>Budget: {movieData.budget}</Text>
              <Text>Rating:{movieData.vote_average}</Text>
            </Card>
            <MovieReviews id={this.props.navigation.state.params.id} />
          </Layout>
        </ScrollView>
      );
    }
  }
}
