import React from 'react';
import {View, Dimensions, Modal, Text, TouchableOpacity, StatusBar} from 'react-native';
import TextView from 'comp/TextView';
import R from 'res/R';
import Utils from "res/Utils";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-simple-toast';

export default class ResetPINScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      pin1: '',
      pin2: '',
      code1status: false,
      clearinput: false,
      code1status2: false,
      clearinput2: false,
    };
  }

  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
  }

  checkInput() {
    if (this.state.pin1 == '') {
      // Toast.show("Please enter first pin.",Toast.SHORT)
    } else if (this.state.pin2 == '') {
      // Toast.show("Please enter confirm your pin.",Toast.SHORT)
    } else {
      if (this.state.pin1 === this.state.pin2) {
        // Toast.show('New PIN saved.', Toast.SHORT);
        // this.props.newPinInputProp();

        // this.props.navigation.goBack(null);
        // this.setModalVisibility();

        let inputs = {
          'newpin': this.state.pin2
        };
        console.log("Check entered data");
        console.log(inputs);
        Utils.ApiPostwithBodyWithAuth(
          R.constants.Api.updatePIN,
          JSON.stringify(inputs),
          (response = (data) => {
            console.log("data updated");
            console.log(data);
            // Toast.show('Your PIN has been updated!.', Toast.SHORT);
            this.setModalVisibility();
          }))


      } else {
        Toast.show('PINs do not match.', Toast.SHORT);
      }
    }
  }

  _renderModal() {
    const {
      blurOnSubmit,
      keyboardType,
      label,
      nextField,
      placeholder,
    } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisibility}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        // this.props.navigation.navigate('Settings')
        //   this.setModalVisibility();
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
              
                this.setModalVisibility();
                this.props.newPinInputProp();
               
              }}>
              <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

 

  render() {
    return (
      <KeyboardAwareScrollView>
        <View
          style={{
            height: Dimensions.get('window').height - 80,
            backgroundColor: '#fff',
            paddingTop: 50,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TextView
              textValue={`Set your new PIN`}
              textStyle={{
                color: R.color.lightgrey,
                fontSize: 16,
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <OTPInputView
              style={{width: 250, height: 100, paddingHorizontal: 10}}
              pinCount={4}
              code={this.state.pin1} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({pin1: code});
                if(this.state.pin1.length == 0 && this.state.pin1 == '' && this.state.code1status == false){

                  this.setState({
                    clearinput: false
                  })

                }else if(this.state.pin1.length == 1 && this.state.pin1 != '' && this.state.code1status == false) {
                  this.setState({
                    code1status: true,
                    clearinput: false
                  })
                }else if(this.state.pin1.length == 1 && this.state.pin1 != '' && this.state.code1status == true) {
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
              autoFocusOnLoad={true}
              secureTextEntry={true}
              codeInputFieldStyle={{
                width: 50,
                height: 60,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#bbbbbb',
                marginHorizontal: 5,
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
              }}
              onCodeFilled={(inpCode) =>
                this.setState({pin1: inpCode}, () => this.checkInput())
              }
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TextView
              textValue={`Confirm PIN`}
              textStyle={{
                color: R.color.lightgrey,
                fontSize: 16,
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <OTPInputView
              autoFocusOnLoad={false}
              secureTextEntry={true}
              style={{width: 250, height: 100, paddingHorizontal: 10}}
              pinCount={4}
              code={this.state.pin2} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({pin2: code});
                if(this.state.pin2.length == 0 && this.state.pin2 == '' && this.state.code1status2 == false){

                  this.setState({
                    clearinput2: false
                  })

                }else if(this.state.pin2.length == 1 && this.state.pin2 != '' && this.state.code1status2 == false) {
                  this.setState({
                    code1status2: true,
                    clearinput2: false
                  })
                }else if(this.state.pin2.length == 1 && this.state.pin2 != '' && this.state.code1status2 == true) {
                  this.setState({
                    clearinput2: true
                  })
                  setTimeout(()=>{
                    this.setState({
                      code1status2: false
                    })
                  },2000);
                }
              }}
              codeInputFieldStyle={{
                width: 50,
                height: 60,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#bbbbbb',
                marginHorizontal: 5,
                alignItems: 'center',
                fontSize: 20,
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
              onCodeFilled={(inpCode) =>
                this.setState({pin2: inpCode}, () => this.checkInput())
              }
            />
          </View>
          <TextView
            textValue={
              'Don’t use easy combinations like 1234\nor your date of birth'
            }
            textStyle={{
              color: R.color.lightgrey,
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
            }}
          />
        {this._renderModal()}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
