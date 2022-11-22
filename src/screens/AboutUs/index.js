import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Iconf from 'react-native-vector-icons/Feather';
import TextView from 'comp/TextView';
import Header from 'comp/Header';
import R from 'res/R';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
const Row = ({title, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginHorizontal: moderateScale(25),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: moderateScale(23),
        }}>
        <TextView
          textValue={title}
          textStyle={{
            margin: moderateScale(5),
            fontSize: RFValue(16),
            fontWeight: 'bold',
            color: '#636363',
          }}
        />

        <Image
          style={{transform: [{rotateY: '180deg'}]}}
          source={R.Images.backArrow}
        />
      </TouchableOpacity>
      <View style={{height: verticalScale(22)}} />
      <View
        style={{
          width: '90%',
          height: verticalScale(1),
          backgroundColor: '#bbbbbb',
          borderWidth: moderateScale(0.1),
          marginLeft: moderateScale(25),
          marginRight: moderateScale(25),
          opacity: 0.4,
        }}
      />
      <View />
    </View>
  );
};

export default class AboutUs extends React.Component {
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
            title="About Doshy"
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
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('DoshyWorks');
              }}
              style={{
                marginHorizontal: moderateScale(25),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(23),
              }}>
              <TextView
                textValue={'How Doshy works'}
                textStyle={{
                  fontFamily: 'OpenSans-Bold',
                  margin: moderateScale(5),
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  color: '#636363',
                }}
              />

              <Image
                style={{transform: [{rotateY: '180deg'}]}}
                source={R.Images.backArrow}
              />
            </TouchableOpacity>
            <View style={{height: verticalScale(22)}} />
            <View
              style={{
                width: '90%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: moderateScale(0.1),
                marginLeft: moderateScale(25),
                marginRight: moderateScale(25),
                opacity: 0.4,
              }}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ContactUs');
              }}
              style={{
                marginHorizontal: moderateScale(25),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(23),
              }}>
              <TextView
                textValue={'Contact us'}
                textStyle={{
                  fontFamily: 'OpenSans-Bold',
                  margin: moderateScale(5),
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  color: '#636363',
                }}
              />

              <Image
                style={{transform: [{rotateY: '180deg'}]}}
                source={R.Images.backArrow}
              />
            </TouchableOpacity>
            <View style={{height: verticalScale(22)}} />
            <View
              style={{
                width: '90%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: moderateScale(0.1),
                marginLeft: moderateScale(25),
                marginRight: moderateScale(25),
                opacity: 0.4,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('TermsPrivacy');
              }}
              style={{
                marginHorizontal: moderateScale(25),
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: moderateScale(23),
              }}>
              <TextView
                textValue={'Terms & Privacy'}
                textStyle={{
                  fontFamily: 'OpenSans-Bold',
                  margin: moderateScale(5),
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  color: '#636363',
                }}
              />

              <Image
                style={{transform: [{rotateY: '180deg'}]}}
                source={R.Images.backArrow}
              />
            </TouchableOpacity>
            <View style={{height: verticalScale(22)}} />
            <View
              style={{
                width: '90%',
                height: verticalScale(1),
                backgroundColor: '#bbbbbb',
                borderWidth: moderateScale(0.1),
                marginLeft: moderateScale(25),
                marginRight: moderateScale(25),
                opacity: 0.4,
              }}
            />

            <View />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              padding: moderateScale(5),
              justifyContent: 'space-between',
            }}>
            <TextView
              textValue={'To delete your account, please contact us'}
              textStyle={{fontSize: RFValue(12), color: '#bbbbbb'}}
            />
            <TextView
              textValue={'ver 0.01'}
              textStyle={{fontSize: RFValue(12), color: '#bbbbbb'}}
            />
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
