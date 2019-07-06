import React, { Component } from 'react';
import { Layout, Text, Button, Input } from 'react-native-ui-kitten';

export default class Second extends Component {
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
        return (
            <Layout style={{ flex: 2, padding: 10 }}>
                <Button style={{ marginTop: 10 }}>Second</Button>
            </Layout>

        );
    }
}

