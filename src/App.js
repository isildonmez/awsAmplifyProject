import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Amplify, { API, Storage } from 'aws-amplify';
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

  async getNote() {
    const path = '/Notes/object/' + this.state.noteId;
    try {
      const apiResponse = await API.get('NotesCRUD', path);
      console.log('response from getting note: ' + apiResponse);
      this.setState({ apiResponse });
    } catch (e) {
      console.log(e);
    }
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

  async deleteNote() {
    const path = '/Notes/object/' + this.state.noteId;
    try {
      const apiResponse = await API.del('NotesCRUD', path);
      console.log('response from deleteing note: ' + apiResponse);
      this.setState({ apiResponse });
    } catch (e) {
      console.log(e);
    }
  }

  async uploadFile() {
    const file = 'My upload text';
    const name = 'myFile.txt';
    const access = { level: 'public' };
    Storage.put(name, file, access);
  }

  async getFile() {
    const name = 'myFile.txt';
    const access = { level: 'public' };
    const fileUrl = await Storage.get(name, access);
    // use fileUrl to get the file
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput: {
          margin: 15,
          height: 30,
          width: 200,
          borderWidth: 1,
          color: 'green',
          fontSize: 20,
          backgroundColor: 'black'
       }
    });
    return (
      <View style={styles.container}>
        <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
        <Button title='Save Note' onPress={this.saveNote.bind(this)} />
        <Button title='Get Note' onPress={this.getNote.bind(this)} />
        <Button title='Delete Note' onPress={this.deleteNote.bind(this)} />
        <TextInput
          style={styles.textInput}
          autoCapitalize='none'
          onChangeText={this.handleChangeNoteId}
        />
      </View>
    );
  }
}

export default withAuthenticator(App);
