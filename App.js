import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  mapping,
  light as lightTheme,
  dark as darkTheme
} from "@eva-design/eva";
import { ApplicationProvider, Layout } from "react-native-ui-kitten";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Login from "./components/Login";
import Second from "./components/Second";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

const ApplicationNavigator = createStackNavigator(
  {
    Home: Home,
    Second: Second,
    MovieDetails: MovieDetails
  },
  { initialRouteName: "Home" }
);
const AppNavigator = createSwitchNavigator(
  {
    Login,
    Login,
    ApplicationNavigator
  },
  { initialRouteName: "Login" }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={darkTheme}>
      <Layout style={{ flex: 1 }}>
        <AppContainer />
      </Layout>
    </ApplicationProvider>
  );
}
