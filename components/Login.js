import React, { Component } from 'react';
import { Layout, Text, Button, Input } from 'react-native-ui-kitten';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  inputChange(input) {
    this.setState({ input });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Layout style={{ flex: 2, padding: 10, marginTop: 50 }}>
       
        <Text>Username</Text>
        <Input onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
        />


        <Text>Password</Text>
        <Input onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />

        <Button style={{ marginTop: 10 }} onPress={() => navigate('Home')}>Log In</Button>
      </Layout>

    );
  }
}

