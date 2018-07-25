import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Amplify, { API } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

class App extends Component {
  state = {
    apiResponse: null,
    noteId: ''
  };

  async getSample() {
    const path = '/items'; //you can specify the path
    const apiResponse = await API.get('sampleCloudApi', path);
    console.log('response:' + apiResponse);
    this.setState({ apiResponse });
  }

  handleChangeNoteId = (event) => {
    this.setState({ noteId: event });
  }

  async saveNote() {
    const newNote = {
      body: {
        'NoteTitle': 'My first note!',
        'NoteContent': 'This is so cool',
        'NoteId': this.state.noteId
      }
    };
    const path = '/Notes';

    try {
      const apiResponse = await API.put('NotesCRUD', path, newNote);
      console.log('response from saving note: ' + apiResponse);
      this.setState({ apiResponse });
    } catch (e) {
      console.log(e);
    }
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
