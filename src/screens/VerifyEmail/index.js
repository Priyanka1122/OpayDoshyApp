import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';
import SubmitButton from 'comp/SubmitButton';
import TextInputView from 'comp/TextInputView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TextView from 'comp/TextView';
import R from 'res/R';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
import Utils from 'res/Utils';
import Toast from 'react-native-simple-toast';
import Loader from 'comp/Loader';
export default class VerifyEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisibility: false,
      email: '',
    };
  }
  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
  }

  VerifyEmail(val) {
    this.setState({loading: true}, () => {
      console.log(val);
    });
    if (this.state.email !== '') {
      Utils.getData(
        'UserData',
        (value = (data) => {
          let UserData = JSON.parse(data.value);
          console.log(UserData.auth_key);

          let input = {
            email: String(this.state.email),
          };

          Utils.ApiPostwithBodyWithAuth(
            R.constants.Api.sendMail,
            JSON.stringify(input),
            (response = (data) => {
              console.log(data);
              if (data.res == true) {
                this.setModalVisibility();
              } else {
                Toast.show(data.msg, Toast.SHORT);
              }
              this.setState({loading: false});
            }),
          );
        }),
      );
      //
    }
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
                this.props.navigation.replace('SignUp');
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
  //
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>
          <View
            style={{
              height: Dimensions.get('screen').height - 65,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              paddingHorizontal: moderateScale(10),
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginTop: moderateScale(100),
              }}>
              <TextView
                textValue={'Your contact email'}
                textStyle={{
                  fontFamily: 'Opensans-Bold',
                  textAlign: 'center',
                  color: R.color.appTheme,
                  fontSize: RFValue(26),
                  fontWeight: 'bold',
                  marginVertical: moderateScale(10),
                }}
              />
              <TextView
                textValue={'Please confirm your preferred email \naddress.'}
                textStyle={{
                  fontFamily: 'Opensans-SemiBold',
                  color: R.color.lightgrey,
                  fontSize: RFValue(16),
                  marginTop: 65,
                  //marginBottom: 30,
                  marginHorizontal: moderateScale(25),
                  textAlign: 'center',
                }}
              />
            </View>
            <View style={{flex: 2, marginTop: 45, width: '75%'}}>
              <TextInput
                autoFocus={true}
                allowFontScaling={true}
                keyboardType={'email-address'}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                maxLength={30}
                // onKeyPress={(keyValue)=>{
                //     let nativeEvent= { key: keyValue.nativeEvent.key }
                //     console.log(keyValue)

                // }}
                onSubmitEditing={(event) => {
                  if (expression.test(String(this.state.email).toLowerCase())) {
                    this.VerifyEmail(event.nativeEvent.text);
                  } else {
                    Toast.show(
                      'Enter valid email, please try again.',
                      Toast.SHORT,
                    );
                  }
                }}
                returnKeyLabel={'Submit'}
                returnKeyType={'next'}
                style={{
                  height: verticalScale(60),
                  width: '100%',
                  borderBottomColor: R.color.appTheme,
                  borderBottomWidth: moderateScale(1),
                  color: '#636363',
                  fontFamily: 'Opensans-Bold',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              />
              <TextView
                textValue={'Email address*'}
                textStyle={{
                  marginVertical: moderateScale(5),
                  color: R.color.appTheme,
                  fontFamily: 'Opensans-Bold',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              />
            </View>
            {/* <View style={{position: 'absolute',bottom:0,width: '100%',}}>
                            <SubmitButton disabledButton={!expression.test(String(this.state.email).toLowerCase())} onButtonClick={()=>{this.VerifyEmail()}} textValue={"Next"} />    
                        </View>                             */}
          </View>
          {this._renderModal()}
        </KeyboardAwareScrollView>
        {this.state.loading && <Loader />}
      </View>
    );
  }
}
