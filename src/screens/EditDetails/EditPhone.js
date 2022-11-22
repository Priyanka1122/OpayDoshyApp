import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  StatusBar,
} from 'react-native';
import SubmitButton from 'comp/SubmitButton';
import TextInputView from 'comp/TextInputView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TextView from 'comp/TextView';
import R from 'res/R';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from 'comp/Loader';
import Toast from 'react-native-simple-toast';
import Utils from 'res/Utils';
import Header from 'comp/Header';
export default class EnterDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNum: '',
      data: [],
      phoneNum: '',
      loading: false,
      lastNumber: '',
      formattedMobile:''
    };
  }

  onTextChange(text) {
    let newText = '';
    let cleaned = ('' + text).replace(/\D/g, '');

    if (text.split(' ').join('').length <= 8) {
      if (cleaned) {
        this.setState({mobileNum: newText.replace(/[^0-9]/g, '')});
        for (var i = 0; i < cleaned.length; i++) {
          if (i == 0) {
            newText = '';
          } else if (i == 3) {
            newText = newText + ' ';
          } else if (i == 6) {
            newText = newText + ' ';
          }
          newText = newText + cleaned[i];
        }
        this.setState({mobileNum: newText});
        return;
      }
      this.setState({
        mobileNum: newText,
      });
    } else {
      this.setState({lastNumber: text}) ;
      console.log(
        '======>',
        text.split(' ').join(''),
        '=======>',
        this.state.mobileNum,
      );
      this.setState(
        {
          mobileNum: text.replace(/[^0-9]/g, ''),
        },
        () => {
          this.sendOtpProp(this.state.mobileNum);

        },
      );
    }
  }

  sendOtpProp(mobileNumProp) {
    console.log('mobileNumProp===>', mobileNumProp.split(' ').join(''));
    this.setState({loading: true});
    let formdata = {
      old_number: this.props.number,
      mobile: mobileNumProp.split(' ').join(''),
      device_token: 'qwerhiodfhhgdsa',
    };
    Utils.ApiPostwithBodyWithoutAuth(
      R.constants.Api.resetNumber,
      JSON.stringify(formdata),
      (response = (data) => {
        console.log('otp rsponse check');
        console.log(data);
        if (data.res == true) {
          this.setState({loading: false}, () => {});
          Keyboard.dismiss();
          // Utils.storeData('UserData', JSON.stringify(data.data));

          this.props.navigation.navigate('EditDetails', {
            data: 'mobile',
            mobileNum: this.state.lastNumber,
            oldnum: this.props.number
          });
          // this.setState(
          //   {
          //     mobileNum: mobileNumProp,
          //     data: data.data,
          //   },
          //   () => {
          //     this.props.navigation.navigate('EditDetails', {
          //       data: 'mobile',
          //       mobileNum: '0489 671 978',

          //     });
          //   },
          // );
        } else {
          this.setState({loading: false}, () => {});
          // this.state.mobileNum = this.lastNumber;
        }
        
      }),
    );
  }

  formatePhoneNumber = (phoneNumberString) => {
    let newText = '';
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 0) {
        newText = '(';
      } else if (i == 3) {
        newText = newText + ')';
      } else if (i == 6) {
        newText = newText + '-';
      }
      newText = newText + cleaned[i];
    }
    this.setState({number: newText});
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View style={{flex: 1, flexGrow: 1, backgroundColor: 'white'}}>
          <Header
            title={
              this.state.selTab == 'name' ? 'Update name' : 'Update mobile'
            }
            backPress={() => this.props.navigation.goBack(null)}
            showBackButton={true}
            backBtntext={'Cancel'}
            showExtraBtn={true}
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
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: moderateScale(0),
              marginTop: moderateScale(100),
              backgroundColor: 'white',
            }}>
            <TextView
              textValue={'Change your phone \n number'}
              textStyle={{
                textAlign: 'center',
                fontFamily: 'Opensans-Bold',
                color: R.color.appTheme,

                fontSize: RFValue(26),
                fontWeight: 'bold',
                marginVertical: moderateScale(10),
              }}
            />
          </View>
          <View
            style={{
              width: '75%',
              marginTop: moderateScale(72),
              marginLeft: moderateScale(62),
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Opensans-Bold',
                    color: '#636363',
                    fontSize: RFValue(20),
                    fontWeight: 'bold',
                    right: -3,
                  }}>
                  61
                </Text>
              </View>

              {/* <TextView textValue={"04"} textStyle={{backgroundColor: 'red',height:60,color:'#636363',fontSize:20,fontWeight:'bold'}}/> */}
              <TextInput
                autoFocus={true}
                keyboardType={'phone-pad'}
                editable={!this.state.loading}
                onChangeText={(text) => this.onTextChange(text)}
                //  (text)=>this.setState({mobileNum:text.replace(/[^0-9]/g, '')}

                //   ()=>{
                //      this.state.mobileNum.length>=7?this.props.sendOtpProp(`04${this.state.mobileNum}`):""
                //   }
                //  cleaned = ('' + text).replace(/\D/g, ''),
                //   match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/),
                //this.onTextChange
                //     onChange={
                //         ()=>{
                //            this.state.mobileNum.split(" ").join("").length>=7?this.sendOtpProp(`04${this.state.mobileNum}`):""
                //         }
                //    }
                value={this.state.mobileNum}
                maxLength={15}
                style={{
                  paddingLeft: moderateScale(25),
                  height: verticalScale(60),
                  width: '100%',
                  borderBottomColor: R.color.appTheme,
                  borderBottomWidth: 1,
                  fontFamily: 'Opensans-Bold',
                  color: '#636363',
                  fontSize: RFValue(20),
                  fontWeight: 'bold',
                }}
              />
            </View>

            <TextView
              textValue={'Mobile number'}
              textStyle={{
                marginVertical: moderateScale(5),
                fontFamily: 'Opensans-Bold',
                color: R.color.appTheme,
                fontSize: RFValue(16),
                fontWeight: 'bold',
              }}
            />

            {/* <TextInputView 
                    title={"Mobile number"} keyBoard={'phone-pad'} length={9}  textValue={this.state.mobileNum} 
                    textChange={(text)=>this.setState({mobileNum:text},()=>{
                        this.state.mobileNum.length>=9?this.props.sendOtpProp(this.state.mobileNum):""
                    })}/> */}
          </View>
          <View
            style={{height: '100%', width: '100%', backgroundColor: 'white'}}
          />
        </View>
        {this.state.loading && <Loader />}
      </SafeAreaView>
    );
  }
}
