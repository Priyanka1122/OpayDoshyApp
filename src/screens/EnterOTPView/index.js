import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';

import Header from 'comp/Header';
import TextInputView from 'comp/TextInputView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TextView from 'comp/TextView';
import R from 'res/R';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {moderateScale} from '../../res/responsiveStyle/responsiveStyle';
import Utils from 'res/Utils';
import Loader from 'comp/Loader';

export default class EnterOTPView extends React.Component {
  constructor() {
    super();
    this.state = {
      clearinput: false,
      codestatus: false,
      code: '',
      modalVisibility: false,
      loading: false,
      deviceotp: ''
    };
  }

  componentDidMount() {
    console.log("check route params*************************************");
    console.log(this.props);
    this.setState({
      deviceotp: this.props.deviceotp
    })
  }

  verifyOTP(inpCode) {
    Keyboard.dismiss();
    this.props.verifyOTPProp(inpCode);
  }

  sendOtpProp() {
    let mobileNumProp = this.props.data;
    console.log('mobileNumProp===>', mobileNumProp.split(' ').join(''));
    this.setState({loading: true});
    let formdata = {
      mobile: mobileNumProp.split(' ').join(''),
      device_token: 'qwerhiodfhhgdsa',
    };
    Utils.ApiPostwithBodyWithoutAuth(
      R.constants.Api.sendOTP,
      JSON.stringify(formdata),
      (response = (data) => {
        console.log("CHECKKKKKKKKKKKKKKKKK");
        console.log('*****', data);
        
        // if (data.res == true) {
          this.setState({
            'deviceotp':data.data.otp
          })
          Keyboard.dismiss();
          // Utils.storeData('UserData', JSON.stringify(data.data));
          this.setState({contentType: 0}, () => this.setModalVisibility());
        // }
        this.setState({loading: false}, () => {});
      }),
    );
  }

  inpCodeCheck(str) {
    let lastChar = str.charAt(str.length - 1);
    console.log(lastChar, '=======', /^\d+$/.test(lastChar));
    if (str.length > this.state.code.length) {
      if (/^\d+$/.test(lastChar)) {
        this.setState({
          code: str,
        });
      } else {
        console.log('======>', /^\d+$/.test(lastChar));
        this.setState({code: str.slice(0, -1)});
      }
    }
    if (str.length < this.state.code.length) {
      this.setState({code: str});
    }
  }

