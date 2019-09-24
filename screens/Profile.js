import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Button, Alert } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { AsyncStorage } from 'react-native';
import App from '../App';
import MyNotes from './MyNotes';
import { withNavigation } from 'react-navigation';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  Text,
  Content,
  Card,
  CardItem
} from 'native-base';
import AddNote from './AddNote';
import { Avatar } from 'react-native-elements';
export default class Profile extends Component {
  //
  componentWillMount() {
    //Method to decode the jwt token

    this._retrieveData();
    //console.log(this.state.token);
  }

  //

  /*  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ isLoading: false });
    this._retrieveData();
  } */

  constructor(props) {
    super(props);

    this.state = {
      name: 'RAHUL',
      mynotes: [],
      token: '',
      isLogout: false,
      userId: '',
      isStore: false,
      isAddNote: false,
      isLoading: true,
      isChecking: true,
      noteId: '',
      isDel: false
    };
    this.noteHandler = this.noteHandler.bind(this);
    this.del = this.del.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
    this.decodeToken = this.decodeToken.bind(this);
    this.delNote = this.delNote.bind(this);
    this.noteAddHandler = this.noteAddHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  //
  noteHandler = () => {
    console.log('noteHandler start');
    const that = this;
    fetch('https://mynoteappt.herokuapp.com/api/notes/mynotes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        const mynotes = responseJson.map(obj => obj);
        this.setState({ mynotes: mynotes });
        return responseJson;
      })
      .catch(err => console.log(err));
  };
  del = async () => {
    console.log('del is clicked');
    try {
      await AsyncStorage.removeItem('token', err => {
        this.setState({ isLogout: true });
      });
    } catch (error) {
      // Error retrieving data
    }
  };
  _retrieveData = async () => {
    console.log('ret running');
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        this.setState({ token: value });
        this.setState({ isStore: true });
        this.decodeToken();
        console.log(value);
      }
      if (value === null) {
        console.log('value is null');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  decodeToken = () => {
    const token = this.state.token;
    const parts = token
      .split('.')
      .map(part =>
        Buffer.from(
          part.replace(/-/g, '+').replace(/_/g, '/'),
          'base64'
        ).toString()
      );

    const payload = JSON.parse(parts[1]);
    //method end to decode the jwt token
    //  console.log(payload.name);
    this.setState({ name: payload.name });
    this.setState({ userId: payload.id });
    this.setState({ token: token });
    this.noteHandler();
  };
  noteAddHandler = () => {
    this.setState({ isAddNote: true });
  };

  logoutHandler = () => {
    console.log('check is running');
    Alert.alert(
      'Do You Want To Logout',
      'Press Ok To Confirm',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => this.del()
        }
      ],
      { cancelable: false }
    );
    console.log(this.state.isChecking);
  };

  delNote = id => {
    const that = this;
    console.log(id);
    fetch('https://mynoteappt.herokuapp.com/api/notes/mynotes/del', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.token
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ isDel: true });
        return responseJson;
      })
      .catch(err => console.log(err));
  };

  force = () => {
    this.forceUpdate();
  };
  render() {
    var str = this.state.name;
    var res = str.substring(0, 2).toUpperCase();
    console.log('profile comp start');
    if (this.state.isLogout) {
      return <App />;
    }
    if (this.state.isAddNote) {
      return <AddNote id={this.state.userId} token={this.state.token} />;
    }
    if (this.state.isDel) {
      return <MyNotes />;
    }

    return (
      <Container>
        <Header style={{ backgroundColor: '#362417' }}>
          <Right style={{ marginTop: '8%', marginLeft: '-10%' }}>
            {/* <Avatar
              rounded
              title="+"
              size={27}
              titleStyle={{}}
              onPress={() => this.check.bind(this)()}
              containerStyle={{}}
              avatarStyle={{}}
              iconStyle={{}}
              overlayContainerStyle={{}}
              titleStyle={{}}
            /> */}
            <Avatar
              rounded
              source={{
                uri: 'https://i.ibb.co/9GgV6d2/Webp-net-resizeimage-2.png'
              }}
              size={27}
              onPress={this.noteAddHandler}
            />
          </Right>
          <Left style={{ marginTop: '8%', marginLeft: '87%' }}>
            <Avatar
              rounded
              title={res}
              size={27}
              titleStyle={{}}
              onPress={this.logoutHandler}
              containerStyle={{}}
              avatarStyle={{}}
              iconStyle={{}}
              overlayContainerStyle={{}}
              titleStyle={{}}
            />
          </Left>
        </Header>

        {/*  <Button title="click" onPress={this.del} /> */}

        <Content style={{ backgroundColor: '#362417' }}>
          <Card>
            {this.state.mynotes.map((item, index) => {
              return (
                <CardItem
                  key={index}
                  style={{ backgroundColor: '#362417', marginLeft: '-6%' }}
                >
                  <View>
                    <Card style={{ width: SCREEN_WIDTH }}>
                      <CardItem header style={{ backgroundColor: '#cfbba3' }}>
                        <Text style={{ color: '#362417', zIndex: 4 }}>
                          {item.title}
                        </Text>
                        <Icon
                          type="FontAwesome"
                          name="trash"
                          style={styles.co}
                          onPress={() => this.delNote(item._id)}
                        />
                      </CardItem>
                      <CardItem style={{ backgroundColor: '#dbccba' }}>
                        <Body>
                          <Text style={{ color: '#4f3723' }}>{item.note}</Text>
                        </Body>
                      </CardItem>
                      <CardItem footer style={{ backgroundColor: '#d9d4c5' }}>
                        <Text
                          style={{ color: '#826248' }}
                        >{`Last Update On ${item.date.substring(
                          0,
                          10
                        )}  At ${item.date.substring(11, 19)}`}</Text>
                      </CardItem>
                    </Card>
                  </View>
                </CardItem>
              );
            })}
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  co: {
    marginLeft: 300,
    position: 'absolute',
    zIndex: 2,
    fontSize: 30
  }
});

// TODO: Add a method that enable backend to send notes in desc oder by date
// TODO: Style the thrash icon which is present at the top of the card
