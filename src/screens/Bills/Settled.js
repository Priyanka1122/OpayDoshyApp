import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import R from 'res/R';
import Utils from 'res/Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import TextView from 'comp/TextView';
import {RFValue} from 'react-native-responsive-fontsize';
const Data = [
  {
    key: '0',
    title: 'Vodafone',
    img: R.Images.aami,
    balanceDue: '170.00',
    offerPrice: '34.99',
    dueDate: '2020/06/20',
    debtType: 'settled',
    upcomingDate: '2020/10/29',
  },
];

export default class Settled extends React.Component {

  constructor() {
    super();
    this.state = {
      billdata: [],
      show: false
    };
    this.getbillerData();
  }


  getbillerData() {
    Utils.ApiPost(
      R.constants.Api.settledBills,
      'GET',
      (response = (data) => {
        console.log("SETTLED BILLSSS");
        console.log(data);
        this.setState({
          billdata:  data.data.billerData,
          show: true
        })
        console.log("check settled bill data");
        console.log(this.state.billdata);
        
      }),
    );
  }


  render() {

    if(this.state.billdata.length == 0 && this.state.show == true){
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
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
                          }}>No Settled Bills Found!</Text>
                  </View>
          </TouchableOpacity>
        </View>
      )
    }else{
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={this.state.billdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.openDetails(item)}
              >
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 25,
                  paddingRight: 20,
                  paddingLeft: 9,
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Image
                    style={{
                      padding: moderateScale(15),
                      //borderWidth: StyleSheet.hairlineWidth,
                      height: 45,
                      width: 45,
                      borderRadius: moderateScale(4),
                      backgroundColor: 'white',
                    }}
                    source={{'uri':'http://18.216.29.86:3000/images/'+item.BillerData[0].image}}
                  />
                </View>
                <View style={{flex: 3.75}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextView
                      textValue={item.BillerData[0].Biller_Name}
                      textStyle={{
                        fontFamily: 'OpenSans-SemiBold',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: R.color.lightgrey,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <TextView
                      textValue={
                        'Due: ' +
                        moment(item.Bill_Due_Date, 'YYYY/MM/DD').format('DD MMM YYYY')
                      }
                      textStyle={{
                        fontFamily: 'OpenSans-SemiBold',
                        fontSize: 14,
                        color: R.color.lightgrey,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 1,
                    marginVertical: 2,
                    left: 0,
                    right: 0,
                  }}>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      alignSelf: 'flex-end',
                      backgroundColor: '#d3d3d3',
                    }}
                  />
                </View>
              </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
    }
  }
}
