import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  Text
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button,
  Textarea
} from 'native-base';
import { AsyncStorage } from 'react-native';
import Profile from './Profile';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      isAdded: false,
      token: '',
      id: ''
    };
    this.addNote = this.addNote.bind(this);
  }

  componentWillMount() {
    //  console.log('compWillM');
    this.setState({ id: this.props.id });
    this.setState({ token: this.props.token });
  }
  addNote = () => {
    console.log(this.state);
    console.log(this.state.token);
    const that = this;
    fetch('https://mynoteappt.herokuapp.com/api/notes/addnote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.token
      },
      body: JSON.stringify({
        title: this.state.title,
        note: this.state.body
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //   console.log(responseJson);
        this.setState({ isAdded: true });
        //  console.log('after saving');
        //  console.log(this.state);
        return responseJson;
      })
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.isAdded) {
      return <Profile />;
    }
    const { title, body } = this.state;
    return (
      <ImageBackground
        source={{
          uri: 'https://i.ibb.co/894jfVx/canva-photo-editor-1.png'
        }}
        style={styles.bg}
      >
        <Content padder style={styles.test}>
          <Textarea
            style={styles.textAreaTitle}
            rowSpan={2}
            bordered
            placeholder="Use new line after 24 latter"
            onChangeText={title => this.setState({ title })}
            value={title}
          />
          <TextInput />
          <Textarea
            style={styles.textAreaBody}
            rowSpan={5}
            bordered
            placeholder="Type a note"
            onChangeText={body => this.setState({ body })}
            value={body}
          />
          <Button
            rounded
            dark
            style={{ marginTop: '9%' }}
            onPress={this.addNote}
          >
            <Text style={{ color: '#DAE0E2', marginLeft: '48.5%' }}>Add</Text>
            <Icon
              type="Feather"
              name="file-plus"
              style={{ color: '#DAE0E2', marginLeft: '2%', fontSize: 17 }}
            />
          </Button>
          <Icon
            type="FontAwesome"
            name="arrow-circle-left"
            style={{
              color: '#0f0d0e',
              marginLeft: '42%',
              fontSize: 46,
              marginTop: '2%'
            }}
            onPress={() => this.setState({ isAdded: true })}
          />
        </Content>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT + 5,
    marginTop: -5
  },
  textAreaTitle: {
    borderRadius: 5,
    marginTop: '24%'
  },
  textAreaBody: {
    borderRadius: 5
  },
  title: {
    marginTop: '7%',
    fontFamily: 'sans-serif-condensed'
  }
});
