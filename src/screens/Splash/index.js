import React from 'react';
import {Actions} from 'react-native-router-flux';
import {View, Image} from 'react-native';
import R from 'res/R';
import Utils from 'res/Utils';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import {StatusBar} from 'react-native';

const StyledImage = Animatable.createAnimatableComponent(styled.Image``);

export default class Splash extends React.Component {
  state = {
    visibleStatusBar: true,
  };

  componentDidMount() {
      Utils.getData(
        'IsSigned',
        (value = (data) => {
          console.log('CHECK DATA');
          console.log(data);
          if (data.value == null || data.value == false) {
          // this.props.navigation.navigate('Screens');
          setTimeout(()=>{
            Actions.Screens();
          },2000)
          
          } else {
          this.props.navigation.navigate('LoginNav');
          }
        }),
      );
  }
  render() {
    return (
      <View
        style={{
          flex: 1,

          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: R.color.appTheme,
        }}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor={R.color.appTheme}
          hidden={this.state.visibleStatusBar}
        />
        <StyledImage
          animation="fadeOut"
          easing="ease-in"
          useNativeDriver={true}
          source={R.Images.splash}
        />
      </View>
    );
  }
}
