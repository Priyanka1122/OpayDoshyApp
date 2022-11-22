import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import TextView from 'comp/TextView';
import R from 'res/R';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import SubmitButton from 'comp/SubmitButton';
import {RFValue} from 'react-native-responsive-fontsize';
import {ScrollView} from 'react-native-gesture-handler';
import Header from 'comp/Header';
const points = `If joining Doshy, you’ll need to: 

\t- be 18 years old and over

\t- be an Australian citizen / permanent resident

\t- have an Australian drivers licence ID`;

export default class GettingStarted extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisibility: false,
    };
  }

  _renderModalTNC() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisibility}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          // this.setModalVisibilityMAP()
          this.setState({modalVisibility: false});
        }}>
        {this._renderModalTermsCondition()}
      </Modal>
    );
  }

  _renderModalTermsCondition() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header
          title={'Terms of Service & Privacy'}
          showBackButton={true}
          crossEnable={true}
          backPress={() => this.setState({modalVisibility: false})}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar
            translucent={true}
            barStyle="dark-content"
            backgroundColor={R.color.appTheme}
            hidden={false}
          />
          <View style={{flex: 0.3}} />
          <View
            style={{
              flex: 1,
              marginLeft: moderateScale(25),
              marginRight: moderateScale(25),
            }}>
            <TextView
              textValue={'Before we get started'}
              textStyle={{
                color: R.color.appTheme,
                fontSize: 26,
                fontWeight: 'bold',
              }}
            />
            <TextView
              textValue={points}
              textStyle={{
                marginTop: moderateScale(25),
                color: R.color.lightgrey,
                fontSize: RFValue(16),
                fontWeight: '600',
                lineHeight: 20,
              }}
            />
          </View>
          <View style={{flex: 0.8, paddingHorizontal: 25}}>
            <Text
              allowFontScaling={true}
              style={{
                color: R.color.lightgrey,
                fontSize: RFValue(16),
                fontWeight: '600',
              }}>
              By continuing, you agree to the{' '}
              {
                <TouchableOpacity
                  onPress={() => this.setState({modalVisibility: true})}>
                  <Text
                    style={{
                      color: R.color.appTheme,
                      fontSize: RFValue(16),
                      fontWeight: '600',
                    }}>
                    Terms of Service & Privacy Policy
                  </Text>
                </TouchableOpacity>
              }
            </Text>
          </View>

          <SubmitButton
            onButtonClick={() => {
              this.props.navigation.replace('EnterDetailsView');
            }}
            textValue={'Get started'}
          />
          {this._renderModalTNC()}
        </SafeAreaView>
      </ScrollView>
    );
  }
}
