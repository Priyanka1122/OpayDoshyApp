import React from 'react';
import {View, Text, Dimensions, Image, StatusBar, Linking} from 'react-native';
import R from 'res/R';
import SubmitButton from 'comp/SubmitButton';
import TextView from 'comp/TextView';
import Utils from 'res/Utils';
import {RFValue} from 'react-native-responsive-fontsize';

const openUrl = 'https://calendly.com/doshy/onboarding';

export default class SignUpSuccess extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={R.Images.star} />
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <TextView
            textValue={`Congrats!\nYou’re now signed up`}
            textStyle={{
              fontFamily: 'Opensans-Bold',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: R.color.appTheme,
            }}
          />
          <View style={{marginVertical: 10, marginTop: '18%'}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: '5%',
                textAlign: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Opensans-SemiBold',
                  fontSize: RFValue(16),
                  textAlign: 'center',
                  color: '#636363',
                }}>
                One final thing, schedule a quick 10-min call with us to
                auto-forward your bills to Doshy:
                {/* We look forward to helping you set your email bills to forward
                to Doshy - chat soon! */}
              </Text>
              <Text
                style={{
                  fontFamily: 'Opensans-SemiBold',
                  fontSize: RFValue(16),
                  textAlign: 'center',
                  marginTop: 15,
                  color: R.color.appTheme,
                }}
                onPress={() => {
                  Linking.openURL(openUrl);
                }}>
                https://calendly.com/doshy/onboarding
              </Text>
            </View>
          </View>
        </View>
        <SubmitButton
          onButtonClick={() => {
            Utils.storeData('IsSigned', true);
            this.props.navigation.replace('Bills');
          }}
          textValue={'Got it'}
        />
      </View>
    );
  }
}
