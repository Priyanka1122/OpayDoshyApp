import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Header from 'comp/Header';
import R from 'res/R';
import Icon from 'react-native-vector-icons/Ionicons';
import TextView from 'comp/TextView';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../res/responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
const data = [
  {
    key: '0',
    img: R.Images.opay,
    name: 'Belong',
    id: '012345',
  },
  {
    key: '1',
    img: R.Images.puzzle,
    name: 'Brimbank City Council',
    id: '123456',
  },
  {
    key: '2',
    img: R.Images.timer,
    name: 'City West Water',
    id: '234567',
  },
  {
    key: '3',
    img: R.Images.opay,
    name: 'VicRoads',
    id: '345678',
  },
  {
    key: '4',
    img: R.Images.cloud,
    name: 'Vodafone',
    id: '456789',
  },
];

const text = `Want to receive more of your bills on Doshy?\n\n
Help spread the word by telling your billers.\n\n
We’ve pre-drafted a message for you so you can email them with just two clicks.`;

export default class SpreadWord extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Header
          title={'Spread the word!'}
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
              marginHorizontal: moderateScale(25),
              marginTop: moderateScale(30),
            }}>
            <Text
              style={{
                fontSize: RFValue(16),
                color: '#636363',
                lineHeight: moderateScale(30),
              }}>
              Want to receive more of your bills on Doshy? Help spread the word
              by telling your billers. We’ve pre-drafted a message for you so
              you can email them with just two clicks.
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: moderateScale(30),
                  }}>
                  <View
                    style={{
                      width: Dimensions.get('window').width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        height: verticalScale(40),
                        width: scale(40),
                        borderRadius: moderateScale(50),
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: R.color.appTheme,
                      }}
                      source={item.img}
                    />
                  </View>
                  <View
                    style={{
                      width: Dimensions.get('window').width / 1.6,
                      justifyContent: 'center',
                    }}>
                    <TextView
                      textValue={item.name}
                      textStyle={{fontSize: 16, color: R.color.lightgrey}}
                    />
                    <TextView
                      textValue={`BPAY Biller ID:${item.id}`}
                      textStyle={{
                        fontSize: 14,
                        color: R.color.lightgrey,
                        marginVertical: 5,
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `mailto:support@example.com?subject=Please send me my Origin bills via Opay&body=Hi ${item.name},\n\nI’ve just signed up to Opay, which lets its many users like me easily receive bills on my phone.\n\nIt’s convenient and saves me a lot of time and hassle managing my bills.\n\nI’d like to receive my Origin bills through the Opay app. All Origin needs to do is sign up at Opayapp.com.au\n\nThanks!`,
                      )
                    }
                    style={{
                      width: Dimensions.get('window').width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: moderateScale(10),
                        height: verticalScale(45),
                        width: '100%',
                        backgroundColor: R.color.appTheme,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={'paper-plane-outline'}
                        color={'#fff'}
                        size={24}
                        solid
                      />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: moderateScale(-10),
                      height: 1,
                      left: 0,
                      right: 0,
                      marginLeft: moderateScale(80),
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: verticalScale(1),
                        backgroundColor: '#bbbbbb',
                        borderWidth: 0,
                        opacity: 0.3,
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
