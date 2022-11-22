import React from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import SubmitButton from 'comp/SubmitButton';
import TextInputView from 'comp/TextInputView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TextView from 'comp/TextView';
import R from 'res/R';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
// import Autocomplete from 'react-native-autocomplete-input';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Utils from 'res/Utils';
import Toast from 'react-native-simple-toast';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Loader from 'comp/Loader';
var data = [];

export default class Lastname extends React.Component {
  constructor() {
    super();
    this.state = {
      dataStatic: [],
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Address: 'fd',
      DOBVal: '',
      // Auth:"",
      // LicenceNo:"",
      modalVisibility: false,
      contentType: 0,
      selectedValue: '',
      selectedAuthValue: '',
      filteredArray: [],
      loading: true,
    };
  }

  componentDidMount() {
    Utils.ApiPost(
      R.constants.Api.addressList,
      'GET',
      (response = (data) => {
        console.log('res=========>', data.data.data);
        if (data.res) {
          this.setState({dataStatic: data.data.data});
          this.setState({loading: false});
        }
      }),
    );
  }

  verifyDetails() {
    console.log("asdsad"+this.state.LastName);

    if (this.state.LastName == '') {
      Toast.show('Last name cannot be empty.', Toast.SHORT);
    } else {
      this.setState({loading: true});
      Actions.DOB({
        firstname: this.props.firstname,
        lastname: this.state.LastName
      }) 
      this.setState({loading: false});
    }
  }

  filterAddress(str) {
    this.setState({Address: str}, () => {
      console.log(str, '==========>', this.state.dataStatic);
      if (str !== '') {
        console.log(this.state.dataStatic);
        let temp = this.state.dataStatic.filter((item) =>
          item.address.toLowerCase().includes(str.toLowerCase()),
        );
        console.log('=====if=====>', temp);
        this.setState({filteredArray: temp});
      } else {
        this.setState({filteredArray: []});
      }
    });
  }

