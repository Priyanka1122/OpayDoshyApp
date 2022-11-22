import React from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
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
import settledBillDetails from 'screens/settledBillDetails';
import Bills from 'screens/Bills';
import Notification from 'screens/Notification';
import Account from 'screens/Account';
import MarkAsPaid from 'screens/MarkAsPaid';
import SpreadWord from 'screens/SpreadWord';
import Settings from 'screens/Settings';
import confirmPin from 'screens/Settings/confirmPin';
import ChangePin from 'screens/ChangePin';
import ChangePin2 from 'screens/ChangePin2';
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
const Routes = () => (
  <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
  <Scene key="root">
      <Scene
        key="Splash"
        component={Splash}
        hideNavBar
        title="Splash"
        
        
        
        
      />
      <Scene
        key="Screens"
        component={Screens}
        hideNavBar
        title="Screens"
        initial={true}
        
        
      />
      <Scene
        key="EnterDetailsView"
        component={EnterDetailsView}
        hideNavBar
        title="EnterDetailsView"
      />
      <Scene
        key="EnterOTPView"
        component={EnterOTPView}
        hideNavBar
        title="EnterOTPView"
      />

<Scene
        key="VerifyEmail"
        component={VerifyEmail}
        hideNavBar
        title="VerifyEmail"
      />

<Scene
        key="SignIn"
        component={SignIn}
        hideNavBar
        title="SignIn"
      />

<Scene
        key="PinSetup"
        component={PinSetup}
        hideNavBar
        title="PinSetup"
      />

<Scene
        key="SignUpSuccess"
        component={SignUpSuccess}
        hideNavBar
        title="SignUpSuccess"
      />

<Scene
        key="Bills"
        component={Bills}
        hideNavBar
        title="Bills"
      />


<Scene
        key="BillDetails"
        component={BillDetails}
        hideNavBar
        title="BillDetails"
      />

<Scene
        key="settledBillDetails"
        component={settledBillDetails}
        hideNavBar
        title="settledBillDetails"
      />

<Scene
        key="Notification"
        component={Notification}
        hideNavBar
        title="Notification"
      />

<Scene
        key="Account"
        component={Account}
        hideNavBar
        title="Account"
      />

<Scene
        key="MyDetails"
        component={MyDetails}
        hideNavBar
        title="MyDetails"
      />

<Scene
        key="Settings"
        component={Settings}
        hideNavBar
        title="Settings"
      />

<Scene
        key="AboutUs"
        component={AboutUs}
        hideNavBar
        title="AboutUs"
      />

<Scene
        key="ContactUs"
        component={ContactUs}
        hideNavBar
        title="ContactUs"
      />

<Scene
        key="DoshyWorks"
        component={DoshyWorks}
        hideNavBar
        title="DoshyWorks"
      />

<Scene
        key="TermsPrivacy"
        component={TermsPrivacy}
        hideNavBar
        title="TermsPrivacy"
      />




<Scene
        key="Landing"
        component={Landing}
        hideNavBar
        title="Landing"
      />

      <Scene
        key="GettingStarted"
        component={GettingStarted}
        hideNavBar
        title="GettingStarted"
      />

    <Scene
        key="SignUp"
        component={SignUp}
        hideNavBar
        title="SignUp"
      />

    <Scene
        key="Lastname"
        component={Lastname}
        hideNavBar
        title="Lastname"
      />

    <Scene
        key="DOB"
        component={DOB}
        hideNavBar
        title="DOB"
        
        
      />

    <Scene
        key="TermCondition"
        component={TermCondition}
        hideNavBar
        title="TermCondition"
      />

          <Scene
        key="StaticContent"
        component={StaticContent}
        hideNavBar
        title="StaticContent"
      />

          <Scene
        key="Login"
        component={Login}
        hideNavBar
        title="Login"
      />

          <Scene
        key="ResetPIN"
        component={ResetPIN}
        hideNavBar
        title="ResetPIN"
      />


                <Scene
        key="TouchID"
        component={TouchID}
        hideNavBar
        title="TouchID"
      />


<Scene
        key="ChangePin"
        component={ChangePin}
        hideNavBar
        title="ChangePin"
      />

<Scene
        key="ChangePin2"
        component={ChangePin2}
        hideNavBar
        title="ChangePin2"
      />


<Scene
        key="confirmPin"
        component={confirmPin}
        hideNavBar
        title="confirmPin"
      />


<Scene
        key="EditDetails"
        component={EditDetails}
        hideNavBar
        title="EditDetails"
      />

<Scene
        key="EditAddress"
        component={EditAddress}
        hideNavBar
        title="EditAddress"
      />

<Scene
        key="EditEmail"
        component={EditEmail}
        hideNavBar
        title="EditEmail"
      />

<Scene
        key="EditPhone"
        component={EditPhone}
        hideNavBar
        title="EditPhone"
      />


<Scene
        key="Home"
        component={Home}
        hideNavBar
        title="Home"
      />

      
  </Scene>
  </Router>
);


const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#fff',
    elevation: 1,
  },
  navTitle: {
    color: '#111',
    textAlign: 'center',
    flex: 1,
    fontSize: 25,
  },
});

export default Routes;
