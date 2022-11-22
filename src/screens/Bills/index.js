import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Current from 'screens/Bills/Current';
import Settled from 'screens/Bills/Settled';
import Header from 'comp/Header';
import R from 'res/R';
import Icon from 'react-native-vector-icons/Feather';
import TextView from 'comp/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {StatusBar} from 'react-native';
export default class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selTab: '1',
    };
  }




  nav_BillDetails(data) {
    this.props.navigation.navigate('BillDetails', {data: JSON.stringify(data)});
  }

  nav_settledBillDetails(data){
    console.log("settled data");
    console.log(data);
    this.props.navigation.navigate('settledBillDetails', {data: JSON.stringify(data)});
  }

  renderTabs = () => {
    if (this.state.selTab == 1) {
      return <Current openDetails={(data) => this.nav_BillDetails(data)} />;
    }
    if (this.state.selTab == 2) {
      return <Settled openDetails={(data) => this.nav_settledBillDetails(data)}/>;
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
       <View style={{flex: 1}}>
          <Header title={'My bills'} hideElevation={true} />
          <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                height: verticalScale(50),
                backgroundColor: 'white',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.setState({selTab: 1})}>
                <TextView
                  textValue={`Current`}
                  textStyle={{
                    fontFamily: 'OpenSans-Bold',
                    color:
                      this.state.selTab == 1
                        ? R.color.appTheme
                        : R.color.lightgrey2,
                    fontSize: 16,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: moderateScale(0),
                    height: verticalScale(2),
                    width: '100%',
                    borderRadius: 100,
                    backgroundColor:
                      this.state.selTab == 1 ? R.color.appTheme : '#fff',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.setState({selTab: 2})}>
                <TextView
                  textValue={`Settled`}
                  textStyle={{
                    fontFamily: 'OpenSans-Bold',
                    color:
                      this.state.selTab == 2
                        ? R.color.appTheme
                        : R.color.lightgrey2,
                    fontSize: 16,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: moderateScale(0),
                    height: verticalScale(2),
                    width: '100%',
                    borderRadius: 100,
                    backgroundColor:
                      this.state.selTab == 2 ? R.color.appTheme : '#fff',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: verticalScale(2.5),
                width: '100%',
                backgroundColor: '#d3d3d3',
              }}
            />
            <View style={{flex: 1}}>{this.renderTabs()}</View>
            {/*<View style={{width: '100%', height: 2, flexDirection: 'row'}}>
              <View style={{flex: 1}} />
              <View style={{flex: 1, backgroundColor: R.color.appTheme}} />
              <View style={{flex: 1}} />
            </View>*/}
          </View>
          </ScrollView>
        </View>  
        <View style={{height:50,borderTopWidth:1,borderTopColor:'#bbb',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=> { Actions.Notification() }}>
            <Icon name="bell" color="#636363" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center',borderTopWidth:2,borderTopColor:'#4083ff'}}>
            <TouchableOpacity onPress={()=> { Actions.Bills() }}>
            <Icon name="file" color="#4083ff" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{height:50,alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=> { Actions.Account() }}>
            <Icon name="user" color="#636363" size={24} />
            </TouchableOpacity>
          </View>
  </View>



      </SafeAreaView>
    );
  }
}
