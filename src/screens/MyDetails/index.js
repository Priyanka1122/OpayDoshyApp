import React from 'react';
import {
  View,ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Utils from 'res/Utils';
import Iconf from 'react-native-vector-icons/Feather';
import Header from 'comp/Header';
import TextView from 'comp/TextView';
import R from 'res/R';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
const MenuBtn = ({onPressAction, title, value}) => {
  return (
    <TouchableOpacity
      onPress={onPressAction}
      style={{padding: 10, flexDirection: 'row'}}>
      <View style={{padding: 10, flex: 5}}>
        <TextView
          textValue={value}
          textStyle={{
            fontFamily: 'OpenSans-Bold',
            fontWeight: 'bold',
            color: '#636363',
            fontSize: 16,
          }}
        />
        <TextView
          textValue={title}
          textStyle={{
            fontFamily: 'OpenSans-Bold',
            fontWeight: 'bold',
            color: '#bbbbbb',
            fontSize: 14,
          }}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{transform: [{rotateY: '180deg'}]}}
          source={R.Images.backArrow}
        />
      </View>
      <View
        style={{position: 'absolute', bottom: 0, height: 1, left: 0, right: 0}}>
        <View
          style={{
            width: '100%',
            height: verticalScale(1),
            backgroundColor: '#bbbbbb',
            borderWidth: 0,
            opacity: 0.4,
            marginLeft: moderateScale(20),
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default class MyDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      
      firstName: '',
      lastName: '',
      mobileNum: '',
      email: '',
      dob: ''
    };
    this.updatedetails();
  }

  updatedetails(){
    Utils.ApiPost(
      R.constants.Api.getProfile,
      'GET',
      (response = (data) => {
        console.log("CURREENT PROFILE");
        console.log(data);     
        this.setState({
          firstName: data.data.data.first_name,
          lastName: data.data.data.last_name,
          mobileNum: data.data.data.mobile,
          email: data.data.data.email,
          dob: data.data.data.dob
        })   
      }),
    );
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Header
          title="My details"
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
        <View style={{flex:1}}>
        <ScrollView style={{width:'100%',backgroundColor:'#fff'}}>
        <MenuBtn
          title={'Full Name'}
          value={
            this.state.firstName +
            ' ' +
            this.state.lastName
          }
          onPressAction={() =>
            this.props.navigation.navigate('EditDetails', {
              data: 'name',
              firstName: this.state.firstName,
              midName: this.state.midName,
              lastName: this.state.lastName,
              dob: this.state.dob,
            })
          }
        />
        <MenuBtn
          title={'Mobile'}
          value={'61'+' '+this.state.mobileNum}
          onPressAction={() =>
            this.props.navigation.navigate('EditPhone', {
              data: 'mobile',
              number: this.state.mobileNum,
            })
          }
        />
        {/* <MenuBtn
          title={'Address'}
          value={'xxxxx Victoria 3031'}
          onPressAction={() =>
            this.props.navigation.navigate('EditAddress', {
              data: 'address',
              address: 'xxxxx Victoria 3031',
            })
          }
        /> */}
        <MenuBtn
          title={'Email'}
          value={this.state.email}
          onPressAction={() =>
            this.props.navigation.navigate('EditEmail', {
              data: 'email',
              email: this.state.email,
            })
          }
        />
</ScrollView>
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
      </View>
    );
  }
}
