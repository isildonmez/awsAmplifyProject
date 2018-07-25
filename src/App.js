import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Amplify, { API } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

class App extends Component {
  state = { apiResponse: null };

  async getSample() {
    const path = '/items'; //you can specify the path
    const apiResponse = await API.get('sampleCloudApi', path);
    console.log('response:' + apiResponse);
    this.setState({ apiResponse });
  }

  render() {
    return (
      <View>
        <Button title="Send Request" onPress={this.getSample.bind(this)} />
        <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
        <Text>Hello World!</Text>
      </View>
    );
  }
}

export default withAuthenticator(App);
