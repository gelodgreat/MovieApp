import React, { Component } from "react";
import { Layout, Text, List, ListItem } from "react-native-ui-kitten";
import { Card } from "react-native-elements";
var self;

export default class MovieReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: this.props.id,
      movieReviews: null,
      loading: true
    };
  }

  async componentDidMount() {
    self = this;
    var movieReviews = await this.getMovieReviews();
    self.setState({
      movieReviews: movieReviews,
      loading: false
    });
  }

  getMovieReviews() {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            this.state.movieId +
            "/reviews?api_key=f95f50d1981cb3d3febf773bf6938429&language=en-US&page=1"
        ).catch(error => {
          console.error(error);
        });

        var jsonized = await response.json();
        resolve(jsonized.results);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  render() {
    const { loading, movieReviews } = this.state;
    if (loading) {
      return (
        <Layout>
          <Text style={(alignSelf = "center")}>Loading...</Text>
        </Layout>
      );
    } else {
      return (
        <Card title="Reviews">
          <List data={movieReviews} renderItem={ListItemShowcase} />
        </Card>
      );
    }
  }
}

export const ListItemShowcase = props => {
  const { id, author, content } = props.item;
  return (
    <Layout>
      <ListItem key={id} title={author} description={content} />
    </Layout>
  );
};
