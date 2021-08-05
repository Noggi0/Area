import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../components/Login.js';
import Register from '../components/Register.js';
import Home from '../components/Home.js'

const stackNavigatorOptions = {
    headerShown:false
}
const AppNavigator = createStackNavigator({
    Login: {screen:Login},
    Register: {screen:Register},
    Home: {screen:Home}
},
{
    defaultNavigationOptions : stackNavigatorOptions
});

export default createAppContainer(AppNavigator);