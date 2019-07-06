import React, { Component } from "react";
import { Layout, List, ListItem } from "react-native-ui-kitten";
import { AsyncStorage, ScrollView } from "react-native";
import { Card } from "react-native-elements";
var mySessionId, accountId, myToken, self;

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
    this.state = { watchlists: [] };
  }

  async componentDidMount() {
    self = this;
    mySessionId = await AsyncStorage.getItem("mySessionId");
    accountId = await AsyncStorage.getItem("accountId");
    myToken = await AsyncStorage.getItem("myToken");
    var userWatchList = await this.getUserWatchlists();
    self.setState({ watchlists: userWatchList });
  }

  getUserWatchlists() {
    return new Promise(async (resolve, reject) => {
      try {
        var token = await fetch(
          "https://api.themoviedb.org/3/account/" +
            accountId +
            "/watchlist/movies?api_key=f95f50d1981cb3d3febf773bf6938429&language=en-US&session_id=" +
            mySessionId +
            "&sort_by=created_at.asc&page=1"
        ).catch(error => {
          console.error(error);
        });
        var jsonized = await token.json();
        resolve(jsonized.results);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  render() {
    return (
      <Layout style={{ flex: 2, padding: 10 }}>
        <Card title="Movie Watchlists">
          <List data={this.state.watchlists} renderItem={ListItemShowcase} />
        </Card>
      </Layout>
    );
  }
}

export const ListItemShowcase = props => {
  const { navigate } = self.props.navigation;
  return (
    <Layout>
      <ListItem
        key={props.item.id}
        title={props.item.title}
        description={props.item.overview}
        onPress={() => navigate("MovieDetails", { id: props.item.id })}
      />
    </Layout>
  );
};
