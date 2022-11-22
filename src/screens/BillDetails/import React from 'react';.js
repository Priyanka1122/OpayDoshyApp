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
  Linking,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from 'comp/Header';
import TextView from 'comp/TextView';
import R from 'res/R';
// let data=""
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import SubmitButton from 'comp/SubmitButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';
import Pdf from 'react-native-pdf';
import {StatusBar} from 'react-native';

const text = `Note: This is a direct debit scheduled by your biller. Doshy does not receive updates about direct debit payments, and automatically treats them as paid on the scheduled payment date.`;
// var visibleBottom=true
const source = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};
export default class BillDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(this.props.route.params.data),
      log: JSON.parse(this.props.route.params.data).log,
      notes: JSON.parse(this.props.route.params.data).notes,
      modalVisibility: false,
      modalVisibilityMAP: false,
      modalVisibilityMAPMarked: false,
      contentType: 0,
      dateVal: '',
      visibleBottom: true,
      balance: '180',
      pdfModal: false,
    };

    console.log(this.state.data);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this.setState({visibleBottom: false}),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({visibleBottom: true}),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
  }

  deleteEntry(index) {
    console.log(this.state.log);
    console.log(index);
    this.setModalVisibility();
    if (this.state.contentType == 1) {
      let temp = this.state.log.splice(index, 2);
      // this.setState({log:temp})
      console.log(temp);
    }
  }

  copyToClipBoard(str) {
    Clipboard.setString(str);
    Toast.show('Copied', Toast.SHORT);
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
          ? this._renderModalInfo()
          : this.state.contentType == 1
          ? this._renderModalremoveMarkAsPaid()
          : this.state.contentType == 2
          ? this._renderModalMarkAsPaid()
          : ''}
      </Modal>
    );
  }

  _renderPDF() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.pdfModal}
        onRequestClose={() => {
          this.setState({
            pdfModal: false,
          });
        }}>
        <View style={{flex: 1, paddingTop: 30, backgroundColor: '#fff'}}>
          <Header
            title={'PDF'}
            showBackButton={true}
            crossEnable={true}
            backPress={() => this.setState({pdfModal: false})}
          />

          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.7)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link presse: ${uri}`);
              }}
              style={styles.pdf}
            />
          </View>
        </View>
      </Modal>
    );
  }

  setModalVisibilityMAP() {
    console.log(this.state.modalVisibilityMAPMarked);
    this.setState({
      modalVisibilityMAPMarked: !this.state.modalVisibilityMAPMarked,
    });
  }

  _renderModalMAPMarked() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisibilityMAPMarked}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          this.setModalVisibilityMAP();
        }}>
        <View
          style={{
            zIndex: 100,
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
                this.setModalVisibilityMAP();
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

  _renderModalMAP() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisibilityMAP}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          // this.setModalVisibilityMAP()
          this.setState({modalVisibilityMAP: false});
        }}>
        {this._renderModalMarkAsPaid()}
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

  markAsPaidWebService() {
    console.log();
    this.setModalVisibilityMAP();
    // this.setState({modalVisibilityMAP:false},()=>{})
  }

  _renderModalMarkAsPaid() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,1)'}}>
        <View style={{flex: 1, paddingTop: 20, backgroundColor: '#fff'}}>
          <Header
            title={'Mark as paid'}
            showBackButton={true}
            crossEnable={true}
            backPress={() => this.setState({modalVisibilityMAP: false})}
          />
          <View
            style={{
              //marginVertical: 5,
              height: 1,
              width: '100%',
              backgroundColor: 'rgba(187,187,187,0.5)',
            }}
          />
          <View
            style={
              {
                //width: '100%',
                //height: verticalScale(1),
                //backgroundColor: '#fff',
                //borderWidth: 0,
                //opacity: 0.4,
              }
            }
          />
          <KeyboardAwareScrollView
            style={{backgroundColor: '#fff'}}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                //marginTop: moderateScale(15),
                //marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 20,
                paddingBottom: 10,
                //paddingRight: 20,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1.25, alignItems: 'center'}}>
                <Image
                  style={{
                    padding: moderateScale(10),
                    // borderWidth: StyleSheet.hairlineWidth,
                    // borderColor: R.color.appTheme,
                    height: 45,
                    width: 45,
                    borderRadius: moderateScale(4),
                    backgroundColor: 'white',
                    //margin: moderateScale(5),
                  }}
                  source={this.state.data.img}
                />
              </View>
              <View style={{flex: 5, padding: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <TextView
                      textValue={this.state.data.title}
                      textStyle={{
                        fontSize: 16,
                        fontFamily: 'OpenSans-Bold',
                        fontWeight: 'bold',
                        color: R.color.lightgrey,
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TextView
                      onFocus= {() => this.setState({text : ''})}
                      textValue={`${this.state.data.balanceDue}`}
                      textStyle={{
                        fontFamily: 'OpenSans-Bold',
                        marginHorizontal: 5,
                        fontSize: 16,
                        color: R.color.lightgrey,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextView
                    textValue={
                      'Due:  ' +
                      moment(this.state.data.dueDate, 'YYYY/MM/DD').format(
                        'DD MMM YYYY',
                      )
                    }

                    textStyle={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: 14,
                      color: R.color.lightgrey,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(187,187,187,0.5)',
                marginVertical: 10,
              }}
            />
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                paddingLeft: 25,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View>
                  <TextView
                    textStyle={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: 16,
                      color: R.color.lightgrey,
                      fontWeight: 'bold',
                    }}
                    textValue={'Amount paid'}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextView
                    textValue={`$`}
                    textStyle={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: 16,
                      color: R.color.appTheme,
                      fontWeight: 'bold',
                    }}
                  />
                  <TextInput
                    maxLength={8}
                    keyboardType={'numeric'}
                    style={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: 16,
                      color: R.color.appTheme,
                      fontWeight: 'bold',
                    }}
                    onChangeText={(text) => this.inputDecimalValue(text)}
                    value={this.state.balance}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(187,187,187,0.5)',
                marginVertical: 10,
              }}
            />
            <View
              style={{
                paddingVertical: 12,
                paddingHorizontal: 22,
                paddingRight: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View style={{flex: 2.2}}>
                  <TextView
                    textStyle={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: 16,
                      color: R.color.lightgrey,
                      fontWeight: 'bold',
                    }}
                    textValue={'Paid on'}
                  />
                </View>
                <View
                  style={{
                    flex: 0.85,
                    flexDirection: 'row',
                    alignItems: 'center',
                    textAlign: 'right',
                    justifyContent: 'flex-end',
                  }}>
                  {/*<TextView
                    textValue={'5 feb 2020'}
                    textStyle={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: 16,
                      color: R.color.appTheme,
                      fontWeight: 'bold',
                    }}
                  />*/}
                  <DatePicker
                    androidMode={'spinner'}
                    style={{width: '100%', borderWidth: 0}}
                    date={this.state.dateVal}
                    showIcon={true}
                    mode="date"
                    iconComponent={
                      <Icon
                        style={{
                          display: 'none',
                          //marginHorizontal: 5
                        }}
                        name={'chevron-down'}
                        color={R.color.appTheme}
                        size={24}
                      />
                    }
                    format="D MMM YYYY"
                    minDate="01 jan 1950"
                    maxDate={moment().format('DD MMM YYYY')}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        marginLeft: 0,
                      },
                      dateInput: {
                        margin: 0,
                        borderWidth: 0,
                        textAlign: 'right',
                        alignItems: 'center',
                      },
                      dateText: {
                        color: R.color.appTheme,
                        fontSize: 16,
                        textAlign: 'right',
                        //marginRight: -25,
                        fontFamily: 'OpenSans-Bold',
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
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: 'rgba(187,187,187,0.5)',
                marginVertical: 10,
              }}
            />
          </KeyboardAwareScrollView>
          <View style={{padding: moderateScale(5)}}>
            <SubmitButton
              onButtonClick={() => this.markAsPaidWebService()}
              textValue={'Mark paid'}
            />
            {this._renderModalMAPMarked()}
          </View>
        </View>
      </View>
    );
  }

  _renderModalInfo() {
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
            width: '80%',
            maxHeight: 200,
            padding: moderateScale(20),
            backgroundColor: '#EBEBEB',
            borderRadius: moderateScale(10),
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextView
            textValue={'Scheduled direct debit'}
            textStyle={{fontSize: 17, marginVertical: 5}}
          />
          <TextView
            textValue={text}
            textStyle={{
              fontSize: 13,
              textAlign: 'left',
              // marginHorizontal: 20,
              marginTop: 8,
              marginBottom: 20,
              fontWeight: 'normal',
            }}
          />
          <View
            style={{
              height: verticalScale(1),
              marginVertical: moderateScale(5),
              marginBottom: 0,
              width: '120%',
              backgroundColor: '#fff',
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#EBEBEB',
              //flex: 1,
              //height: 10,
              //minHeight: 20,
              //paddingVertical: 5,
            }}
            onPress={() => this.setModalVisibility()}>
            <TextView
              textValue={'Okay'}
              textStyle={{fontSize: 17, marginTop: 12}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderModalremoveMarkAsPaid() {
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
            width: '80%',
            paddingHorizontal: 20,
            backgroundColor: '#EBEBEB',
            borderRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextView
            textValue={'Mark a paid amount removed'}
            textStyle={{fontSize: 17, marginVertical: 20}}
          />
          <View
            style={{
              height: 1,
              marginVertical: 5,
              width: '120%',
              backgroundColor: '#fff',
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#EBEBEB',
              height: 40,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => this.setModalVisibility()}>
            <TextView
              textValue={'Okay'}
              textStyle={{fontSize: 17, marginTop: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    // console.log("====>",this.props.route.params.data)
    return (
      <SafeAreaView style={{flex: 1, flexGrow: 1}}>
        <KeyboardAvoidingView style={{flex: 1, flexGrow: 1}}>
          <View style={{flex: 1, flexGrow: 1, backgroundColor: '#fff'}}>
            <Header
              title={'Bill details'}
              hideElevation={false}
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
              <View
                style={{
                  height: '100%', //paddingVertical: 15
                }}>
                <View
                  style={{
                    paddingHorizontal: 7,
                    paddingVertical: 25,
                    paddingBottom: 12,
                    paddingRight: 20,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      style={{
                        padding: moderateScale(15),
                        height: 45,
                        width: 45,
                        borderRadius: 4,
                        backgroundColor: '#fff',
                      }}
                      source={this.state.data.img}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3.75,
                      //paddingLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <TextView
                        textValue={this.state.data.title}
                        textStyle={{
                          fontSize: 16,
                          fontFamily: 'OpenSans-Bold',
                          fontWeight: 'bold',
                          color: R.color.lightgrey,
                        }}
                      />

                      <View style={{flexDirection: 'row', marginVertical: 2}}>
                        <TextView
                          textValue={
                            'Due: ' +
                            moment(
                              this.state.data.dueDate,
                              'YYYY/MM/DD',
                            ).format('DD MMM YYYY')
                          }
                          textStyle={{
                            fontFamily: 'OpenSans-SemiBold',
                            fontSize: 14,
                            color: R.color.lightgrey,
                          }}
                        />
                      </View>
                    </View>
                    <View style={{flex: 0.4}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <TextView
                          textValue={`$${this.state.data.offerPrice}`}
                          textStyle={{
                            fontFamily: 'OpenSans-Bold',
                            fontWeight: 'bold',
                            marginHorizontal: 5,
                            fontSize: 16,
                            color: R.color.lightgrey,
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            pdfModal: true,
                          });
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          padding: 5,
                        }}>
                        <Icon
                          name="paperclip"
                          size={20}
                          color={R.color.appTheme}
                          style={{transform: [{rotate: '45deg'}]}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{}} />
                {/* <View style={{width:'100%',paddingHorizontal:5}}>
                            <TextView textValue={"BPAY details"} textStyle={{fontSize:RFValue(14),padding:10,fontWeight:'bold',color:R.color.lightgrey}} />

                            <View style={{flexDirection:"row",width:'100%',padding:10,paddingVertical:10}}>
                                <TextView textValue={`Biller code: ${this.state.data.billerId}`} textStyle={{fontSize:RFValue(14),color:R.color.lightgrey}} />
                                <TouchableOpacity onPress={()=>this.copyToClipBoard(String(this.state.data.billerId))} style={{position: 'absolute',right:10,alignItems:'center',justifyContent:'center',padding:moderateScale(4)}}>
                                    <Icon name="content-copy" size={24} color={R.color.appTheme} /> 
                                </TouchableOpacity>
                                
                                
                            </View>
                            <View style={{width:'100%',padding:10,paddingVertical:10}}>
                                <TextView textValue={`Reference: ${this.state.data.CRN}`} textStyle={{fontSize:RFValue(14),color:R.color.lightgrey}} />
                                <TouchableOpacity onPress={()=>this.copyToClipBoard(String(this.state.data.CRN))} style={{position: 'absolute',right:10,alignItems:'center',justifyContent:'center',padding:moderateScale(4)}}>
                                    <Icon name="content-copy" size={24} color={R.color.appTheme} />
                                </TouchableOpacity>
                            </View>
                        </View> */}
                <View
                  style={{
                    marginVertical: 5,
                    height: 1,
                    width: '100%',
                    backgroundColor: 'rgba(187,187,187,.5)',
                  }}
                />
                <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                  <TextView
                    textValue={'Payment details'}
                    textStyle={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: RFValue(16),
                      padding: 10,
                      fontWeight: 'bold',
                      color: R.color.lightgrey,
                    }}
                  />
                  <FlatList
                    inverted
                    scrollEnabled={false}
                    data = {this.state.log}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{
                            paddingHorizontal: 10,
                            paddingRight: 0,
                            flex: 1,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginVertical: 5,
                            }}>
                            <View style={{flexDirection: 'row', flex: 5}}>
                              <View style={{flex: 1.2}}>
                                <TextView
                                  lines={1}
                                  textValue={moment(
                                    item.date,
                                    'YYYY/MM/DD',
                                  ).format('D MMM YYYY')}
                                  textStyle={{
                                    fontFamily: 'OpenSans-SemiBold',
                                    color: R.color.lightgrey,
                                    fontSize: 14,
                                    fontWeight: '600',
                                  }}
                                />
                              </View>
                              <View style={{flex: 2.2}}>
                                <TextView
                                  lines={1}
                                  textValue={item.status}
                                  textStyle={{
                                    fontFamily: 'OpenSans-SemiBold',
                                    color: R.color.lightgrey,
                                    fontSize: 14,
                                    fontWeight: '600',
                                    //paddingHorizontal: 10,
                                  }}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  flex: 3,
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                }}>
                                <TextView
                                  textValue={`$${item.amount}`}
                                  textStyle={{
                                    fontFamily: 'OpenSans-SemiBold',
                                    color: R.color.lightgrey,
                                    fontSize: 14,
                                    fontWeight: '600',
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 2,
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.setState(
                                      {contentType: item.deleteable ? 1 : 0},
                                      () => this.deleteEntry(index),
                                    )
                                  }
                                  style={{
                                    padding: moderateScale(10),
                                    flex: 1.2,
                                  }}>
                                  <Icon
                                    name={
                                      item.deleteable
                                        ? 'close-circle-outline'
                                        : 'information-outline'
                                    }
                                    color={
                                      item.deleteable
                                        ? '#df9191'
                                        : R.color.appTheme
                                    }
                                    size={22}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    height: 1,
                    width: '100%',
                    backgroundColor: 'rgba(187,187,187,0.5)',
                  }}
                />

                <View style={{paddingHorizontal: 10, paddingVertical: 12}}>
                  <TextView
                    textValue={'Notes'}
                    textStyle={{
                      fontFamily: 'OpenSans-Bold',
                      color: R.color.lightgrey,
                      fontSize: RFValue(16),
                      fontWeight: 'bold',
                      paddingHorizontal: moderateScale(10),
                    }}
                  />
                  <TextInput
                    placeholder={'Add notes here...'}
                    placeholderTextColor={'#bbbbbb'}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={180}
                    minHeight={60}
                    value={this.state.notes}
                    textAlignVertical={'top'}
                    onChangeText={(text) => this.setState({notes: text})}
                    style={{
                      fontFamily: 'OpenSans-Bold',
                      backgroundColor: '#fff',
                      paddingHorizontal: moderateScale(10),
                      marginTop: moderateScale(10),
                      overflow: 'hidden',
                      color: R.color.lightgrey,
                      fontWeight: 'bold',
                      borderRadius: moderateScale(10),
                      borderColor: '#bbbbbb',
                      padding: moderateScale(5),
                      height: verticalScale(90),
                    }}
                  />
                </View>
              </View>
            </ScrollView>
            {/* <SubmitButton 
                            styles={{width:'50%',borderRadius:10,alignSelf: 'flex-end',paddingHorizontal: 10}}
                            onButtonClick={()=>{
                                // this.setState({contentType:2},()=>this.setModalVisibility())
                                this.setState({modalVisibilityMAP:true})
                                // this.props.navigation.navigate('MarkAsPaid',{"data":this.state.data})
                            }} textValue={'Mark as paid'}
                        /> */}
            <View style={{padding: 10, alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => this.setState({modalVisibilityMAP: true})}
                style={{
                  borderRadius: 50,
                  backgroundColor: R.color.appTheme,
                  width: '50%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextView
                  textValue={'Mark as paid'}
                  textStyle={{
                    fontFamily: 'OpenSans-Bold',
                    color: 'white',
                    fontSize: 16,
                  }}
                />
              </TouchableOpacity>
            </View>
            {this._renderModal()}

            {this._renderModalMAP()}

            {this._renderPDF()}
          </View>
        </KeyboardAvoidingView>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
