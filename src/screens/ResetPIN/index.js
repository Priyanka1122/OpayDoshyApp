import React from 'react';
import Header from 'comp/Header';
import {View, StatusBar} from 'react-native';
import InputOTP from 'screens/ResetPIN/InputOTP';
import ResetPINScreen from 'screens/ResetPIN/ResetPINScreen';
import Utils from 'res/Utils';
import R from 'res/R';
import Toast from "react-native-simple-toast";
import { Actions } from "react-native-router-flux";
export default class ResetPIN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selTab: 1,
      mobileNum: '1234567890',
      deviceotp: ''
    };
  }

  componentDidMount() {
    this.setState({
      deviceotp: this.props.deviceotp
    })
    Utils.getData(
      'UserData',
      (value = (data) => {
        console.log(data);
        let UserData = JSON.parse(data.value);
        console.log(UserData.mobile);
        this.setState({
          mobileNum: UserData.mobile
        })
        let input = {
          mobile: UserData.mobile,
        };
      }),
    );
  }

  checkInputOTP(data) {
    if(Number(data) != Number(this.state.deviceotp)){
      Toast.show("Incorrect Pin Entered!!");
    }else{
      this.setState({selTab: 2}, () => console.log(data));
    }
  }

  newPinInputProp(code) {
    console.log("sdfsdfsf");
    Actions.Login();
  }

  renderTab() {
    if (this.state.selTab == 1) {
      return (
        <InputOTP
          mobileNumProp={this.state.mobileNum}
          pinInputProp={(data) => this.checkInputOTP(data)}
        />
      );
    }
    if (this.state.selTab == 2) {
      return (
        <ResetPINScreen newPinInputProp={this.newPinInputProp.bind(this)} />
      );
    }
  }

  render() {
    console.log("check all props");
    console.log(this.props);
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Header
          title={`Reset PIN (${this.state.selTab} of 2)`}
          showExtraBtn={this.state.selTab == 1 ? true : false}
          extraBtnText={'Resend code'}
          extraBtnPress={() => {

           		let inputdata={
								"mobile": this.props.currentphonenumber
							}
							

							Utils.ApiPostwithBodyWithAuth(
								R.constants.Api.resetPin,
								JSON.stringify(inputdata),
								(response = (data) => {
								  console.log('RESET PIN');
								  if (data.res == true) {
                    Toast.show("OTP sent successfully!!");
                    this.setState({
                      deviceotp: data.data
                    })
                    this.props.navigation.navigate("ResetPIN", { from: "LoginNav", deviceotp: data.data });
								  }
								  this.setState({loading: false});
								}),
							);

          }}
          crossEnable={true}
          showBackButton={true}
          backPress={() => this.props.navigation.goBack(null)}
        />

        {this.renderTab()}
      </View>
    );
  }
}
