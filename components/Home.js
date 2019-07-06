import React, { Component } from "react";
import { Layout, ListItem, List } from "react-native-ui-kitten";
var self;
export default class Home extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      trendingMovies: []
    };
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

  componentDidMount() {
    this.getTrendingMovies();
  }

  inputChange(input) {
    this.setState({ input });
  }

  render() {
    return (
      <Layout style={{ flex: 2, padding: 10 }}>
        <List data={this.state.trendingMovies} renderItem={ListItemShowcase} />
      </Layout>
    );
  }
}

export const ListItemShowcase = props => {
  const { navigate } = self.props.navigation;
  return (
    <ListItem
      key={props.item.id}
      title={props.item.title}
      description={props.item.overview}
      onPress={() => navigate("MovieDetails")}
    />
  );
};
