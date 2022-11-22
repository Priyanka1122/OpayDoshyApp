import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Screens from '../../screens/Intro/screen';
import Splash from 'screens/Splash';
import Landing from 'screens/Landing';
import GettingStarted from 'screens/GettingStarted';
import EnterDetailsView from 'screens/EnterDetailsView';
import EnterOTPView from 'screens/EnterOTPView';
import SignIn from 'screens/SignIn';
import VerifyEmail from 'screens/VerifyEmail';
import SignUp from 'screens/SignUp';
import Lastname from 'screens/Lastname';
import DOB from 'screens/DOB';
import TermCondition from 'screens/TermCondition';
import PinSetup from 'screens/PinSetup';
import SignUpSuccess from 'screens/SignUpSuccess';
import Home from 'screens/Home';
import BillDetails from 'screens/BillDetails';
import MarkAsPaid from 'screens/MarkAsPaid';
import SpreadWord from 'screens/SpreadWord';
import Settings from 'screens/Settings';
import confirmPin from 'screens/Settings/confirmPin';
import ChangePin from 'screens/ChangePin';
import MyDetails from 'screens/MyDetails';
import EditDetails from 'screens/EditDetails';
import EditEmail from 'screens/EditDetails/EditEmail';
import EditAddress from 'screens/EditDetails/EditAddress';
import EditPhone from 'screens/EditDetails/EditPhone';
import AboutUs from 'screens/AboutUs';
import StaticContent from 'screens/StaticContent';
import Login from 'screens/Login';
import ResetPIN from 'screens/ResetPIN';
import TouchID from 'screens/TouchID';
import DoshyWorks from '../../screens/DoshyWork/DoshyWork';
import ContactUs from '../../screens/ContactUs/index';
import TermsPrivacy from '../../screens/TermPrivacy/index';
const Stack = createStackNavigator();
const initialStack = createStackNavigator();
const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function SplashNav() {
  return (
    <initialStack.Navigator
      mode="card"
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
      }}>
      <initialStack.Screen name="Screens" component={Screens} />
      <initialStack.Screen name="GettingStarted" component={GettingStarted} />
      <initialStack.Screen
        name="EnterDetailsView"
        component={EnterDetailsView}
      />
      <initialStack.Screen name="EnterOTPView" component={EnterOTPView} />
      <initialStack.Screen name="SignIn" component={SignIn} />
      <initialStack.Screen name="VerifyEmail" component={VerifyEmail} />
      <initialStack.Screen name="SignUp" component={SignUp} />
      <initialStack.Screen name="TermCondition" component={TermCondition} />
      <initialStack.Screen name="PinSetup" component={PinSetup} />
      <initialStack.Screen name="SignUpSuccess" component={SignUpSuccess} />
      <initialStack.Screen name="DOB" component={DOB} />
      <initialStack.Screen name="Lastname" component={Lastname} />
    </initialStack.Navigator>
  );
}

function HomeNav() {
  return (
    <HomeStack.Navigator
      initialRouteName={'Home'}
      mode="card"
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <HomeStack.Screen name="confirmPin" component={confirmPin} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="BillDetails" component={BillDetails} />
      <HomeStack.Screen name="MarkAsPaid" component={MarkAsPaid} />
      <HomeStack.Screen name="SpreadWord" component={SpreadWord} />
      <HomeStack.Screen name="ChangePin" component={ChangePin} />
      <HomeStack.Screen name="TouchID" component={TouchID} />
      <HomeStack.Screen name="MyDetails" component={MyDetails} />
      <HomeStack.Screen name="EditDetails" component={EditDetails} />
      <HomeStack.Screen name="EditEmail" component={EditEmail} />
      <HomeStack.Screen name="EditAddress" component={EditAddress} />
      <HomeStack.Screen name="EditPhone" component={EditPhone} />
      <HomeStack.Screen name="AboutUs" component={AboutUs} />
      <HomeStack.Screen name="DosyWorks" component={DoshyWorks} />
      <HomeStack.Screen name="ContactUs" component={ContactUs} />
      <HomeStack.Screen name="Terms" component={TermsPrivacy} />
      <HomeStack.Screen name="Lastname" component={Lastname} />

      <HomeStack.Screen name="DOB" component={DOB} />
    </HomeStack.Navigator>
  );
}

function NestedNav() {
  return (
    <NestStack.Navigator
      initialRouteName={'DoshyWorks'}
      mode="card"
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <HomeStack.Screen name="DoshyWorks" component={DoshyWorks} />
    </NestStack.Navigator>
  );
}

function LoginNav() {
  return (
    <LoginStack.Navigator
      initialRouteName={'Home'}
      mode="card"
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="ResetPIN" component={ResetPIN} />
    </LoginStack.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer
      screenOptions={{
        cardStyleInterpolator: forFade,
      }}>
      <Stack.Navigator
        initialRouteName="SplashNav"
        mode="card"
        headerMode="none">
        <Stack.Screen name="SplashNav" component={SplashNav} />
        <Stack.Screen name="homeNav" component={HomeNav} />
        <Stack.Screen name="LoginNav" component={LoginNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
