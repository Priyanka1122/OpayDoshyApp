import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import R from 'res/R';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import TextView from 'comp/TextView';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import Utils from 'res/Utils';
import Loader from 'comp/Loader';

const openUrl = 'https://calendly.com/doshy/onboarding';

const Data = [
  {
    key: '0',
    title: 'Brimbank City Council',
    img: R.Images.aami,
    billerId: '613 374',
    CRN: '23243 28743 8203',
    balanceDue: '$370.00',
    offerPrice: '370.00',
    dueDate: '2020/07/20',
    overDue: true,
    debtType: 'nondirect',
    upcomingDate: '2020/10/29',
    notes: '',
    log: [
      {
        key: '0',
        type: 'Scheduled',
        status: 'Direct debit',
        date: '2020/07/19',
        amount: '150.00',
        deleteable: false,
      },
      {
        key: '1',
        type: 'Paid',
        status: 'Marked as paid',
        date: '2020/07/14',
        amount: '370.00',
        deleteable: true,
      },
    ],
  },
  {
    key: '1',
    title: 'City West Water',
    billerId: '613 274',
    CRN: '23243 28743 8203',
    img: R.Images.belong,
    balanceDue: '$101.23',
    offerPrice: '101.23',
    overDue: false,
    dueDate: '2020/07/03',
    debtType: 'nondirect',
    upcomingDate: '2020/10/29',
    notes: 'test',
    log: [
      {
        key: '0',
        type: 'Scheduled',
        status: 'Direct debit',
        date: '2020/07/19',
        amount: '50.00',
        deleteable: false,
      },
      {
        key: '1',
        type: 'Paid',
        status: 'Marked as paid',
        date: '2020/07/14',
        amount: '101.00',
        deleteable: true,
      },
    ],
  },
  {
    key: '2',
    title: 'VicRoads',
    billerId: '613 264',
    CRN: '23243 28743 8203',
    img: R.Images.vicroads,
    balanceDue: '$250.00',
    offerPrice: '250.00',
    overDue: false,
    dueDate: '2020/07/15',
    debtType: 'direct',
    notes: 'test 2',
    upcomingDate: '2020/06/3',
    log: [
      {
        key: '0',
        type: 'Scheduled',
        status: 'Direct debit',
        date: '2020/07/19',
        amount: '50.00',
        deleteable: false,
      },
      {
        key: '1',
        type: 'Paid',
        status: 'Marked as paid',
        date: '2020/07/14',
        amount: '250.00',
        deleteable: true,
      },
    ],
  },
  {
    key: '1',
    title: 'Brimbank City Council',
    billerId: '213 174',
    CRN: '23243 28743 8203',
    img: R.Images.optus,
    balanceDue: '$150.00',
    overDue: false,
    offerPrice: '150.00',
    dueDate: '2020/07/20',
    debtType: 'direct',
    notes: 'test 3',
    upcomingDate: '2020/10/29',
    log: [
      {
        key: '0',
        type: 'Scheduled',
        status: 'Direct debit',
        date: '2020/07/19',
        amount: '50.00',
        deleteable: false,
      },
      {
        key: '1',
        type: 'Paid',
        status: 'Marked as paid',
        date: '2020/07/14',
        amount: '150.00',
        deleteable: true,
      },
    ],
  }
];
export default class Current extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      billdata: [],
      loading: true,
      show: false
    };
    // this.getbillerData();
  }
  componentDidMount() {
    Utils.ApiPost(
      R.constants.Api.currentBills,
      'GET',
      (response = (data) => {
        console.log("CURREENT BILLSSS");
        this.setState({
          billdata:  data.data.billerData,
          loading: false,
          show: true
        })
        console.log("chek bill data");
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
                    paddingVertical: 200,
                    paddingRight: 20,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{                          
                          fontSize: 16,
                          fontFamily: 'Opensans-Bold',
                          color: R.color.lightgrey
                          }}>No Bills to see here.</Text>
                    <Text style={{  
                          marginTop:5,
                          fontSize: 16,
                          fontFamily: 'Opensans-Bold',
                          color: R.color.lightgrey
                          }}>{`If you haven't already, schedule a quick \n 10-min call with us to auto-forward your`}</Text>
                          
                    <Text style={{  
                          fontSize: 16,
                          textAlign: 'center',
                          fontFamily: 'Opensans-Bold',
                          color: R.color.lightgrey
                          }}>{`email bills to Doshy:`}</Text>

                    <Text style={{  
                  fontFamily: 'Opensans-SemiBold',
                  fontSize: RFValue(16),
                  textAlign: 'center',
                  marginTop: 15,
                  color: R.color.appTheme,
                          }}                 onPress={() => {
                  Linking.openURL(openUrl);
                }}>https://calendly.com/doshy/onboarding</Text>
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
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 25,
                    paddingRight: 20,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      style={{
                        borderRadius: 4,
                        padding: moderateScale(15),
                        height: 45,
                        width: 45,
                        backgroundColor: '#fff',
                      }}
                      source={{'uri':'http://18.216.29.86:3000/images/'+item.BillerData[0].image}}
                    />


                  </View>
                  <View style={{flex: 3}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TextView
                        lines={1}
                        textValue={item.BillerData[0].Biller_Name}
                        textStyle={{
                          fontSize: 16,
                          fontWeight: '700',
                          fontFamily: 'OpenSans-Bold',
                          color: item.overDue ? 'orange' : R.color.lightgrey,
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
                          moment(item.Bill_Due_Date, 'YYYY/MM/DD').format('D MMM YYYY')
                        }
                        textStyle={{
                          fontFamily: 'OpenSans-Semibold',
                          fontWeight: '600',
                          fontSize: 14,
                          color: item.overDue ? 'orange' : R.color.lightgrey,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{alignItems: 'center', position: 'relative'}}>
                    <TextView
                      textValue={'$'+item.Bill_Amount+'.00'}
                      textStyle={{
                        fontSize: 16,
                        fontFamily: 'OpenSans-Bold',
                        fontWeight: 'bold',
                        color: item.overDue ? 'orange' : R.color.lightgrey,
                      }}
                    />
                    {item.debtType == 'direct' && (
                      <View
                        style={{
                          width: 80,
                          right: 0,
                          bottom: 3,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          position: 'absolute',
                        }}>
                        <TextView
                          textValue={'direct debit'}
                          textStyle={{
                            fontFamily: 'OpenSans-Semibold',
                            fontSize: RFValue(12),
                            fontWeight: '600',
                            color: 'rgba(99,99,99,0.75)',
                          }}
                        />
                      </View>
                    )}
                  </View>
  
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      height: 1,
                      marginVertical: 2,
                      left: 0,
                      right: 0,
                      flex: 0.1,
                    }}>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        alignSelf: 'flex-end',
                        backgroundColor: 'rgba(187,187,187,0.5)',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {/* {this.state.loading && <Loader />} */}
        </View>
      );      
    }
  }
}
