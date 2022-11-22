import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import R from 'res/R';
import TextView from 'comp/TextView';
import {verticalScale} from '../../responsiveStyle/responsiveStyle';

const TextInputView = ({
  title,
  textChange,
  textValue,
  keyBoard,
  length,
  autoFocusEnabled,
  onChangeText,
  reff,
  returnType,
  onSubmit,
  blur,
}) => {
  return (
    <View style={{marginVertical: 5}}>
      <TextInput
        blurOnSubmit={blur}
        ref={reff}
        returnKeyType={returnType}
        autoFocus={autoFocusEnabled}
        keyboardType={keyBoard}
        onChange={onChangeText}
        onSubmitEditing={onSubmit}
        onChangeText={textChange}
        value={textValue}
        maxLength={length}
        style={{
          fontFamily: 'OpenSans-Bold',
          height: verticalScale(60),
          width: '100%',
          borderBottomColor:
            textValue == '' ? R.color.appTheme : R.color.appTheme,
          borderBottomWidth: 1,
          color: '#636363',
          fontSize: 18,
          fontWeight: 'bold',
        }}
      />
      <TextView
        textValue={title}
        textStyle={{
          fontFamily: 'OpenSans-Bold',
          marginVertical: 5,
          color: textValue == '' ? R.color.appTheme : R.color.appTheme,
          fontSize: 16,
          fontWeight: 'bold',
        }}
      />
    </View>
  );
};

export default TextInputView;
