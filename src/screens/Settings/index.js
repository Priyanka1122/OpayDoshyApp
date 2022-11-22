import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Iconf from 'react-native-vector-icons/Feather';
import Header from 'comp/Header';
import R from 'res/R';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextView from 'comp/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import Utils from 'res/Utils';
import Toast from 'react-native-simple-toast';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {ScreenStackHeaderCenterView} from 'react-native-screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Bills from 'screens/Bills';
import Notification from 'screens/Notification';
import Account from 'screens/Account';
import { AsyncStorage } from 'react-native';

const TabMaterial = createMaterialBottomTabNavigator();
const appModalcontent =
  'Receive notifications about things like:\n* New bills\n* Upcoming bills (with 2 days’ notice)\n* Overdue bills';

const smsModalcontent =
  'Receive texts about things like new bills, upcoming due dates and overdue bills.”';

const notiOn =
  'Notifications may include alerts, sounds and icon badges. These can be configured in Settings.';

const notiOff =
  'Disabling notifications may mean you will miss out on important alerts.';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      enabletouchid: false,
      touchId: false,
      appNoti: null,
      smsNoti: null,
      modalVisibility: false,
      contentType: 0,
      data: '',
      notiModal: false,
    };

    // this.props.route.params.data
    this._retrieveData('isTouchIdEnabled');
  }

 

  _retrieveData = async (name) => {
    try {
      
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {

        console.log('whats the value of it', value);

        this.setState({touchId: value == '1' ? true : false})

      }
    } catch (error) {
     
    }
  };

  setModalVisibility() {
    console.log('ON/OFF NOTIFICATIONS');
    this.setState({modalVisibility: !this.state.modalVisibility});
  }

  componentDidMount() {
    this.onLoadFunction();
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
        {this.state.contentType == 0
          ? this.renderModalAppNotificationInfo()
          : this.renderModalSMSNotificationInfo()}
      </Modal>
    );
  }

  renderModalAppNotificationInfo() {
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          backgroundColor: 'rgba(255,255,255,0.7)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 20,
            paddingHorizontal: 12,
            backgroundColor: '#EBEBEB',
            borderTopLeftRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 10,
            width: '80%',
          }}>
          <TextView
            textValue={'Notifications'}
            textStyle={{fontSize: 17, marginVertical: 5}}
          />
          <TextView
            textValue={appModalcontent}
            textStyle={{
              textAlign: 'left',
              marginTop: 5,
              fontSize: 13,
              lineHeight: 20,
              width: '95%',
            }}
          />
        </View>
        <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
        <TouchableOpacity
          style={{
            //paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: '#EBEBEB',
            height: 44,
            width: '80%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            this.setModalVisibility();
          }}>
          <TextView
            textValue={'Okay'}
            textStyle={{
              fontSize: 17,
              marginTop: moderateScale(2),
              textAlign: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderModalSMSNotificationInfo() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.7)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '70%',
            padding: 20,
            backgroundColor: '#EBEBEB',
            borderTopLeftRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 10,
          }}>
          <TextView
            textValue={'SMS notifications'}
            textStyle={{fontSize: 17, marginVertical: 5}}
          />
          <TextView
            textValue={smsModalcontent}
            textStyle={{textAlign: 'left', fontSize: 13}}
          />
        </View>
        <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: '#EBEBEB',
            height: 44,
            width: '70%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            this.setModalVisibility();
          }}>
          <TextView
            textValue={'Okay'}
            textStyle={{
              fontSize: 17,
              marginTop: moderateScale(5),
              textAlign: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onLoadFunction() {
    Utils.ApiPost(
      R.constants.Api.getDetails,
      'POST',
      (response = (data) => {
        let userData = data.data.data;
        console.log('USerData=====>', userData);
        this.setState({
          // touchId: userData.touch_status,
          appNoti: userData.notification_app_status,
          smsNoti: userData.notification_sms_status,
          enabletouchid: userData.touch_status,
        });
      }),
    );
  }

  callBackFunction(data) {
    console.log(data);
    this.setState({touchId: data});
  }

  SetTouchID() {
    console.log(this.state.touchId);
    if (this.state.touchId) {
      this.props.navigation.navigate('TouchID', {
        callBackFunctionProp: this.callBackFunction.bind(this),
      });
    }
  }

  enableAppNotification() {
    this.setState({loading: true});
    let input = {
      notification_app_status: this.state.appNoti,
    };
    Utils.ApiPostwithBodyWithAuth(
      R.constants.Api.changeAppNotification,
      JSON.stringify(input),
      (response = (data) => {
        Toast.show(data.msg, Toast.SHORT);
        this.setState({loading: false}, () => this.onLoadFunction());
      }),
    );
  }

  enableSmsNotification() {
    console.log(this.state.smsNoti);
    this.setState({loading: true});
    let input = {
      notification_sms_status: !this.state.smsNoti,
    };
    Utils.ApiPostwithBodyWithAuth(
      R.constants.Api.changeSmsNotification,
      JSON.stringify(input),
      (response = (data) => {
        Toast.show(data.msg, Toast.SHORT);
        this.setState({loading: false}, () => this.onLoadFunction());
      }),
    );
  }

  renderModalAppNotificationOn() {
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          backgroundColor: 'rgba(255,255,255,0.7)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 20,
            paddingHorizontal: 12,
            backgroundColor: '#EBEBEB',
            borderTopLeftRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 10,
            width: '80%',
          }}>
          <TextView
            textValue={'“Doshy” Would Like to Send you Notifications'}
            textStyle={{
              fontSize: 17,
              marginVertical: 5,
              textAlign: 'center',
            }}
          />
          <TextView
            textValue={notiOn}
            textStyle={{textAlign: 'center', fontSize: 11, width: '95%'}}
          />
        </View>
        <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
        <View
          style={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: '#EBEBEB',
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              // backgroundColor: '#EBEBEB',
              height: 44,
              width: '50%',
              borderRightWidth: 1,
              borderRightColor: '#fff',
              //borderBottomLeftRadius: 10,
              //borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({
                notiModal: false,
                appNoti: false,
              });
            }}>
            <TextView
              textValue={`Don't Allow`}
              textStyle={{
                fontSize: 17,
                marginTop: moderateScale(2),
                textAlign: 'center',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              //backgroundColor: '#EBEBEB',
              height: 44,
              width: '50%',
              //borderBottomLeftRadius: 10,
              //borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({
                notiModal: false,
                appNoti: true,
              });

              this.enableAppNotification();
            }}>
            <TextView
              textValue={'Allow'}
              textStyle={{
                fontSize: 17,
                marginTop: moderateScale(2),
                textAlign: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderModalAppNotificationOff() {
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          backgroundColor: 'rgba(255,255,255,0.7)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 20,
            paddingHorizontal: 12,
            backgroundColor: '#EBEBEB',
            borderTopLeftRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 10,
            width: '80%',
          }}>
          <TextView
            textValue={'Disable notifications'}
            textStyle={{fontSize: 17, marginVertical: 5}}
          />
          <TextView
            textValue={notiOff}
            textStyle={{textAlign: 'center', fontSize: 13, width: '95%'}}
          />
        </View>
        <View style={{height: 1, width: '120%', backgroundColor: '#fff'}} />
        <View
          style={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: '#EBEBEB',
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              //backgroundColor: '#EBEBEB',
              height: 44,
              width: '50%',
              borderRightWidth: 1,
              borderRightColor: '#fff',
              //borderBottomLeftRadius: 10,
              //borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({
                notiModal: false,
                appNoti: false,
              });
              this.enableAppNotification();
            }}>
            <TextView
              textValue={'Disable'}
              textStyle={{
                fontSize: 17,
                marginTop: moderateScale(2),
                textAlign: 'center',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              //backgroundColor: '#EBEBEB',
              height: 44,
              width: '50%',
              //borderBottomLeftRadius: 10,
              //borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({
                notiModal: false,
                appNoti: true,
              });
            }}>
            <TextView
              textValue={'Cancel'}
              textStyle={{
                fontSize: 17,
                marginTop: moderateScale(2),
                textAlign: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _modalVisible() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.notiModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          this.setState({
            notiModal: false,
          });
        }}>
        {this.state.appNoti == true
          ? this.renderModalAppNotificationOn()
          : this.renderModalAppNotificationOff()}
      </Modal>
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
            title={'Settings'}
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
          <ScrollView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ChangePin')}
              style={{padding: 10, flexDirection: 'row'}}>
              <View style={{flex: 5}}>
                <TextView
                  textValue={'Change PIN'}
                  textStyle={{
                    color: '#636363',
                    fontFamily: 'OpenSans-Bold',
                    margin: 10,
                    fontSize: RFValue(16),
                  }}
                />
              </View>
              {/*<View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{transform: [{rotateY: '180deg'}]}}
                  source={R.Images.backArrow}
                />
              </View>*/}
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: 0,
                opacity: 0.4,
                marginLeft: 30,
              }}
            />
            <View style={{padding: 10, flexDirection: 'row'}}>
              <View style={{flex: 5}}>
                <TextView
                  textValue={'Touch ID'}
                  textStyle={{
                    color: '#636363',
                    fontFamily: 'OpenSans-Bold',
                    margin: 10,
                    fontSize: RFValue(16),
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Switch
                  trackColor={{
                    false: R.color.lightgrey,
                    true: R.color.appTheme,
                  }}
                  thumbColor={'#fff'}
                  onValueChange={(value) => {
                    this.setState({enabletouchid: value}, () => {
                    if(this.state.enabletouchid == true){
                      this.props.navigation.navigate('confirmPin');
                    }else{
                      this.setState({loading: true});
                      let inputs = {
                        touch_status: false,
                      };
                      Utils.ApiPostwithBodyWithAuth(
                        R.constants.Api.touchStatus,
                        JSON.stringify(inputs),
                        (response = (data) => {
                          if (data.res == true) {
                            Toast.show(data.msg);
                            this.onLoadFunction();
                          }else{
                            Toast.show(data.msg);
                          }
                          this.setState({loading: false});
                        }),
                      );
                    }
                    });

                  }}
                  value={this.state.enabletouchid}
                />
                {/* <Switch
                  trackColor={{
                    false: R.color.lightgrey,
                    true: R.color.appTheme,
                  }}
                  thumbColor={'#fff'}
                  onValueChange={(value) => {
                    //                 this.setState({touchId: value})
                    this.props.navigation.navigate('confirmPin');
                  }}
                  value={this.state.touchId}
                /> */}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: 0,
                opacity: 0.4,
                marginLeft: 30,
              }}
            />

            <View style={{padding: moderateScale(10), flexDirection: 'row'}}>
              <View
                style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
                <TextView
                  textValue={'Notifications'}
                  textStyle={{
                    color: '#636363',
                    fontFamily: 'OpenSans-Bold',
                    margin: moderateScale(10),
                    fontSize: RFValue(16),
                  }}
                />

                <TouchableOpacity
                  onPress={() =>
                    this.setState({contentType: 0}, () => {
                      this.setModalVisibility();
                    })
                  }>
                  <Icon
                    name={'info-outline'}
                    color={R.color.appTheme}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{padding: moderateScale(10), flexDirection: 'row'}}>
              <View
                style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
                <TextView
                  textValue={'App'}
                  textStyle={{
                    color: '#636363',
                    fontFamily: 'OpenSans-SemiBold',
                    margin: moderateScale(10),
                    fontSize: RFValue(16),
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Switch
                  trackColor={{
                    false: R.color.lightgrey,
                    true: R.color.appTheme,
                  }}
                  thumbColor={'#fff'}
                  onValueChange={(value) => {
                    this.setState({appNoti: value, notiModal: true});
                    this._modalVisible();
                  }}
                  value={this.state.appNoti}
                />
              </View>
            </View>

            <View style={{padding: 10, flexDirection: 'row'}}>
              <View
                style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
                <TextView
                  textValue={'SMS'}
                  textStyle={{
                    color: '#636363',
                    fontFamily: 'OpenSans-SemiBold',
                    margin: 10,
                    fontSize: RFValue(16),
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Switch
                  trackColor={{
                    false: R.color.lightgrey,
                    true: R.color.appTheme,
                  }}
                  thumbColor={'#fff'}
                  onValueChange={(value) => {
                    this.setState({smsNoti: value})
                    this.enableSmsNotification();
                  }}
                  value={this.state.smsNoti}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: 0,
                opacity: 0.4,
                marginLeft: 30,
              }}
            />
          </ScrollView>
          {this._renderModal()}
          {this._modalVisible()}
        </View>




        <View style={{height:50,borderTopWidth:1,borderTopColor:'#bbb',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=> { Actions.Notification() }}>
            <Iconf name="bell" color="#636363" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=> { Actions.Bills() }}>
            <Iconf name="file" color="#636363" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center',borderTopWidth:2,borderTopColor:'#4083ff'}}>
            <TouchableOpacity onPress={()=> { Actions.Account() }}>
            <Iconf name="user" color="#4083ff" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
