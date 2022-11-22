import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Iconf from 'react-native-vector-icons/Feather';
import Header from 'comp/Header';
import R from 'res/R';
import Icon from 'react-native-vector-icons/Ionicons';
import TextView from 'comp/TextView';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
const Row = ({onPressAction, title, subTitle, iconName}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPressAction}
      style={{padding: moderateScale(10), flexDirection: 'row', flex: 1}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Icon name={iconName} color={R.color.appTheme} size={24} />
      </View>
      <View
        style={{
          marginVertical: moderateScale(5),
          padding: moderateScale(10),
          marginLeft: moderateScale(20),
          flex: 8,
        }}>
        <TextView
          textValue={title}
          textStyle={{
            fontFamily: 'OpenSans-Bold',
            fontWeight: 'bold',
            fontSize: RFValue(16),
            color: '#636363',
          }}
        />
        <TextView
          lines={1}
          textValue={subTitle}
          textStyle={{
            fontFamily: 'OpenSans-Regular',
            fontWeight: '100',
            fontSize: RFValue(14),
            color: '#636363',
            fontWeight: '400',
          }}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{transform: [{rotateY: '180deg'}]}}
          source={R.Images.backArrow}
        />
      </View>
    </TouchableOpacity>
  );
};

export default class Account extends React.Component {
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
          <Header title={'My account'} />
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
            {/*<View
              style={{
                width: '100%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: 0,
                opacity: 0.4,
                marginLeft: moderateScale(70),
              }}
            />*/}
            <Row
              iconName={'settings-outline'}
              title={'Settings'}
              subTitle={'Notifications, passwords and more'}
              onPressAction={() => this.props.navigation.navigate('Settings')}
            />
            <View
              style={{
                width: '100%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: 0,
                opacity: 0.4,
                marginLeft: moderateScale(70),
              }}
            />
            <Row
              iconName={'md-person-outline'}
              title={'My details'}
              subTitle={'Update your profile details'}
              onPressAction={() => this.props.navigation.navigate('MyDetails')}
            />
            <View
              style={{
                width: '100%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: 0,
                opacity: 0.4,
                marginLeft: moderateScale(70),
              }}
            />
            <Row
              iconName={'md-cloud-outline'}
              title={'About Doshy'}
              subTitle={'All you need to know about Doshy'}
              onPressAction={() => this.props.navigation.navigate('AboutUs')}
            />
            <View
              style={{
                width: '100%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: 0,
                opacity: 0.4,
                marginLeft: moderateScale(70),
              }}
            />
          </ScrollView>
          <View style={{width: '100%', height: 2, flexDirection: 'row'}}>
            <View style={{flex: 1}} />
            <View style={{flex: 1}} />
            <View style={{flex: 1, backgroundColor: R.color.appTheme}} />
          </View>
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