  verifyOTPProp(code) {
    console.log(this.state.deviceotp);
    this.setState({loading: true});
    let formdata = {
      otp: code,
      deviceotp: this.state.deviceotp
    };
    Utils.ApiPostwithBodyWithAuth(
      R.constants.Api.verifyOTP,
      JSON.stringify(formdata),
      (response = (data) => {
        console.log("***************REDIRECTION*****");
        console.log(data);
        if (data.res == true) {
          Keyboard.dismiss();
          this.setState({selTab: 1}, () => {
            if (data.data.accountStatus == 'N') {
              console.log('1');
              this.props.navigation.replace('VerifyEmail');
            }
            if (data.data.accountStatus == 'O') {
              console.log('2');
              this.props.navigation.replace('SignIn');
            }
            if (data.data.accountStatus == 'B') {
              this.setState({contentType: 2}, () => this.setModalVisibility());
            }
          });
        }
        if (data.res == false) {
          this.setState({contentType: 1}, () => this.setModalVisibility());
        }
        this.setState({loading: false});
      }),
    );
  }

  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
  }

  _renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisibility}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          this.setModalVisibility();
        }}>
        {this.state.contentType == 0
          ? this._renderModalWOTP()
          : this.state.contentType == 1
          ? this._renderModalROTP()
          : ''}
      </Modal>
    );
  }

  _renderModalROTP() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: 140, width: 270, borderRadius: 10}}>
          <View
            style={{
              backgroundColor: '#EBEBEB',
              alignItems: 'center',
              justifyContent: 'center',
              height: 95,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <TextView
              textValue={'Incorrect code'}
              textStyle={{fontSize: 17, marginTop: 19}}
            />
            <TextView
              textValue={
                'The code you’ve entered isn’t correct, pleast try again.'
              }
              textStyle={{
                fontSize: 13,
                marginHorizontal: 20,
                marginTop: 8,
                fontWeight: 'normal',
              }}
            />
          </View>

          <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#EBEBEB',
              height: 44,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => this.setModalVisibility()}>
            <TextView
              textValue={'Okay'}
              textStyle={{
                fontSize: 17,
                textAlign: 'center',
                marginTop: moderateScale(11),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderModalWOTP() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: 140, width: 270, borderRadius: 10}}>
          <View
            style={{
              backgroundColor: '#EBEBEB',
              alignItems: 'center',
              justifyContent: 'center',
              height: 95,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <TextView
              textValue={'Code resent'}
              textStyle={{fontSize: 17, marginTop: 19}}
            />
            <TextView
              textValue={
                'We’ve resent a code to your phone. This may take a couple of minutes.'
              }
              textStyle={{
                fontSize: 13,
                marginHorizontal: 20,
                marginTop: 8,
                fontWeight: 'normal',
              }}
            />
          </View>

          <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#EBEBEB',
              height: 44,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => this.setModalVisibility()}>
            <TextView
              textValue={'Okay'}
              textStyle={{
                fontSize: 17,
                textAlign: 'center',
                marginTop: moderateScale(11),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View
          style={{
            height: Dimensions.get('window').height,
            backgroundColor: '#fff',
          }}>
          <Header
            backPress={() => this.props.navigation.goBack(null)}
            showBackButton={true}
            hideElevation={true}
            showExtraBtn={true}
            extraBtnText={'Resend code'}
            extraBtnPress={() => this.sendOtpProp()}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginHorizontal: moderateScale(64),
            }}>
            <TextView
              textValue={'Verify your phone number'}
              textStyle={{
                fontFamily: 'Opensans-Bold',
                textAlign: 'center',
                color: R.color.appTheme,
                fontSize: 26,
                fontWeight: 'bold',
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextView
              textValue={`We’ve texted a code to 61${this.props.data}`}
              textStyle={{
                color: R.color.lightgrey,
                fontFamily: 'Opensans-SemiBold',
                fontSize: 16,
                textAlign: 'center',
              }}
            />
            <TextView
              textValue={' - enter it below.'}
              textStyle={{
                fontFamily: 'Opensans-SemiBold',
                color: R.color.lightgrey,
                fontSize: 16,
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{flex: 3, width: '100%', alignItems: 'center'}}>
            <OTPInputView
              style={{width: 230, height: 100, paddingHorizontal: 10}}
              pinCount={4}
              // secureTextEntry={true}
              KeyboardType={'number-pad'}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged = {(code) => { 
                this.setState({code:code});
                if(this.state.code.length == 0 && this.state.code == '' && this.state.codestatus == false){

                  this.setState({
                    clearinput: false
                  })

                }else if(this.state.code.length == 1 && this.state.code != '' && this.state.codestatus == false) {
                  this.setState({
                    codestatus: true,
                    clearinput: false
                  })
                }else if(this.state.code.length == 1 && this.state.code != '' && this.state.codestatus == true) {
                  this.setState({
                    clearinput: true
                  })
                  setTimeout(()=>{
                    this.setState({
                      codestatus: false
                    })
                  },2000);
                }
              }}
              autoFocusOnLoad={true}
              codeInputFieldStyle={{
                width: 44,
                fontFamily: 'Opensans-Bold',
                height: 56,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#bbbbbb',
                marginHorizontal: 1,
                alignItems: 'center',
                fontSize: 20,
                color: R.color.lightgrey,
              }}
              codeInputHighlightStyle={
                this.state.clearinput == false ?
                {
                  color: R.color.appTheme,
                  fontSize: 20,
                  borderColor: R.color.appTheme
                } : {
                  color: '#bbbbbb',
                  fontSize: 20,
                  borderColor: '#bbbbbb'
                }
              }
              onCodeFilled={(inpCode) => this.verifyOTPProp(inpCode)}
            />
          </View>
        </View>
        {this._renderModal()}
        {this.state.loading && <Loader />}
      </SafeAreaView>
    );
  }
}
