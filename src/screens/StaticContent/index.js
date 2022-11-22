import React from 'react';
import {View, StatusBar} from 'react-native';
import Header from 'comp/Header';

export default class StaticContent extends React.Component {
  render() {
    return (
      <View>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Header
          title={this.props.route.params.screen}
          showBackButton={true}
          backPress={() => this.props.navigation.goBack(null)}
        />
      </View>
    );
  }
}
