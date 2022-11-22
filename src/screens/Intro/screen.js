import React, { Component } from 'react';

import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View,
  Modal,
  Dimensions,
  ImageBackground,
  Image, // Container component
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Utils from 'res/Utils';
import { Actions } from 'react-native-router-flux';
import HTML from "react-native-render-html";
import Button from './button';
import Header from 'comp/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import R from 'res/R';
import Swiper from './swiper';
import SubmitButton from '../../res/components/SubmitButton';
import TextView from '../../res/components/TextView';
import HTMLView from 'react-native-htmlview';

import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'react-native';

const points = `If joining Doshy, you’ll need to: 

\t- be 18 years old and over

\t- be an Australian citizen / permanent resident

\t- have an Australian drivers licence ID`;

const StyledImage = Animatable.createAnimatableComponent(styled.Image``);

export default class Screens extends Component {
  constructor() {
    super();
    this.state = {
      termsprivacydata: '',
      showView: false,
      getStartedButton: false,
      showsplashmodal: true,
      modalVisibility: false,
      visibleStatusBar: false,
      activeSlide: 0,
      entries: [
        {
          img: R.Images.opay,
          title: 'Welcome to Doshy',
          icon: R.Images.smile,
          sub: 'The simplest and fastest way to manage your bills.',
        },
        {
          img: R.Images.puzzle,
          title: 'All in the one place',
          icon: R.Images.inbox,
          sub: 'Receive bills direct to your phone, in the one place.',
        },
        {
          img: R.Images.timer,
          title: 'Payment details at hand',
          icon: R.Images.zap,
          sub: 'Track payments and have BPAY details at your fingertips.',
        },
        {
          img: R.Images.sheild,
          title: 'Safe and easy access',
          icon: R.Images.cloud,
          sub:
            'View your bills anytime, anywhere in the app, or at opayapp.com.au',
        },

      ],
    };

    this.getTermsPrivacyData();


    setTimeout(() => {
      this.setState({
        getStartedButton: true,
        showsplashmodal: false,
        showView: true
      });
      this.checkdata();
    }, 4000);

  }

  async getTermsPrivacyData() {
    let url = `${R.constants.Api.get_terms_privacy}`;
    await fetch(url).then(response => response.json()).then(json => {
      console.log("INTRRO SCREENS");
      console.log(json);
      this.setState({
        'termsprivacydata': json.data.privacy
      })

    }).catch((error) => {
      console.log('ApiError' + error);
    });
  }

  checkdata() {
    Utils.getData(
      'IsSigned',
      (value = (data) => {
        console.log('CHECK DATA***********SCREENS PAGE');
        console.log(data);
        if (data.value == null || data.value == false) {
          // this.props.navigation.navigate('Screens');
          // setTimeout(()=>{
          //   Actions.Screens();
          // },2000)
        } else {
          this.props.navigation.navigate('Login');
        }
      }),
    );
  }

