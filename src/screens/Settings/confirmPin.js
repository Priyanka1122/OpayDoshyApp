import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  Dimensions,
  Keyboard,
  StatusBar,
} from 'react-native';
import TextView from 'comp/TextView';
import R from 'res/R';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-simple-toast';
import Utils from 'res/Utils';
import Loader from 'comp/Loader';
import Header from 'comp/Header';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../res/responsiveStyle/responsiveStyle';
import { AsyncStorage } from 'react-native';
import { Actions } from "react-native-router-flux";
const pinRef = '';
export default class confirmPin extends React.Component {
  constructor() {
    super();
    this.state = {
      code1: '',
      code2: '',
      loading: false,
      otpinput2: false,
      modalVisibility: false,
      isEnabled: '',
      currentPin: '',
    };
    this.getPinDetails();  
    this._retrieveData('isTouchIdEnabled')
  }

  getPinDetails() {
		Utils.ApiPost(
			R.constants.Api.getProfile,
			"GET",
			(response = (res) => {
				this.setState({
					'currentPin': res.data.data.pin
				});
			})
		);
	}

  _storeData = async (name) => {
    
    try {
      await AsyncStorage.setItem(
        name,
        this.state.isEnabled == '1' ? '0' : '1'
      );
      console.log('data is saved')
    } catch (error) {
      console.log('error saving data', error)
    }
  };

  _retrieveData = async (name) => {
    try {
      
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        this.setState({isEnabled: value})

      }
    } catch (error) {
     
    }
  };

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
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.7)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: '#EBEBEB',
              borderRadius: 10,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextView
              textValue={'Touch ID enabled'}
              textStyle={{fontSize: 17, marginVertical: 5}}
            />
            <TextView
              textValue={
                'Please ensure that only you can log into this device.'
              }
              textStyle={{textAlign: 'center', fontSize: 13, marginVertical: 5}}
            />
            <View
              style={{
                height: 1,
                marginVertical: 5,
                width: '120%',
                backgroundColor: '#fff',
              }}
            />
            <TouchableOpacity
              style={{paddingVertical: 5, paddingHorizontal: 10, marginTop: 10}}
              onPress={() => {
                this.setModalVisibility();
                this.props.navigation.navigate('Settings')
                this.props.navigation.navigate('Settings', {status: this.state.isEnabled == '1' ? '0' : '1'});
              }}>
              <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  verifyCode() {
    if (this.state.code1 == '') {
      console.log('code 1 empty');
    }else {
      if (Number(this.state.code1) !== this.state.currentPin) {
        this.setState({code1: ''}, () =>
          Toast.show('PINs does not match.'),
        );
      } else {
        this.setState({loading: true});
        let inputs = {
          touch_status: true,
        };
        Utils.ApiPostwithBodyWithAuth(
          R.constants.Api.touchStatus,
          JSON.stringify(inputs),
          (response = (data) => {
            console.log('40');
            console.log(data);
            if (data.res == true) {
              Toast.show(data.msg);
              Actions.Settings();
            }else{
              Toast.show(data.msg);
            }
            this.setState({loading: false});
          }),
        );
        console.log('code match');
      }
    }
  }

  //   verifyCode() {
  //   if (this.state.code1 == '') {
  //     console.log('code 1 empty');
  //   } else if (this.state.code2 == '') {
  //     pinRef.focus;
  //     console.log('code 2 empty');
  //   } else {
  //     if (this.state.code1 !== this.state.code2) {
  //       console.log(
  //         'code not match',
  //         this.state.code1,
  //         '===>',
  //         this.state.code2,
  //       );
  //       this.setState({code1: '', code2: ''}, () =>
  //         Toast.show('PINs does not match.'),
  //       );
  //     } else {
  //       this.setState({loading: true});
  //       let inputs = {
  //         pin: this.state.code1,
  //       };
  //       Utils.ApiPostwithBodyWithAuth(
  //         R.constants.Api.pinSetup,
  //         JSON.stringify(inputs),
  //         (response = (data) => {
  //           console.log('40');
  //           console.log(data);
  //           if (data.res == true) {
  //             // Toast.show(data.msg);
  //             this.props.navigation.replace('SignUpSuccess');
  //           }
  //           this.setState({loading: false});
  //         }),
  //       );
  //       // this.props.navigation.replace("SignUpSuccess")
  //       console.log('code match');
  //     }
  //   }
  // }

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
        <Header
          title={'Enable Touch ID'}
          showBackButton={true}
          backPress={() => this.props.navigation.goBack(null)}
        />
        <View
          style={{
            height: Dimensions.get('window').height,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <View style={{flex: 2, justifyContent: 'flex-end'}}>
            <TextView
              textValue={'Enter PIN to enable Touch ID'}
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
            <OTPInputView
              // ref={ref => this.textInputRef = ref}
              keyboardType={'number-pad'}
              style={{width: 250, height: 100, paddingHorizontal: 10}}
              pinCount={4}
              secureTextEntry={true}
              autoFocusOnLoad={true}
              KeyboardType={'number-pad'}
              code={this.state.code1} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({code1: code});
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
              codeInputHighlightStyle={{
                color: R.color.appTheme,
                fontSize: 20,
                borderColor: R.color.appTheme,
              }}
              onCodeFilled={(inpCode) => {
                this.setState({code1: inpCode}, () => {
                    this.verifyCode();
                 
                  // this._storeData('isTouchIdEnabled')
                  // this.setModalVisibility();
                
                  //   this.props.navigation.navigate('Settings');
                });
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
            }}></View>
        </View>
        {this._renderModal()}
        {this.state.loading && <Loader />}
      </KeyboardAwareScrollView>
    );
  }
}
