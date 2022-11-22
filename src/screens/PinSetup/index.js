import React from 'react';
import {View, Text, Dimensions, Keyboard, StatusBar} from 'react-native';
import TextView from 'comp/TextView';
import R from 'res/R';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-simple-toast';
import Utils from 'res/Utils';
import Loader from 'comp/Loader';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../res/responsiveStyle/responsiveStyle';
const pinRef = '';
import { AsyncStorage } from 'react-native';
export default class PinSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      clearinput: false,
      clearinput2: false,
      pincount: 4,
      code1: '',
      code2: '',
      code1status: false,
      code2status: false,
      loading: false,
      otpinput2: false,
      isUserOld: ''
    };
    this.btnRef = React.createRef();
    this._retrieveData('isUserOld');
  }

  _retrieveData = async (name) => {
    try {
      
      const value = await AsyncStorage.getItem(name);
  
      if (value !== null) {
        
        this.setState({isUserOld: value});
      }
    } catch (error) {
     
    }
  };

  verifyCode() {
    if (this.state.code1 == '') {
      console.log('code 1 empty');
      pinRef.focus;
    } else if (this.state.code2 == '') {
      pinRef.focus;
      console.log('code 2 empty');
    } else {
      if (this.state.code1 !== this.state.code2) {
        console.log(
          'code not match',
          this.state.code1,
          '===>',
          this.state.code2,
        );
        this.setState({code1: '', code2: ''}, () =>
          Toast.show('PINs does not match.'),
        );
      } else {
        this.setState({loading: true});
        let inputs = {
          pin: this.state.code1,
        };
        Utils.ApiPostwithBodyWithAuth(
          R.constants.Api.pinSetup,
          JSON.stringify(inputs),
          (response = (data) => {
            console.log('40');
            console.log(data);
            if (data.res == true) {
              // Toast.show(data.msg);
              this.props.navigation.replace('SignUpSuccess');
            }
            this.setState({loading: false});
          }),
        );
        // this.props.navigation.replace("SignUpSuccess")
        console.log('code match');
      }
    }
  }

  focusNextField = (nextField, childref) => {
    alert(nextField);
    React.findDOMNode(this.btnRef[nextField].refs[childref]).focus();
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View
          style={{
            height: Dimensions.get('window').height,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <View style={{flex: 2, justifyContent: 'flex-end'}}>
            <TextView
              textValue={this.state.isUserOld == '1' ? 'And let’s set a new PIN': 'Finally, let’s secure \nyour account'}
              textStyle={{
                fontFamily: 'Opensans-Bold',
                color: R.color.appTheme,
                fontSize: 26,
                textAlign: 'center',
                fontWeight: 'bold',
                marginHorizontal: 20,
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextView
              textValue={
                'Don’t use easy combinations like 1234 or your date of birth'
              }
              textStyle={{
                fontFamily: 'Opensans-SemiBold',
                textAlign: 'center',
                color: '#636363',
                marginHorizontal: 20,
              }}
            />
            <OTPInputView
              // ref={ref => this.textInputRef = ref}
              keyboardType={'number-pad'}
              style={{width: 250, height: 100, paddingHorizontal: 10}}
              pinCount={this.state.pincount}
              secureTextEntry={true}
              autoFocusOnLoad={true}
              KeyboardType={'number-pad'}
              // code={this.state.code1} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({code1:code});
                if(this.state.code1.length == 0 && this.state.code1 == '' && this.state.code1status == false){

                  this.setState({
                    clearinput: false
                  })

                }else if(this.state.code1.length == 1 && this.state.code1 != '' && this.state.code1status == false) {
                  this.setState({
                    code1status: true,
                    clearinput: false
                  })
                }else if(this.state.code1.length == 1 && this.state.code1 != '' && this.state.code1status == true) {
                  this.setState({
                    clearinput: true
                  })
                  setTimeout(()=>{
                    this.setState({
                      code1status: false
                    })
                  },2000);
                }
              }}
              codeInputFieldStyle={{
                width: 44,
                height: 56,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#bbbbbb',
                marginHorizontal: 5,
                alignItems: 'center',
                fontSize: 20,
                fontFamily: 'Opensans-Bold',
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
              onCodeFilled={(inpCode) => {
                this.setState({code1: inpCode}, () => {
                  this.verifyCode();
                  this.focusNextField.bind(this, 'two', '2');
                });
                console.log('code 1', inpCode);
              }}
              clearInputs={
                this.state.code1.length == 4 && this.state.code2.length == 4
                  ? this.state.code1 !== this.state.code2
                  : false
              }
            />
          </View>
          <View
            style={{
              flex: 5,
              alignItems: 'center',
              marginTop: moderateScale(-50),
            }}>
            <TextView
              textValue={'Confirm PIN'}
              textStyle={{color: '#636363', fontFamily: 'Opensans-Bold'}}
            />
            <OTPInputView
              ref={pinRef}
              style={{width: 250, height: 100, paddingHorizontal: 10}}
              pinCount={4}
              editable={this.state.code1.length == 4}
              // code={this.state.code2} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({code2: code});
                if(this.state.code2.length == 0 && this.state.code2 == '' && this.state.code2status == false){

                  this.setState({
                    clearinput2: false
                  })

                }else if(this.state.code2.length == 1 && this.state.code2 != '' && this.state.code2status == false) {
                  this.setState({
                    clearinput2: false,
                    code2status: true
                  })
                }else if(this.state.code2.length == 1 && this.state.code2 != '' && this.state.code2status == true) {
                  this.setState({
                    clearinput2: true
                  })
                  setTimeout(()=>{
                    this.setState({
                      code2status: false
                    })
                  },2000);
                }
              }}
              secureTextEntry={true}
              KeyboardType={'number-pad'}
              autoFocusOnLoad={this.state.otpinput2}
              codeInputFieldStyle={{
                width: 44,
                height: 56,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#bbbbbb',
                marginHorizontal: 5,
                alignItems: 'center',
                fontSize: 20,
                fontFamily: 'Opensans-Bold',
                color: R.color.lightgrey,
              }}
              codeInputHighlightStyle={                
                this.state.clearinput2 == false ?
                {
                  color: R.color.appTheme,
                  fontSize: 20,
                  borderColor: R.color.appTheme
                } : {
                  color: '#bbbbbb',
                  fontSize: 20,
                  borderColor: '#bbbbbb'
                }}
              onCodeFilled={(inpCode) => {
                this.setState({code2: inpCode}, () => this.verifyCode());
                console.log('code 2', inpCode);
              }}
              clearInputs={
                this.state.code1.length == 4 && this.state.code2.length == 4
                  ? this.state.code1 !== this.state.code2
                  : false
              }
            />
          </View>
        </View>
        {this.state.loading && <Loader />}
      </KeyboardAwareScrollView>
    );
  }
}
