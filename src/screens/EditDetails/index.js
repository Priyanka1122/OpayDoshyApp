import React from 'react';
import {
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  StatusBar,
  Keyboard,
} from 'react-native';
import TextView from 'comp/TextView';
import Header from 'comp/Header';
import R from 'res/R';
import Utils from 'res/Utils';
import Toast from "react-native-simple-toast";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RFValue} from 'react-native-responsive-fontsize';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
const InputView = ({inpValue, title, textChange}) => {
  return (
    <View style={{marginVertical: 5, marginTop: moderateScale(30)}}>
      <TextInput
        onChangeText={textChange}
        style={{
          fontFamily: 'OpenSans-Bold',
          width: '90%',
          color: R.color.appTheme,
          fontSize: RFValue(16),
          fontWeight: 'bold',
          borderBottomColor: '#BBBBBB',
          borderBottomWidth: 1,
        }}
        value={inpValue}
      />
      <TextView
        textValue={title}
        textStyle={{
          fontFamily: 'OpenSans-Bold',
          color: '#BBBBBB',
          fontSize: RFValue(16),
          fontWeight: 'bold',
          margin: moderateScale(5),
          marginLeft: 0,
        }}
      />
    </View>
  );
};

export default class EditDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      selTab: this.props.data,
      firstName: this.props.firstName,
      midName: this.props.midName,
      lastName: this.props.lastName,
      mobileNum: this.props.mobileNum,
      otp: '',
      verifyotp: '',
    };
    this.getProfile();
  }


  getProfile(){
    Utils.ApiPost(
      R.constants.Api.getProfile,
      'GET',
      (response = (data) => {
        console.log("PROFILE");
        console.log(data);     
        this.setState({
          otp: data.data.data.otp,
        })   
      }),
    );
  }


 

  resendCode() {
    this.setState({loading: true});
    let formdata = {
      old_number: this.props.oldnum,
      mobile: this.props.mobileNum,
      device_token: 'qwerhiodfhhgdsa',
    };
    Utils.ApiPostwithBodyWithoutAuth(
      R.constants.Api.resetNumber,
      JSON.stringify(formdata),
      (response = (data) => {
        console.log('otp rsponse check');
        console.log(data);
        if (data.res == true) {
          Toast.show("OTP has been sent!", Toast.SHORT);
          this.setState({loading: false}, () => {});
          Keyboard.dismiss();
          this.getProfile();
        } else {
          this.setState({loading: false}, () => {});
          // this.state.mobileNum = this.lastNumber;
        }
        
      }),
    );
  }

  setModalVisibility() {
    console.log(this.state.otp);
    console.log(this.state.verifyotp);

    if(this.state.selTab == 'mobile'){

      if(Number(this.state.otp) != Number(this.state.verifyotp)){
        Toast.show("OTP doesn't Matched!", Toast.SHORT);
      }else{
        console.log("UPDATE MOBILE NUMBER");
        console.log(this.props.mobileNum);

        let inputs = {
          mobile: this.props.mobileNum
        };
        console.log("Check all data");
        console.log(inputs);
        Utils.ApiPostwithBodyWithAuth(
          R.constants.Api.update_mobile,
          JSON.stringify(inputs),
          (response = (data) => {
            console.log("data updated");
            console.log(data);
            this.setState({modalVisibility: !this.state.modalVisibility});
          }))
      }



    }else{

    let inputs = {
      first_name: this.state.firstName,
      middle_name: '',
      last_name: this.state.lastName,
      address: '',
      dob: this.props.dob,
      licenceState: '',
      licenceNumber: ''
    };
    console.log("Check all data");
    console.log(inputs);
    Utils.ApiPostwithBodyWithAuth(
      R.constants.Api.updateDetails,
      JSON.stringify(inputs),
      (response = (data) => {
        console.log("data updated");
        console.log(data);
        if(data.res == true){
          this.setState({modalVisibility: !this.state.modalVisibility});
        }else{

        }
      }))

    }
    // 
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
          this.props.navigation.goBack(null);
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
              height: 120,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextView
              textValue={'Details updated'}
              textStyle={{fontSize: 17, marginVertical: 15, marginBottom: 20}}
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
                this.state.selTab == 'mobile'
                  ? this.props.navigation.replace('MyDetails')
                  : this.props.navigation.replace('MyDetails')
              }}>
              <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderContent() {
    if (this.state.selTab == 'name') {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: moderateScale(25),
          }}>
          <InputView
            textChange={(text) => this.setState({firstName: text})}
            inpValue={this.state.firstName}
            title={'First Name'}
          />
          {/* <InputView
            textChange={(text) => this.setState({midName: text})}
            inpValue={this.state.midName}
            title={'Middle name(s)'}
          /> */}
          <InputView
            textChange={(text) => this.setState({lastName: text})}
            inpValue={this.state.lastName}
            title={'Last name'}
          />
        </View>
      );
    }
    if (this.state.selTab == 'mobile') {
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <TextView
              textValue={'Verify your phone\nnumber'}
              textStyle={{
                textAlign: 'center',
                fontFamily: 'OpenSans-Bold',
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
              textValue={`We’ve texted a code to ${this.state.mobileNum}`}
              textStyle={{
                color: R.color.lightgrey,
                fontSize: 16,
                fontFamily: 'OpenSans-Bold',
                textAlign: 'center',
              }}
            />
            <TextView
              textValue={' - enter it below.'}
              textStyle={{
                color: R.color.lightgrey,
                fontSize: 16,
                fontFamily: 'OpenSans-Bold',
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{flex: 4, width: '100%', alignItems: 'center'}}>
            <OTPInputView
              style={{width: 250, height: 100, paddingHorizontal: 10}}
              pinCount={4}
              KeyboardType={"number-pad"}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad={true}
              codeInputFieldStyle={{
                width: 44,
                fontFamily: 'OpenSans-Bold',
                height: 56,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#bbbbbb',
                marginHorizontal: 5,
                alignItems: 'center',
                fontSize: 20,
                color: R.color.lightgrey,
              }}
              codeInputHighlightStyle={{
                color: R.color.appTheme,
                fontSize: 20,
                fontFamily: 'OpenSans-Bold',
                borderColor: R.color.appTheme,
              }}
              onCodeFilled={(inpCode) => {
                console.log(inpCode);
                this.setState({
                  verifyotp: inpCode
                },()=>{
                  this.setModalVisibility();
                })
              }}
            />
          </View>
        </View>
      );
    }
  }


  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Header
            title={
              this.state.selTab == 'name' ? 'Update name' : 'Update mobile'
            }
            backPress={() => this.props.navigation.navigate('MyDetails')}
            showBackButton={true}
            backBtntext={this.state.selTab == 'mobile' ? 'Back' : 'Cancel'}
            showExtraBtn={true}
            extraBtnText={
              this.state.selTab == 'mobile' ? 'Resend Code' : 'Save'
            }
            extraBtnPress={() =>
              this.state.selTab == 'mobile'
                ? this.resendCode()
                : this.setModalVisibility()
            }
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

          {this.renderContent()}
          {this._renderModal()}
          {/* <markAsPaidModel visibility={this.state.modalVisibility} /> */}
        </View>
      </SafeAreaView>
    );
  }
}
