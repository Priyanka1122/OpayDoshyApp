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
import R from 'res/R';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {SafeAreaView} from 'react-native-safe-area-context';
import Utils from 'res/Utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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

export default class EditAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      selTab: this.props.data,
      address: this.props.address,
    };
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
              textValue={'Address updated'}
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
                this.props.navigation.goBack(null);
              }}>
              <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderContent() {
    if (this.state.selTab == 'address') {
      return (
        <View style={{flex:1}}>
           <TextView
        textValue={'Address'}
        textStyle={{
          position:'absolute',
          top:65,
          left:20,
          fontFamily: 'OpenSans-Bold',
          color: '#BBBBBB',
          fontSize: RFValue(16),
          fontWeight: 'bold',
          margin: moderateScale(5),
          marginLeft: 0,
        }}
      />

        <GooglePlacesAutocomplete  
          styles={{
            textInputContainer: {
              borderBottomColor:'#bbbbbb',
              borderBottomWidth: 1,
              width:'90%',
              color: R.color.appTheme,
              marginVertical:15,
              marginLeft:'5%',
            },
            textInput: {
              fontFamily: 'Opensans-Bold',
              color: R.color.appTheme,
              fontSize: RFValue(16),
              fontWeight: 'bold',
              height:40,
            }, predefinedPlacesDescription: {
              color: R.color.appTheme,
            },
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyArQ6hSW37cSSMD8bjyELoL6kItIn6IFDc',
            language: 'en',
          }}
        />
    
       </View>
        
    
      );
    }
  }

  renderContent1() {
    return (
      <View
        style={{
         flex: 8,
         alignItems:'flex-start',
          backgroundColor: '#fff',
          paddingHorizontal: moderateScale(20),
        }}>
             <TextView
                textValue={'Address'}
                textStyle={{
                  color: '#bbbbbb',
                  fontFamily:'OpenSans-Bold',
                  fontSize: RFValue(16),
                  fontWeight:'700',
               //   textAlign: 'center',
                  marginTop: moderateScale(11),
                }}
              />
      </View>
    );
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
            title={'Update address'}
            backPress={() => this.props.navigation.goBack(null)}
            showBackButton={true}
            backBtntext={'Cancel'}
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
          {/* {this.renderContent1()} */}
          {this._renderModal()}
          {/* <markAsPaidModel visibility={this.state.modalVisibility} /> */}
        </View>
      </SafeAreaView>
    );
  }
}
