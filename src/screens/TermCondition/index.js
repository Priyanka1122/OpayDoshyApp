import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import R from 'res/R';
import TextView from 'comp/TextView';
import Header from 'comp/Header';

export default class TermCondition extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View
          style={{
            flexDirection: 'row',
            height: 70,
            marginTop: '8%',
            marginHorizontal: '5%',
          }}>
          <Image source={R.Images.cross} />
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 16,
              marginLeft: '10%',
              fontWeight: '900',
              color: '#636363',
            }}>
            Terms of Services & Privacy
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
