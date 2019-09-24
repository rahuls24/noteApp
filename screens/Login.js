import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button
} from 'native-base';

import Profile from './Profile';
import { AsyncStorage } from 'react-native';
class Login extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      token: '',
      isLogin: false
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.storeData = this.storeData.bind(this);
    this.del = this.del.bind(this);
  }
  loginHandler = () => {
    console.log(24);

    const that = this;
    fetch('https://mynoteappt.herokuapp.com/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //  console.log(responseJson);
        that.setState({ token: responseJson.token });
        this.del();

        this.del();
        return responseJson;
      })
      .catch(err => console.log(err));
  };

  storeData = async token => {
    try {
      await AsyncStorage.setItem('token', token, () => {
        this.setState({ isLogin: true });
        console.log('store token is' + token);
      });
    } catch (error) {
      // Error saving data
    }
  };

  del = async () => {
    console.log('del is clicked');
    try {
      await AsyncStorage.removeItem('token', err => {
        this.storeData(this.state.token);
      });
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    if (this.state.isLogin) {
      return <Profile />;
    }
    const { email, password } = this.state;
    return (
      <Container>
        <Content style={styles.bg}>
          <Form>
            <Item floatingLabel>
              <Icon
                type="FontAwesome"
                name="envelope"
                style={{ fontSize: 20 }}
              />
              <Label>Email</Label>
              <Input
                onChangeText={email => this.setState({ email })}
                value={email}
              />
            </Item>
            <Item floatingLabel>
              <Icon type="FontAwesome" name="lock" style={{ fontSize: 20 }} />
              <Label>Password</Label>
              <Input
                onChangeText={password => this.setState({ password })}
                value={password}
              />
            </Item>
            <Button
              rounded
              dark
              style={styles.submitButton}
              onPress={this.loginHandler}
            >
              <Text
                style={{
                  color: '#fff',
                  marginLeft: '50%'
                }}
              >
                Sign In
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#92817A'
  }
});

export default Login;
