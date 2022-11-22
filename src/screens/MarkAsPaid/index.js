import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';
import Header from 'comp/Header';
import R from 'res/R';
// let data=""
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import SubmitButton from 'comp/SubmitButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import TextView from 'comp/TextView';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
export default class MarkAsPaid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
      balance: '181.00',
      dateVal: moment().format('D MMM YYYY'),
      modalVisibility: false,
    };
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
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{height: 107, width: 270, borderRadius: 10}}>
            <View
              style={{
                backgroundColor: '#EBEBEB',
                alignItems: 'center',
                justifyContent: 'center',
                height: 62,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <TextView
                textValue={'Bill marked as paid'}
                textStyle={{fontSize: 17, marginVertical: 5}}
              />
            </View>

            <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: '#EBEBEB',
                height: 44,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              onPress={() => {
                this.setModalVisibility();
                this.props.navigation.goBack(null);
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

  inputDecimalValue(str) {
    console.log(str, '=======>', str.charAt(str.length - 1));
    let tempChar = str.charAt(str.length - 1);
    if (str.length > this.state.balance.length) {
      if (this.state.balance.includes('.')) {
        if (
          tempChar !== '.' &&
          tempChar !== ' ' &&
          tempChar !== ',' &&
          tempChar !== '-'
        ) {
          console.log('here1');
          this.setState({balance: str});
        } else {
          console.log('here3');
        }
      } else {
        console.log('here2');
        if (this.state.balance.length == 0) {
          if (tempChar == '.') {
            this.setState({balance: '0' + str.replace(/[^0-9.]/g, '')});
          } else {
            this.setState({balance: str.replace(/[^0-9.]/g, '')});
          }
        } else {
          this.setState({balance: str.replace(/[^0-9.]/g, '')});
        }
      }
    }
    if (str.length < this.state.balance.length) {
      this.setState({balance: str});
    }
  }

  render() {
    console.log(this.props.route.params.data);
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Header
          title={'Mark as paid'}
          showBackButton={true}
          crossEnable={true}
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
        <KeyboardAwareScrollView
          style={{backgroundColor: '#fff'}}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: moderateScale(16),
            }}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: moderateScale(10),
              }}>
              <Image
                style={{
                  padding: moderateScale(10),
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: R.color.appTheme,
                  height: verticalScale(45),
                  width: scale(45),
                  borderRadius: moderateScale(4),
                  backgroundColor: 'white',
                  margin: moderateScale(5),
                }}
                source={this.state.data.img}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: moderateScale(3)}}>
              <TextView
                textValue={this.state.data.title}
                textStyle={{
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  color: R.color.lightgrey,
                }}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 7,
                  }}>
                  <TextView
                    textValue={`Balance : $${this.state.data.balanceDue}`}
                    textStyle={{
                      marginHorizontal: 5,
                      fontSize: 14,
                      color: R.color.lightgrey,
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="clock-time-three-outline"
                    size={16}
                    color={R.color.lightgrey}
                  />
                  <TextView
                    textValue={moment(
                      this.state.data.dueDate,
                      'YYYY/MM/DD',
                    ).format('DD MMM YYYY')}
                    textStyle={{
                      marginHorizontal: 5,
                      fontSize: 14,
                      color: R.color.lightgrey,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: moderateScale(22),
            }}>
            <View
              style={{
                padding: moderateScale(20),
                borderRadius: moderateScale(16),
                borderWidth: 2,
                borderColor: '#BBBBBB',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextView
                textValue={`$`}
                textStyle={{
                  fontSize: 26,
                  color: R.color.appTheme,
                  fontWeight: 'bold',
                }}
              />
              <TextInput
                maxLength={8}
                keyboardType={'numeric'}
                style={{
                  fontSize: 26,
                  color: R.color.appTheme,
                  fontWeight: 'bold',
                }}
                onChangeText={(text) => this.inputDecimalValue(text)}
                value={this.state.balance}
              />
            </View>
            <View style={{marginTop: moderateScale(10)}}>
              <Text
                style={{
                  color: '#BBBBBB',
                  textAlign: 'center',
                  fontSize: RFValue(14),
                }}>
                Mark this amount as paid
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: moderateScale(55)}}>
            <TextView
              textValue={`Mark this amount as paid on`}
              textStyle={{fontSize: RFValue(16), color: R.color.lightgrey}}
            />
            <DatePicker
              androidMode={'spinner'}
              style={{width: '40%', borderWidth: 0}}
              date={this.state.dateVal}
              showIcon={false}
              mode="date"
              format="D MMM YYYY"
              minDate="01 jan 1950"
              maxDate={moment().format('DD MMM YYYY')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  alignItems: 'center',
                },
                dateText: {
                  color: R.color.appTheme,
                  fontSize: RFValue(16),
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({dateVal: date}, () => {
                  console.log(this.state.dateVal);
                });
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={{padding: moderateScale(5)}}>
          <SubmitButton
            onButtonClick={() => this.setModalVisibility()}
            textValue={'Mark paid '}
          />
        </View>
        {this._renderModal()}
      </View>
    );
  }
}
