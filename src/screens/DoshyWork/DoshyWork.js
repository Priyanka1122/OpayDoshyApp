import React from 'react';
import {SafeAreaView, ScrollView, View, Text, Image, StatusBar,TouchableOpacity} from 'react-native';
import Header from '../../res/components/Header';
import R from 'res/R';
import {RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import Iconf from 'react-native-vector-icons/Feather';
export default class DosyWorks extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View style={{backgroundColor: 'white'}}>
          <Header
            title={'How Doshy works'}
            showBackButton={true}
            backPress={() => this.props.navigation.goBack(null)}
          />
          <View
            style={{
              //marginVertical: 5,
              height: 1,
              width: '100%',
              backgroundColor: 'rgba(187,187,187,0.5)',
            }}
          />
        </View>
        {/* <View style={{marginTop: '25%', marginLeft: '5%'}}>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: RFValue(30),
              color: '#4083FF',
              fontWeight: 'bold',
            }}>
            How it works
          </Text>
          </View>*/}
                  <View style={{flex:1}}>
        <ScrollView style={{width:'100%',backgroundColor:'#fff'}}>
        <View
          style={{
            marginTop: '25%',
            flexDirection: 'row',
            marginLeft: '5%',
            marginHorizontal: '5%',
          }}>
          <Image source={R.Images.profile} />
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontWeight: '600',
              fontSize: RFValue(16),
              color: '#636363',
              marginLeft: '5%',
              marginRight: '5%',
            }}>
            Sign up
          </Text>
        </View>
        <View
          style={{
            marginTop: '25%',
            flexDirection: 'row',
            marginLeft: '5%',
            marginHorizontal: '10%',
          }}>
          <Image source={R.Images.arrowside} />
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontWeight: '600',
              fontSize: RFValue(16),
              color: '#636363',
              marginLeft: '5%',
              marginRight: '5%',
            }}>
            Auto-forward your email bills to Doshy (we’ll help you with this)
          </Text>
        </View>
        <View
          style={{
            marginTop: '25%',
            flexDirection: 'row',
            marginLeft: '5%',
            marginHorizontal: '5%',
          }}>
          <Image source={R.Images.document} />
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontWeight: '600',
              fontSize: RFValue(16),
              color: '#636363',
              marginLeft: '5%',
              marginRight: '5%',
            }}>
            Doshy uploads your bills to your account as they come in
          </Text>
        </View>
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
      </SafeAreaView>
    );
  }
}
