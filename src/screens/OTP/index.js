import React from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  StatusBar,
} from 'react-native';
import TextView from 'comp/TextView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import Utils from 'res/Utils';
import R from 'res/R';
import Loader from 'comp/Loader';
export default class OTP extends React.Component {
  constructor() {
    super();
    this.state = {
      selTab: 1,
      mobileNum: '',
      modalVisibility: false,
      contentType: 0,
      loading: false,
      data: '',
    };
  }

  backButton() {
    this.setState({selTab: 1});
  }

  _render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        {this.state.selTab == 1 && (
          <EnterDetailsView sendOtpProp={(data) => this.sendOtp(data)} />
        )}
        {this.state.selTab == 2 && (
          <EnterOTPView
            goBackProp={this.backButton.bind(this)}
            resendProp={this.reSendCode.bind(this)}
            verifyOTPProp={this.verifyOTP.bind(this)}
            mobileNumProp={this.state.mobileNum}
          />
        )}
        {this._renderModal()}
      </View>
    );
  }
  render() {
    return (
      <KeyboardAwareScrollView
        style={{
          height: Dimensions.get('screen').height,
          backgroundColor: '#fff',
        }}>
        {this._render()}
      </KeyboardAwareScrollView>
    );
  }
}
