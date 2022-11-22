import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import Header from 'comp/Header';
import Utils from 'res/Utils';
import R from 'res/R';
import moment from 'moment';
import TextView from 'comp/TextView';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
export default class Notification extends React.Component {
  state = {
    data: [],
    show: false
  };
  componentDidMount() {
    Utils.ApiPost(
      R.constants.Api.notificationsList,
      'GET',
      (response = (data) => {
        console.log('*************GET NOTIFICATION*************');
        console.log(data.data.data);
        var notificationsList = data.data.data;

        this.setState({
          data: notificationsList,
          show: true
        });

        for (let key of notificationsList) {
          var date = new Date(key.createdAt);
          console.log(date);
          var newDate =
            date.getDate() +
            '/' +
            date.getMonth() +
            1 +
            '/' +
            date.getFullYear();
            console.log(newDate);
          var currDate =
            new Date().getDate() +
            '/' +
            new Date().getMonth() +
            1 +
            '/' +
            new Date().getFullYear();
          var yesterdaydate = new Date(Date.now() - 864e5);
          var newyesterdaydate =
            yesterdaydate.getDate() +
            '/' +
            yesterdaydate.getMonth() +
            1 +
            '/' +
            yesterdaydate.getFullYear();

          if (newDate == currDate) {
            key.date = 'Today';
          } else if (newDate == newyesterdaydate) {
            key.date = 'Yesterday';
          } else {
            key.date = new Date(date);
            console.log(key.date);
            key.date =
              date.toDateString().split(' ')[2] +
              ' ' +
              date.toDateString().split(' ')[1];
          }
          this.setState({
            data: notificationsList,
          });
        }
      }),
    );
  }

  render() {
    if(this.state.data.length == 0 && this.state.show == true){
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Header title={'Notifications'} />
          <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 25,
                    paddingRight: 20,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{                          
                          fontSize: 16,
                          fontWeight: '700',
                          fontFamily: 'OpenSans-Bold',
                          color: R.color.lightgrey
                          }}>No Notifications Found!</Text>
                  </View>
          </TouchableOpacity>
        </View>
      )
    }else {
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Header title={'Notifications'} />
          <View
            style={{
              width: '100%',
              height: verticalScale(1),
              backgroundColor: '#bbbbbb',
              borderWidth: 0,
              opacity: 0.4,
            }}
          />
          <FlatList
            data={this.state.data}
            style={{flex: 1}}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      //width: Dimensions.get('screen').width / 1.2,
                      width: '82.5%',
                      marginStart: moderateScale(5),
                      marginVertical: moderateScale(15),
                      padding: moderateScale(5),
                      paddingHorizontal: 15,
                      paddingRight: 5,
                    }}>
                    <TextView
                      textValue={item.title}
                      lines={1}
                      textStyle={{
                        fontFamily: item.imp
                          ? 'OpenSans-Bold'
                          : 'OpenSans-Regular',
                        //fontFamily: 'OpenSans-Bold',
                        fontSize: 16,
                        //fontWeight: 'bold',
                        color: '#636363',
                        //color: item.imp ? '#FF0000' : '#636363',
                      }}
                    />
                    <TextView
                      textValue={item.Notification}
                      //lines={2}
                      textStyle={{
                        fontFamily: item.imp
                          ? 'OpenSans-Bold'
                          : 'OpenSans-Regular',
                        //fontFamily: 'OpenSans-Bold',
                        fontSize: 14,
                        color: '#636363',
                        //color: item.imp ? '#FF0000' : '#636363',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      //width: Dimensions.get('screen').width / 5.5,
                      width: '17.5%',
                      paddingRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: moderateScale(-30),
                    }}>
                    <TextView
                      lines={1}
                      textValue={item.date}
                      textStyle={{
                        //fontFamily: 'OpenSans-Regular',
                        fontFamily: item.imp
                          ? 'OpenSans-Bold'
                          : 'OpenSans-Regular',
                        fontSize: RFValue(12),
                        color: '#bbbbbb',
                        //color: item.imp ? '#FF0000' : '#bbbbbb',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      height: 1,
                      left: 0,
                      right: 0,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: verticalScale(1),
                        backgroundColor: '#bbbbbb',
                        borderWidth: 0,
                        opacity: 0.4,
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
          {/* <View style={{width: '100%', height: 2, flexDirection: 'row'}}>
            <View style={{flex: 1, backgroundColor: R.color.appTheme}} />
            <View style={{flex: 1}} />
            <View style={{flex: 1}} />
          </View> */}
  
          <View style={{height:50,borderTopWidth:1,borderTopColor:'#bbb',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center',borderTopWidth:2,borderTopColor:'#4083ff'}}>
              <TouchableOpacity onPress={()=> { Actions.Notification() }}>
              <Icon name="bell" color="#4083ff" size={24} />
              </TouchableOpacity>
            </View>
            <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=> { Actions.Bills() }}>
              <Icon name="file" color="#636363" size={24} />
              </TouchableOpacity>
            </View>
            <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=> { Actions.Account() }}>
              <Icon name="user" color="#636363f" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

  }
}
