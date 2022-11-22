import React from 'react';
import {View, Text, Modal, TouchableOpacity, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Header from 'comp/Header';
import R from 'res/R';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-simple-toast';
import TextView from 'comp/TextView';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import Utils from 'res/Utils';
import Loader from 'comp/Loader';

export default class ChangePin extends React.Component {
  constructor() {
    super();
    this.state = {
      clearinput: false,
      codestatus: false,
      currentPIN: '',
      newPIN: '',
      confirmPIN: '',
      modalVisibility: false,
      loading: false,
    };
  }

  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
  }
  static propTypes = {
    blurOnSubmit: PropTypes.bool,
    getRef: PropTypes.func,
    keyboardType: PropTypes.oneOf(['numeric']),
    label: PropTypes.string.isRequired,
    nextField: PropTypes.node,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    blurOnSubmit: false,
    getRef: null,
    keyboardType: 'numeric',
    placeholder: '',
    nextField: null,
  };

  setInputRef = (ref) => {
    this.inputRef = ref;

    const {getRef} = this.props;

    if (getRef) {
      getRef(ref);
    }
  };

  _renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisibility}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          this.props.navigation.goBack(null);
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
              textValue={'New PIN saved'}
              textStyle={{fontSize: 17, marginVertical: 5, marginBottom: 20}}
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
              style={{paddingVertical: 0, paddingHorizontal: 10, marginTop: 10}}
              onPress={() => {
                this.props.navigation.goBack(null);
                this.setModalVisibility();
              }}>
              <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  verifyPIN() {
    if (
      this.state.currentPIN !== ''
    ) {
        this.setState({loading: true});
        Actions.ChangePin2({
          currentpin: this.state.currentPIN
        });
        this.setState({loading: false});
        
    }
  }

  render() {
    const {
      blurOnSubmit,
      keyboardType,
      label,
      nextField,
      placeholder,
    } = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Header
            title={'Change PIN'}
            showExtraBtn={true}
            extraBtnText={'Forgot PIN'}
            extraBtnPress={() =>
              // this.props.navigation.navigate('Login', {
              //   screen: 'ResetPIN',
              //   params: {mno: '1234567890', from: 'homeNav'},
              // })

              Actions.Login({
                screen: 'ResetPIN',
                params: {mno: '1234567890', from: 'homeNav'}
              })
            }
            crossEnable={true}
            showBackButton={true}
            backPress={() => this.props.navigation.goBack(null)}
          />
          <View
            style={{
              width: '100%',
              height: verticalScale(1),
              backgroundColor: '#bbbbbb',
              borderWidth: 0,
              opacity: 0.4,
            }}
          />
          <View style={{alignItems: 'center'}}>
            <TextView
              textValue={'Enter your current PIN'}
              textStyle={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 16,
                color: R.color.lightgrey,
                marginTop: 120,
              }}
            />
            <OTPInputView
              style={{
                width: scale(210),
                height: verticalScale(100),
                paddingHorizontal: moderateScale(10),
              }}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              onCodeChanged = {(code) => { 
                this.setState({currentPIN:code});
                if(this.state.currentPIN.length == 0 && this.state.currentPIN == '' && this.state.codestatus == false){

                  this.setState({
                    clearinput: false
                  })

                }else if(this.state.currentPIN.length == 1 && this.state.currentPIN != '' && this.state.codestatus == false) {
                  this.setState({
                    codestatus: true,
                    clearinput: false
                  })
                }else if(this.state.currentPIN.length == 1 && this.state.currentPIN != '' && this.state.codestatus == true) {
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
              secureTextEntry={true}
              KeyboardType={'number-pad'}
              codeInputFieldStyle={{
                width: 44,
                height: 56,
                borderWidth: moderateScale(2),
                borderRadius: moderateScale(15),
                borderColor: '#bbbbbb',
                marginHorizontal: 0,

                alignItems: 'center',
                fontSize: RFValue(20),
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
                fontSize: RFValue(20),
                borderColor: '#bbbbbb'
              }}
              onCodeFilled={(inpCode) =>
                this.setState({currentPIN: inpCode}, () => this.verifyPIN())
              }
            />

            {/* <TextView
              textValue={'Enter your new PIN'}
              textStyle={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 16,
                color: R.color.lightgrey,
                marginTop: 10,
              }}
            />
            <OTPInputView
              style={{
                width: scale(210),
                height: verticalScale(100),
                paddingHorizontal: moderateScale(10),
              }}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad={false}
              secureTextEntry={true}
              KeyboardType={'number-pad'}
              codeInputFieldStyle={{
                width: 44,
                height: 56,
                borderWidth: moderateScale(2),
                borderRadius: moderateScale(15),
                borderColor: '#bbbbbb',
                marginHorizontal: 0,
                outline: 'none',
                alignItems: 'center',
                fontSize: RFValue(20),
                color: R.color.lightgrey,
              }}
              codeInputHighlightStyle={{
                color: R.color.appTheme,
                fontSize: RFValue(20),
                borderColor: R.color.appTheme,
              }}
              onCodeFilled={(inpCode) =>
                this.setState({newPIN: inpCode}, () => this.verifyPIN())
              }
            /> */}

            {/* <TextView
              textValue={'Re-enter your new PIN'}
              textStyle={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 16,
                color: R.color.lightgrey,
                marginTop: 10,
              }}
            /> */}
            {/* <OTPInputView
              style={{
                width: scale(210),
                height: verticalScale(100),
                paddingHorizontal: moderateScale(10),
              }}
              pinCount={4}
              autoFocusOnLoad={false}
              secureTextEntry={true}
              KeyboardType={'number-pad'}
              codeInputFieldStyle={{
                width: 44,
                height: 56,
                borderWidth: moderateScale(2),
                borderRadius: moderateScale(15),
                borderColor: '#bbbbbb',
                marginHorizontal: 0,

                alignItems: 'center',
                fontSize: RFValue(20),
                color: R.color.lightgrey,
              }}
              codeInputHighlightStyle={{
                color: R.color.appTheme,
                fontSize: RFValue(20),
                borderColor: R.color.appTheme,
              }}
              onCodeFilled={(inpCode) =>
                this.setState({confirmPIN: inpCode}, () => this.verifyPIN())
              }
            /> */}
          </View>

          {this._renderModal()}
          {this.state.loading && <Loader />}
        </View>
      </SafeAreaView>
    );
  }
}
