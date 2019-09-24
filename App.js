import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from './screens/Welcome';
import AddNote from './screens/AddNote';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import MyNotes from './screens/MyNotes';

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Profile: {
    screen: Profile
  },
  AddNote: {
    screen: AddNote
  },
  MyNotes: {
    screen: MyNotes
  }
});

export default createAppContainer(AppNavigator);
