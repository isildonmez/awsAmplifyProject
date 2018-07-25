import React, { Component } from 'react';
import { Text } from 'react-native';
import Amplify from 'aws-amplify';
import awsExports from './src/aws-exports';

class App extends Component {
  Amplify.configure(awsExports);
  render() {
    return (
      <Text>Hello World!</Text>
    );
  }
}

export default App;
