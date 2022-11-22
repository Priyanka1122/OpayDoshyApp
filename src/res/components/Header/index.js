import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import R from 'res/R';
import TextView from 'comp/TextView';
import {
  scale,
  verticalScale,
  textScale,
  moderateScale,
} from '../../responsiveStyle/responsiveStyle';
import {RFValue} from 'react-native-responsive-fontsize';
const Header = ({
  title,
  showBackButton,
  backPress,
  hideElevation,
  crossEnable,
  showExtraBtn,
  extraBtnText,
  extraBtnPress,
  backBtntext,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: verticalScale(60),
        backgroundColor: 'white',
        elevation: !hideElevation ? 10 : 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {showBackButton && (
        <TouchableOpacity
          onPress={backPress}
          style={{position: 'absolute', left: 0, padding: moderateScale(10)}}>
          {!backBtntext && (
            <Image source={crossEnable ? R.Images.cross : R.Images.backArrow} />
          )}
          {backBtntext && (
            <TextView
              textValue={backBtntext}
              textStyle={{color: R.color.appTheme}}
            />
          )}
        </TouchableOpacity>
      )}
      <TextView
        textValue={title}
        textStyle={{
          fontSize: 20,
          fontFamily: 'OpenSans-SemiBold',
          color: '#636363',
        }}
      />
      {showExtraBtn && (
        <TouchableOpacity
          onPress={extraBtnPress}
          style={{position: 'absolute', right: 0, padding: moderateScale(10)}}>
          <TextView
            textValue={extraBtnText}
            textStyle={{color: R.color.appTheme}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
