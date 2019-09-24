import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button
} from 'native-base';

import Login from './Login';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      username: '',
      isDone: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
  }

  static navigationOptions = {
    header: null
  };
  handleSubmit = () => {
    if (
      this.state.email !== '' &&
      this.state.name !== '' &&
      this.state.password !== '' &&
      this.state.username !== ''
    ) {
      console.log(24);
      const that = this;
      fetch('https://mynoteappt.herokuapp.com/api/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // console.log(responseJson);
          that.setState({ isDone: true });
          console.log(this.state);
          return responseJson;
        })
        .catch(err => console.log(err));
    }
  };
  goToLogin = () => {
    console.log(24);
    this.setState({ isDone: true });
  };
  render() {
    const { email, name, password, username } = this.state;
    if (this.state.isDone) {
      return <Login />;
    }
    return (
      <Container>
        <Content style={styles.bg}>
          <Form>
            <Item floatingLabel>
              <Icon type="FontAwesome" name="user" style={{ fontSize: 20 }} />
              <Label>Name</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={name}
              />
            </Item>
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
            <Item floatingLabel>
              <Icon type="FontAwesome" name="male" style={{ fontSize: 20 }} />
              <Label>Username</Label>
              <Input
                onChangeText={username => this.setState({ username })}
                value={username}
              />
            </Item>
            <Button
              rounded
              dark
              style={styles.submitButton}
              onPress={this.handleSubmit}
            >
              <Text
                style={{
                  color: '#fff',
                  marginLeft: '47.5%'
                }}
              >
                Sign Up
              </Text>
              <Icon
                type="Entypo"
                name="add-user"
                style={{ color: '#fff', marginLeft: '1%', fontSize: 18 }}
              />
            </Button>
            <Text style={styles.orText}>OR</Text>
            <Button
              rounded
              dark
              style={styles.siginBtn}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={{ color: '#fff', marginLeft: '48.5%' }}>Login</Text>
              <Icon
                type="AntDesign"
                name="login"
                style={{ color: '#fff', marginLeft: '1%' }}
              />
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
  },
  submitButton: {
    marginTop: '7%'
  },
  siginBtn: {
    marginTop: '2%'
  },
  orText: {
    marginLeft: '47%',
    marginTop: '2%'
  }
});