  setModalVisibility() {
    this.setState({modalVisibility: !this.state.modalVisibility});
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
          ? this._renderModalPending()
          : this.state.contentType == 1
          ? this._renderModalAge()
          : this.state.contentType == 2
          ? this._renderModalDeny()
          : this.state.contentType == 3
          ? this._renderModalStates()
          : ''}
      </Modal>
    );
  }
  _renderModalStates() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.7)',
          justifyContent: 'flex-end',
        }}>
        <FlatList
          scrollEnabled={true}
          style={{flexDirection: 'column-reverse'}}
          data={[
            {key: '0', label: 'Australian Capital Territory', value: 'ACT'},
            {key: '1', label: 'New South Wales', value: 'NSW'},
            {key: '2', label: 'Northern Territory', value: 'NT'},
            {key: '3', label: 'Queensland', value: 'Queensland'},
            {key: '4', label: 'South Australia', value: 'SA'},
            {key: '5', label: 'Tasmania', value: 'Tasmania'},
            {key: '6', label: 'Victoria', value: 'Victoria'},
            {key: '7', label: 'Western Australia', value: 'WA'},
          ]}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.setState(
                    {Auth: item.value, selectedAuthValue: item.label},
                    () => this.setModalVisibility(),
                  )
                }
                style={{
                  margin: 5,
                  borderWidth: StyleSheet.hairlineWidth,
                  padding: 20,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextView textValue={item.label} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  _renderModalPending() {
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
            padding: 20,
            backgroundColor: '#EBEBEB',
            borderRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextView
            textValue={'Verifying your identify'}
            textStyle={{fontSize: 17, marginVertical: 5}}
          />
          <TextView
            textValue={
              'This information helps manage your Doshy account and your authorization to receive bills.'
            }
            textStyle={{textAlign: 'center', fontSize: 13, marginVertical: 5}}
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
            style={{paddingVertical: 5, paddingHorizontal: 10, marginTop: 10}}
            onPress={() => this.setModalVisibility()}>
            <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderModalAge() {
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
            padding: 20,
            backgroundColor: '#EBEBEB',
            borderRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextView
            textValue={'Looks like you’re not eligible'}
            textStyle={{fontSize: 17, marginVertical: 5}}
          />
          <TextView
            textValue={
              'Sorry, you need to be at least 18 years of age to use Opay.'
            }
            textStyle={{textAlign: 'center', fontSize: 13, marginVertical: 5}}
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
            style={{paddingVertical: 5, paddingHorizontal: 10, marginTop: 10}}
            onPress={() => this.setModalVisibility()}>
            <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderModalDeny() {
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
            padding: 20,
            backgroundColor: '#EBEBEB',
            borderRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextView
            textValue={'Couldn’t verify identity'}
            textStyle={{fontSize: 17, marginVertical: 5}}
          />
          <TextView
            textValue={
              'Remember, your details need to be exactly as they are on your licence.'
            }
            textStyle={{textAlign: 'center', fontSize: 13, marginVertical: 5}}
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
            style={{paddingVertical: 5, paddingHorizontal: 10, marginTop: 10}}
            onPress={() => this.setModalVisibility()}>
            <TextView textValue={'Okay'} textStyle={{fontSize: 17}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <ScrollView style={{width: '100%'}}>
          <KeyboardAvoidingView>
            <View
              style={{
                height: Dimensions.get('screen').height - 65,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: moderateScale(10),
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginTop: moderateScale(100),
                }}>
                <TextView
                  textValue={`And your last \n name?`}
                  textStyle={{
                    textAlign: 'center',
                    color: R.color.appTheme,
                    fontSize: 26,
                    fontFamily: 'OpenSans-Bold',
                    fontWeight: 'bold',
                    marginVertical: 10,
                    minHeight: 71,
                    marginTop: 40,
                    position: 'relative',
                    top: -29,
                  }}
                />
              </View>

              {/* <TouchableOpacity
                onPress={() =>
                  this.setState({contentType: 0}, () =>
                    this.setModalVisibility(),
                  )
                }
                style={{paddingVertical: -10, width: '100%'}}>
                <TextView
                  textValue={'What is this info used for?'}
                  textStyle={{
                    color: R.color.appTheme,
                    fontSize: 16,
                    marginVertical: 10,
                    marginHorizontal: 25,
                    textAlign: 'center',
                  }}
                />
              </TouchableOpacity> */}
              <View
                style={{
                  flex: 2,
                  marginTop: 80,
                  width: '75%',
                  alignSelf: 'center',
                }}>
                <TextInputView
                  onSubmit={() => {
                    this.verifyDetails();
                    // this.props.navigation.navigate('DOB');
                  }}
                  returnType={'next'}
                  reff={(input) => {
                    this.firstTextInput = input;
                  }}
                  blur={false}
                  autoFocusEnabled={true}
                  title={'Last name*'}
                  keyBoard={'default'}
                  length={30}
                  textValue={this.state.LastName}
                  textChange={(text) =>
                    this.setState({
                      LastName: text.replace(/[0-9!@#$%^&*()/{}|:"<>?]/g, ''),
                    })
                  }
                />

                {/* <TextInputView
                  reff={(input) => {
                    this.secondTextInput = input;
                  }}
                  blur={false}
                  onSubmit={() => {
                    this.thirdTextInput.focus();
                  }}
                  returnType={'next'}
                  title={'Middle name(s)'}
                  keyBoard={'default'}
                  length={30}
                  textValue={this.state.MiddleName}
                  textChange={(text) =>
                    this.setState({
                      MiddleName: text.replace(/[0-9!@#$%^&*()/{}|:"<>?]/g, ''),
                    })
                  }
                /> */}

                {/* <TextInputView
                  reff={(input) => {
                    this.thirdTextInput = input;
                  }}
                  blur={false}
                  onSubmit={() => {
                    Keyboard.dismiss();
                  }}
                  title={'Last name*'}
                  keyBoard={'default'}
                  length={30}
                  textValue={this.state.LastName}
                  textChange={(text) =>
                    this.setState({
                      LastName: text.replace(/[0-9!@#$%^&*()/{}|:"<>?]/g, ''),
                    })
                  }
                /> */}

                {/* <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    zIndex: 10,
                  }}>
                  <View style={{width: '100%'}}>
                    <GooglePlacesAutocomplete
                      placeholder=""
                      minLength={2}
                      autoFocus={false}
                      returnKeyType={'search'}
                      keyboardAppearance={'light'}
                      fetchDetails={true}
                      listViewDisplayed={false}
                      renderDescription={(row) => row.description}
                      onPress={(data, details = null) => {
                        this.setState({
                          Address: details.formatted_address,
                        });
                      }}
                      getDefaultValue={() => ''}
                      query={{
                        key: 'AIzaSyBOY1zRiZKG8RudQrEsbdy1SRkXSxH-g4M',
                        language: 'en',
                      }}
                      styles={{
                        textInput: {
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#696969',
                        },
                        textInputContainer: {
                          width: '100%',
                          backgroundColor: '#fff',
                          borderBottomWidth: 1,
                          borderBottomColor: R.color.appTheme,
                        },
                        description: {
                          fontWeight: 'bold',
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb',
                        },
                      }}
                      nearbyPlacesAPI="GooglePlacesSearch"
                      GoogleReverseGeocodingQuery={{}}
                      GooglePlacesSearchQuery={{
                        rankby: 'distance',
                        type: 'cafe',
                      }}
                      GooglePlacesDetailsQuery={{
                        fields: 'formatted_address',
                      }}
                      filterReverseGeocodingByTypes={[
                        'locality',
                        'administrative_area_level_3',
                      ]}
                      debounce={200}
                    />
                  </View>
                  <TextView
                    textValue={'Address*'}
                    textStyle={{
                      zIndex: -10,
                      fontSize: 16,
                      color:
                        this.state.Address == ''
                          ? R.color.appTheme
                          : R.color.appTheme,
                      fontWeight: 'bold',
                    }}
                  />
                </View> */}

                {/* <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 20,
                    marginVertical: 10,
                  }}>
                  <View style={{width: '100%'}}>
                    <DatePicker
                      style={{
                        width: '100%',
                        marginVertical: 10,
                        borderWidth: 0,
                      }}
                      date={this.state.DOBVal}
                      showIcon={true}
                      mode="date"
                      androidMode={'spinner'}
                      placeholder="Select date"
                      format="D MMMM YYYY"
                      placeholderText={{color: '#d3d3d3'}}
                      minDate="01 jan 1950"
                      maxDate={moment(
                        moment().subtract(18, 'year').calendar(),
                        'MM/DD/YYYY',
                      ).format('DD MMMM YYYY')}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#696969',
                          alignItems: 'flex-start',
                          borderBottomColor: R.color.appTheme,
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({DOBVal: date}, () => {
                          console.log(this.state.DOBVal);
                        });
                      }}
                    />
                  </View>
                  <TextView
                    textValue={'Date of birth*'}
                    textStyle={{
                      fontSize: 16,
                      color:
                        this.state.DOBVal == ''
                          ? R.color.appTheme
                          : R.color.appTheme,
                      fontWeight: 'bold',
                    }}
                  />
                </View> */}
              </View>
              {/* <View
                style={{
                  width: '100%',
                  // marginTop: 'auto',
                  marginBottom: 10,
                }}>
                <SubmitButton
                  disabledButton={
                    this.state.Address == '' ||
                    this.state.Auth == '' ||
                    this.state.LicenceNo == ''
                  }
                  onButtonClick={() => {
                    this.verifyDetails();
                  }}
                  textValue={'Next'}
                />
              </View> */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        {this._renderModal()}
        {this.state.loading && <Loader />}
      </SafeAreaView>
    );
  }
}
