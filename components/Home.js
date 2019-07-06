import React, { Component } from "react";
import { Layout, ListItem, List, Input, Button } from "react-native-ui-kitten";
import { Image } from "react-native-elements";
import { AsyncStorage } from "react-native";
var self;

export default class Home extends Component {
  static navigationOptions = {
    title: "Home",
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
      trendingMovies: []
    };
  }

  async componentDidMount() {
    self = this;
    var trendingMovies = await this.getTrendingMovies();
    const value = await AsyncStorage.getItem('myToken');
    console.log(value)
    self.setState({ trendingMovies: trendingMovies });
  }

  getTrendingMovies() {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=f95f50d1981cb3d3febf773bf6938429"
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

  async searchMovies(movieSearch) {
    return new Promise(async (resolve, reject) => {
      try {
        if (movieSearch == "") {
          this.getTrendingMovies();
        } else {
          var response = await fetch(
            "https://api.themoviedb.org/3/search/movie?api_key=f95f50d1981cb3d3febf773bf6938429&language=en-US&query=" +
              movieSearch
          ).catch(error => {
            console.error(error);
          });
          var jsonized = await response.json();
          resolve(jsonized.results);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async onInputChange(movieSearch) {
    var searchMovieNow = await this.searchMovies(movieSearch);
    this.setState({ trendingMovies: searchMovieNow });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Layout style={{ flex: 2, padding: 10 }}>
        <Button
          style={{ margin: 10 }}
          status="success"
          onPress={() => navigate("Watchlist")}
        >
          View Watchlist
        </Button>
        <Input
          placeholder="Search Movies"
          onChangeText={searchMovie => this.onInputChange(searchMovie)}
        />
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
