import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  StatusBar,
} from 'react-native';
import SubmitButton from 'comp/SubmitButton';
import Header from 'comp/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TextView from 'comp/TextView';
import R from 'res/R';
// import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-date-picker';
export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      isDOB:false,
      modalVisibility: false,
      date: '',
    };
  }

  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  async verifyDate() {
    var newdate = moment(this.state.date).format('DD MMMM YYYY');
    console.log(newdate.toLowerCase());
    const data = JSON.parse(await AsyncStorage.getItem('UserData'));
    if (this.state.date == '') {
      this.setModalVisibility();
    } else {
      console.log(data);
      if((data.dob).toLowerCase() == newdate.toLowerCase()){
        this.props.navigation.replace('PinSetup', {
          page: 1
        });
      }else{
        this.setState({
          modalVisibility: !this.state.modalVisibility
        })
      }
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
              textValue={'Sign in unsuccessful'}
              textStyle={{fontSize: 17, marginVertical: 5}}
            />
            <TextView
              textValue={
                'That’s not the date of birth linked to this account, please try again.'
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
              onPress={() => this.setModalVisibility()}>
              <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Header
          backPress={() => this.props.navigation.goBack(null)}
          showBackButton={true}
          hideElevation={true}
          showExtraBtn={false}
        />
        <ScrollView style={{width: '100%'}}>
          <KeyboardAvoidingView>
            {/*<View style={{backgroundColor: '#fff'}}>*/}
            <View
              style={{
                height: Dimensions.get('screen').height - 65,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: moderateScale(10),

                //flexGrow: 1
              }}>
              <View
                style={{
                  flex: 0.75,
                  justifyContent: 'center',
                  marginTop: moderateScale(100),
                }}>
                <TextView
                  textValue={'Welcome back!'}
                  textStyle={{
                    textAlign: 'center',
                    // minHeight: 75,
                    color: R.color.appTheme,
                    fontSize: 26,
                    fontFamily: 'OpenSans-Bold',
                    fontWeight: 'bold',
                    marginVertical: 10,
                    marginTop: 15,
                  }}
                />
                <TextView
                  textValue={
                    'Looks like you’ve already signed up. Sign back in with your date of birth.'
                  }
                  textStyle={{
                    color: R.color.lightgrey,
                    fontSize: 16,
                    fontFamily: 'OpenSans-SemiBold',
                    marginTop: 10,
                    paddingHorizontal: '10%',
                    //marginVertical: 10,
                    //marginHorizontal: 25,
                    textAlign: 'center',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  marginTop: 94,
                  width: '75%',
                  alignSelf: 'center',
                }}>
                {/* <DatePicker
                  androidMode={'spinner'}
                  style={{
                    width: '100%',
                    marginVertical: 3,
                    borderWidth: 0,
                    fontFamily: 'OpenSans-Bold',
                  }}
                  date={this.state.date}
                  mode="date"
                  format="D MMM YYYY"
                  minDate="01 jan 1950"
                  maxDate={moment().format('DD MMM YYYY')}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={true}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      alignItems: 'flex-start',
                      borderBottomColor:
                        this.state.date == ''
                          ? R.color.lightgrey
                          : R.color.appTheme,
                    },
                    dateText: {
                      fontFamily: 'OpenSans-Bold',
                      color: '#636363',
                      fontSize: 18,
                      fontWeight: 'bold',
                    },
                    dateIcon: {
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({date: date}, () => {
                      this.setState({isDOB: true});
                      console.log(this.state.date);
                    });
                  }}
                /> */}



                  <DatePicker
                    date={this.state.date}
                    showIcon={true}
                    mode="date"
                    allowFontScaling={true}
                    placeholder="Select date"
                    format="D MMMM YYYY"
                    placeholderText={{ color: '#d3d3d3' }}
                    minimumDate= {new Date("01 jan 1950")}
                    maximumDate={new Date(moment(
                      moment().subtract(18, 'year').calendar(),
                      'MM/DD/YYYY',
                    ).format('DD MMMM YYYY'))}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#696969',
                        alignItems: 'flex-start',
                        borderBottomColor: R.color.appTheme,
                      },
                      dateText: {
                        fontFamily: 'OpenSans-Bold',
                        color: '#636363',
                        fontSize: 18,
                        fontWeight: 'bold',
                      },
                    }}
                    onDateChange={(date) => {
                      this.setState({isDOB: true});
                      this.setState({ date: date }, () => { 
                        console.log(this.state.date);
                      });
                    }}
                  />

                  
                {/* <View style={{position: 'absolute',right:0,top:0,bottom:0,justifyContent:'center'}}>
                                <Icon name={"chevron-down"} color={R.color.appTheme} size={24}/>

                            </View> */}
                <TextView
                  textValue={'Date of birth'}
                  textStyle={{
                    fontSize: 16,
                    fontFamily: 'OpenSans-Bold',
                    color:
                      this.state.date == ''
                        ? R.color.lightgrey
                        : R.color.appTheme,
                    fontWeight: 'bold',
                  }}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  // marginBottom: 10,
                  flex: 0.8,
                  //position: 'absolute',
                  // bottom: 0,
                  //marginBottom: '15%',
                }}>

{ 
              (this.state.isDOB == true) ? <SubmitButton
                  disabledButton={this.state.date == ''}
                  onButtonClick={() => {
                    this.verifyDate();
                  }}
                  textValue={'Sign in'}
                /> : null
                
}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        {this._renderModal()}
        {/*</View>*/}
      </SafeAreaView>
    );
  }
}
