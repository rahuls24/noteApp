import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Button
} from 'react-native';
import { Icon, Input } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { AsyncStorage } from 'react-native';
import Profile from './Profile';
import Signup from './Signup';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      token: '',
      goToSignup: false
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  }

  componentWillMount() {
    this.retrieveData();
  }

  // to hide default header bar
  static navigationOptions = {
    header: null
  };
  loginHandler = () => {
    //  this.setState({ isLogin: true });
    // this.props.navigation.navigate('Signup');
    //   this.setState({ goToSignup: true });
  };
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        this.setState({ isLogin: true });
        this.setState({ token: value });
        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    if (this.state.isLogin === true && this.state.token !== '') {
      return <Profile />;
    }
    if (this.state.goToSignup) {
      return <Signup />;
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={{
            uri: 'https://i.ibb.co/P59m6JH/canva-photo-editor-1.png'
          }}
        >
          <Icon
            raised
            name="user-plus"
            type="font-awesome"
            size={26}
            reverse={true}
            containerStyle={styles.loginIcon}
            onPress={() => this.props.navigation.navigate('Signup')}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#362417'
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT + 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginIcon: {
    marginLeft: '77%',
    marginTop: '140%'
  }
});
