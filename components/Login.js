import React, { Component } from "react";
import { Layout, Text, Button, Input } from "react-native-ui-kitten";
import { AsyncStorage } from "react-native";
var loginToken;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "carions46",
      password: "@carions46"
    };
  }

  async componentDidMount() {
    var token = await this.getToken();
    loginToken = token.request_token;
  }

  getToken() {
    return new Promise(async (resolve, reject) => {
      try {
        var token = await fetch(
          "https://api.themoviedb.org/3/authentication/token/new?api_key=f95f50d1981cb3d3febf773bf6938429"
        ).catch(error => {
          console.error(error);
        });
        var jsonized = await token.json();
        resolve(jsonized);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  createNewSession(token) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = {
          request_token: token
        };

        var createNewSessionRequest = await fetch(
          "https://api.themoviedb.org/3/authentication/session/new?api_key=f95f50d1981cb3d3febf773bf6938429",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        );
        var createSessionResponse = await createNewSessionRequest.json();
        if (createSessionResponse.success) {
          resolve(createSessionResponse.session_id);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async validateUser() {
    try {
      var data = {
        username: this.state.username,
        password: this.state.password,
        request_token: loginToken
      };

      var loginRequest = await fetch(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=f95f50d1981cb3d3febf773bf6938429",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      var loginResponse = await loginRequest.json();
      if (loginResponse.success == true) {
        var session_id = await this.createNewSession(
          loginResponse.request_token
        );
        await AsyncStorage.setItem("mySessionId", session_id);
        await AsyncStorage.setItem("myToken", loginResponse.request_token);
        var accountDetails = await this.getAccountDetails(session_id);
        await AsyncStorage.setItem("accountId", accountDetails.id.toString());
        console.log(session_id, accountDetails.id);
        this.props.navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAccountDetails(session_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var token = await fetch(
          "https://api.themoviedb.org/3/account?api_key=f95f50d1981cb3d3febf773bf6938429&session_id=" +
            session_id
        ).catch(error => {
          console.error(error);
        });
        var jsonized = await token.json();
        resolve(jsonized);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  render() {
    return (
      <Layout style={{ flex: 2, padding: 10, marginTop: 50 }}>
        <Text>Username</Text>
        <Input
          textContentType="username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />

        <Text>Password</Text>
        <Input
          textContentType="password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            this.validateUser();
          }}
        >
          Log In
        </Button>
      </Layout>
    );
  }
}