  _showModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showsplashmodal}
        onRequestClose={() => {
          this.setState({ showsplashmodal: false });
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: R.color.appTheme,
          }}>
          {/* <StyledImage
            animation="fadeOut"
            easing="ease-in"
            useNativeDriver={true}
            //source={R.Images.splash}
            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:AN
            d9GcTF8NyWt3G6rtzLnfc7YO-VaUQAvan7fE_luQ&usqp=CAU'}} 
          /> */}

          <ImageBackground
            source={require('../../res/Images/doshy-logo.png')}
            style={{ width: 250, height: 89 }} />


        </View>
      </Modal>
    );
  }

  _renderModalTNC() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisibility}
        onRequestClose={() => {
          this.setState({ modalVisibility: false });
        }}>
        {this._renderModalTermsCondition()}
      </Modal>
    );
  }

  _renderModalTermsCondition() {
    return (
      <View style={{ flex: 1, paddingTop: 30, backgroundColor: '#fff' }}>
        <Header
          title={'Terms of Service & Privacy'}
          showBackButton={true}
          crossEnable={true}
          backPress={() => this.setState({ modalVisibility: false })}
        />
        {/* <View
          style={{
            //marginVertical: 5,
            height: 1,
            width: '100%',
            backgroundColor: 'rgba(187,187,187,0.5)',
          }}
        >
        {this.state.termsprivacydata }
      </View> */}

        <View style={{ flex: 1 }}>
          <ScrollView style={{ width: '100%', backgroundColor: '#fff' }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '10%',
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  textAlign: 'center',
                  fontSize: 16,
                  lineHeight: 20,
                }}>

                <HTMLView
                  value={this.state.termsprivacydata}
                />
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    renderButton = () => {
      const lastScreen = this.state.index === this.state.total - 1;
      return (
        <View
          style={{
            backgroundColor: '#4083FF',
            marginHorizontal: 20,
            marginBottom: 25,
            borderRadius: 90,
          }}>
          {lastScreen ? (
            // Show this button on the last screen
            // TODO: Add a handler that would send a user to your app after onboarding is complete
            <View style={{ borderColor: '#4083FF' }}>
              <Button
                style={{}}
                text="Start Now"
                onPress={() => {
                  this.props.navigation.navigate('SelectCountry');
                }}
              />
            </View>
          ) : (
            // Or this one otherwise
            <View />
          )}
        </View>
      );
    };

    const screenheight = Math.round(Dimensions.get('window').height);
    const screenWidth = Math.round(Dimensions.get('window').width);

    if (this.state.showView == true) {
      return (
        <Swiper>
          {/* First screen */}
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
              translucent={true}
              barStyle="dark-content"
              backgroundColor={R.color.appTheme}
              hidden={true}
            />
            {this._showModal()}
            <View style={{ flex: 1, height: screenheight, width: screenWidth }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: moderateScale(80),
                }}>
                <Image source={R.Images.doshy} />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: moderateScale(120),
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    textAlign: 'center',
                    marginLeft: moderateScale(10),
                    fontSize: RFValue(30),
                    color: '#4083FF',
                    fontWeight: '700',
                  }}>
                  Welcome to Doshy
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: moderateScale(49),
                  marginHorizontal: 40,
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-SemiBold',
                    textAlign: 'center',
                    fontSize: RFValue(16),
                    color: '#636363',
                    fontWeight: '600',
                  }}>
                  Receive bills direct to your phone, in the one place
                </Text>
              </View>
            </View>
          </SafeAreaView>

          {/* Second screen */}
          <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: '25%', marginLeft: '5%' }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    fontSize: RFValue(30),
                    color: '#4083FF',
                    fontWeight: 'bold',
                  }}>
                  How it works
                </Text>
              </View>
              <View
                style={{
                  marginTop: '20%',
                  flexDirection: 'row',
                  paddingLeft: 25,
                  paddingRight: 25,
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
                  paddingLeft: 25,
                  paddingRight: 25,
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
                  Auto-forward your email bills to Doshy (we’ll help you with
                  this)
                </Text>
              </View>
              <View
                style={{
                  marginTop: '25%',
                  flexDirection: 'row',
                  paddingLeft: 25,
                  paddingRight: 25,
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
            </View>
          </SafeAreaView>

          {/* Third screen */}

          <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: '20%', marginLeft: '5%' }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    fontSize: RFValue(30),
                    color: '#4083FF',
                    fontWeight: 'bold',
                    position: 'relative',
                    top: 20,
                  }}>
                  Before we get started
                </Text>
              </View>
              <View style={{ marginTop: '25%', marginLeft: '10%' }}>
                <Text
                  style={{
                    fontFamily: 'Opensans-SemiBold',
                    fontSize: RFValue(16),
                    fontWeight: '600',
                    color: '#636363',
                    lineHeight: moderateScale(25),
                    marginRight: '25%',
                  }}>
                  To use Doshy, you’ll need to:
                </Text>
                <Text
                  style={{
                    fontFamily: 'Opensans-SemiBold',
                    fontSize: RFValue(16),
                    fontWeight: '600',
                    color: '#636363',
                    lineHeight: moderateScale(25),
                    marginRight: '25%',
                    marginTop: 15,
                  }}>
                  - be 18 years or olders
                </Text>
                <Text
                  style={{
                    fontFamily: 'Opensans-SemiBold',
                    fontSize: RFValue(16),
                    fontWeight: '600',
                    color: '#636363',
                    lineHeight: moderateScale(25),
                    marginRight: '25%',
                    marginTop: 15,
                  }}>
                  - be an Australian citizen or {'\n'}
                  {'  '}permanent resident
                </Text>
              </View>
              <View style={{ marginTop: '30%', marginHorizontal: '10%' }}>
                <Text
                  style={{
                    fontFamily: 'Opensans-SemiBold',
                    fontSize: RFValue(16),
                    fontWeight: '600',
                    color: '#636363',
                  }}>
                  By continuing, you agree to the{' '}
                  {
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalVisibility: true }, () => {
                          console.log(this.state.modalVisibility);
                        });
                      }}>
                      {this._renderModalTNC()}
                      <Text
                        style={{
                          fontFamily: 'Opensans-SemiBold',
                          color: '#4083FF',
                          fontSize: RFValue(16),
                          fontWeight: '600',
                        }}>
                        Terms of Service & Privacy Policy
                      </Text>
                    </TouchableOpacity>
                  }
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#4083FF',
                  marginHorizontal: '5%',
                  borderRadius: 90,
                  marginTop: '25%',
                }}>
                <View
                  style={{
                    borderColor: '#4083FF',
                  }}>

                  {(this.state.getStartedButton) ? <Button
                    Style={{}}
                    text="Get Started"
                    onPress={() => {
                      this.props.navigation.navigate('EnterDetailsView');
                    }}
                  /> : null}
                </View>
              </View>
            </View>
          </SafeAreaView>
          {/*fourthscreen*/}
        </Swiper>
      );
    } else {
      return (
        <View>{this._showModal()}</View>
      )
    }

  }
}

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});
