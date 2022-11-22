import React from 'react';
import {
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import TextView from 'comp/TextView';
import Header from 'comp/Header';
import {Actions} from 'react-native-router-flux';

import R from 'res/R';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {SafeAreaView} from 'react-native-safe-area-context';
import Utils from 'res/Utils';
import {RFValue} from 'react-native-responsive-fontsize';
const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import Toast from 'react-native-simple-toast';
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

export default class EditEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      selTab: this.props.data,
      email: this.props.email,
      editemailcheck: false,
      updatemailmodal: false,
    };
    this.email;
  }

  resendCode() {
    console.log('code Resend');
  }

  updateEmail() {
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
  }

  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
  }

  _renderModal2() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.updatemailmodal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          this.setState({
            updatemailmodal: !this.state.updatemailmodal
          })
          // this.props.navigation.goBack(null);
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
              textValue={'Email updated'}
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
                this.setState({
                  updatemailmodal: !this.state.updatemailmodal
                })
                // this.props.navigation.goBack(null);
                Actions.MyDetails();
              }}>
              <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
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
          this.props.navigation.replace('SignUp');
        }}>
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
                textValue={'Verification link sent'}
                textStyle={{fontSize: 17, marginTop: 19}}
              />
              <TextView
                textValue={
                  'We’ve sent you an email with a link to verify your email address.'
                }
                textStyle={{
                  fontSize: 13,
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginTop: 8,
                  marginBottom: 20,
                  fontWeight: 'normal',
                }}
              />
            </View>

            <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.setModalVisibility();
                
                // this.props.navigation.goBack(null)

                if(this.state.editemailcheck == true){
                  this.props.navigation.navigate('MyDetails');
                }else{
                  this.props.navigation.goBack(null)
                }
             
                
              }}
              style={{
                backgroundColor: '#EBEBEB',
                height: 44,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
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
      </Modal>
    );
  }

  renderContent() {
    if (this.state.selTab == 'email') {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: moderateScale(25),
          }}>
          <InputView
            textChange={(text) => this.setState({email: text})}
            inpValue={this.state.email}
            title={'Email'}
          />
        </View>
      );
    }
  }

  updateExistingEmail(){
    this.setState({loading:true});
    if(this.state.email!==""){
          let input={
              "email":String(this.state.email)
          }

          Utils.ApiPostwithBodyWithAuth(R.constants.Api.sendMail,JSON.stringify(input),response=(data)=>{
              console.log(data)
              if(data.res==true){
                  this.setState({
                    editemailcheck: true,
                    updatemailmodal: true,
                  })

                  // Toast.show("UPDATED SUCCESSFULLY!",Toast.SHORT);
                  
                  

                  // this.setModalVisibility()
              }
              else{
                  Toast.show(data.msg,Toast.SHORT)
              }
              this.setState({loading:false})

          })
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
            title={'Update email'}
            backPress={() => {
              this.props.navigation.goBack(null)
            }}
            showBackButton={true}
            backBtntext={'Cancel'}
            showExtraBtn={true}
            extraBtnText={
              this.state.selTab == 'mobile' ? 'Resend Code' : 'Save'
            }
            extraBtnPress={() =>
            {  

                  if (expression.test(String(this.state.email).toLowerCase())) {
                    this.updateExistingEmail();
                  } else {
                    Toast.show(
                      'Enter valid email, please try again.',
                      Toast.SHORT,
                    );
                  }
              
              
            }
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
          {this._renderModal2()}
          {/* <markAsPaidModel visibility={this.state.modalVisibility} /> */}
        </View>
      </SafeAreaView>
    );
  }
}
