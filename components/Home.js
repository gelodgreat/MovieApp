import React, { Component } from "react";
import { Layout, ListItem, List } from "react-native-ui-kitten";
import { Image } from "react-native-elements";
var self;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingMovies: []
    };
  }

  componentDidMount() {
    self = this;
    this.getTrendingMovies();
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
  const Icon = style => {
    return (
      <Image
        style={style}
        source={{
          uri: "https://image.tmdb.org/t/p/original" + props.item.poster_path
        }}
      />
    );
  };

  const { navigate } = self.props.navigation;
  return (
    <Layout>
      <ListItem
        key={props.item.id}
        icon={Icon}
        title={props.item.title}
        description={props.item.overview}
        onPress={() => navigate("MovieDetails", { id: props.item.id })}
      />
    </Layout>
  );
};
