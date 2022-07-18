import React, { Component } from "react";
import { Layout, Text, Button } from "react-native-ui-kitten";
import { Image, Card } from "react-native-elements";
import { ScrollView, AsyncStorage, View } from "react-native";
import MovieReviews from "./MovieReviews";
import { Rating } from "react-native-ratings";
import AwesomeAlert from "react-native-awesome-alerts";

var mySessionId, accountId, myToken, self;

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
      movieRating: 3,
      loading: true,
      showDeleteAlert: false,
      successAlert: false,
      successMessage: ""
    };
  }

  showAlert = () => {
    this.setState({
      showDeleteAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showDeleteAlert: false
    });
  };

  async componentDidMount() {
    self = this;
    var movieDetailsData = await this.getMovieDetails();
    mySessionId = await AsyncStorage.getItem("mySessionId");
    accountId = await AsyncStorage.getItem("accountId");
    myToken = await AsyncStorage.getItem("myToken");
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

  async addToWatchList() {
    try {
      var data = {
        media_type: "movie",
        media_id: this.state.movieDetails.id,
        watchlist: true
      };
      var addToWatchListRequest = await fetch(
        "https://api.themoviedb.org/3/account/" +
          accountId +
          "/watchlist?api_key=f95f50d1981cb3d3febf773bf6938429&session_id=" +
          mySessionId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(data)
        }
      ).catch(error => {
        console.error(error);
      });
      await addToWatchListRequest.json();
      this.setState({
        successAlert: true,
        successMessage: "Success Added to Watchlist"
      });
    } catch (error) {
      console.log(error);
    }
  }

  ratingCompleted(rating) {
    self.submitRating(rating * 2);
  }

  async submitRating(rating) {
    const { id,title } = this.state.movieDetails;
    try {
      var data = {
        value: rating
      };
      var rateMovie = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/rating?api_key=f95f50d1981cb3d3febf773bf6938429&session_id=" +
          mySessionId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(data)
        }
      ).catch(error => {
        console.error(error);
      });
      await rateMovie.json();
      this.setState({
        successAlert: true,
        successMessage: "Success Rated " + title + " with " + rating
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRating() {
    try {
      var rateMovie = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.state.movieDetails.id +
          "/rating?api_key=f95f50d1981cb3d3febf773bf6938429&session_id=" +
          mySessionId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      ).catch(error => {
        console.error(error);
      });
      this.setState({
        showDeleteAlert: false,
        successAlert: true,
        successMessage: "Successfully Deleted Rating"
      });
      await rateMovie.json();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      movieDetails,
      showDeleteAlert,
      successAlert,
      successMessage
    } = this.state;
    const {
      id,
      overview,
      budget,
      vote_average,
      title,
      poster_path
    } = movieDetails;

    if (this.state.loading) {
      return (
        <Layout>
          <Text>Loading...</Text>
        </Layout>
      );
    } else {
      return (
        <ScrollView>
          <View>
            <Layout style={{ flex: 1 }}>
              <Card title={title}>
                <Image
                  source={{
                    uri: "https://image.tmdb.org/t/p/original" + poster_path
                  }}
                />
                <Text>Id: {id}</Text>
                <Text style={{ marginBottom: 10 }}>{overview}</Text>
                <Text>Budget: {budget}</Text>
                <Text>Rating:{vote_average}</Text>
                <Rating
                  id={id}
                  showRating
                  style={{ paddingVertical: 10 }}
                  onFinishRating={this.ratingCompleted}
                />
                <Button
                  style={{ margin: 10 }}
                  status="danger"
                  onPress={() => {
                    this.showAlert();
                  }}
                >
                  Delete Rating
                </Button>
                <Button
                  style={{ margin: 10 }}
                  onPress={() => {
                    this.addToWatchList();
                  }}
                >
                  Add to Watchlist
                </Button>
                <AwesomeAlert
                  show={showDeleteAlert}
                  showProgress={false}
                  title="Delete Rating"
                  message="Are you sure you want to delete?"
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelText="No, cancel"
                  confirmText="Yes, delete it"
                  confirmButtonColor="#DD6B55"
                  onCancelPressed={() => {
                    this.hideAlert();
                  }}
                  onConfirmPressed={() => {
                    this.deleteRating();
                  }}
                />

                <AwesomeAlert
                  show={successAlert}
                  showProgress={false}
                  message={successMessage}
                  onDismiss={() => {
                    this.setState({ successAlert: false });
                  }}
                />
              </Card>

              <MovieReviews id={this.props.navigation.state.params.id} />
            </Layout>
          </View>
        </ScrollView>
      );
    }
  }
}
