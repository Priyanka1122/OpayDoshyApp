import React from 'react';
import {TouchableOpacity, View, Animated, Dimensions} from 'react-native';
import TextView from 'comp/TextView';
import R from 'res/R';
import {BoxShadow} from 'react-native-shadow';
import {
  moderateScale,
  verticalScale,
} from '../../responsiveStyle/responsiveStyle';

const shadowOpt = {
  width: (Dimensions.get('window').width / 100) * 97,
  height: 50,
  color: R.color.appTheme,
  border: 2,
  radius: 3,
  opacity: 0.1,
  x: 0,
  y: 10,
  style: {borderRadius: 30, alignItems: 'center'},
};

const SubmitButton = ({textValue, onButtonClick, disabledButton}) => {
  return (
    <View
      style={{
        opacity: disabledButton ? 0.5 : 1,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 25,
      }}>
      {/* <BoxShadow setting={shadowOpt}> */}
      <TouchableOpacity
        onPress={onButtonClick}
        disabled={disabledButton}
        style={{
          backgroundColor: R.color.appTheme,
          width: '100%',
          shadowColor: '#4083FF',
          shadowOffset: {width: 8, height: 20},
          shadowOpacity: 0.1,
          shadowRadius: 30,
          elevation: 5,
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          marginHorizontal: moderateScale(25),
        }}>
        <TextView
          textValue={textValue}
          textStyle={{
            fontFamily: 'OpenSans-Bold',
            color: 'white',
            fontSize: 16,
          }}
        />
      </TouchableOpacity>
      {/*</BoxShadow>*/}
    </View>
  );
};

export default SubmitButton;
