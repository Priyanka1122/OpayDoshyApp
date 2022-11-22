import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import Bills from 'screens/Bills';
import Notification from 'screens/Notification';
import Settings from 'screens/Settings';
import SpreadWord from 'screens/SpreadWord';
import R from 'res/R';
import Account from 'screens/Account';
import Icon from 'react-native-vector-icons/Feather';

const TabMaterial = createMaterialBottomTabNavigator();

export default class Home extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <TabMaterial.Navigator
          initialRouteName={'Bills'}
          backBehavior={'initialRoute'}
          labeled={false}
          activeColor={R.color.appTheme}
          inactiveColor="rgba(0,0,0,0.5)"
          barStyle={{backgroundColor: 'white'}}>
          {/* <TabMaterial.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="bell" color={color} size={24} />
              ),
            }}
          /> */}

          <TabMaterial.Screen
            name="Notification"
            component={Notification}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="bell" color={color} size={24} />
              ),
            }}
          />

          <TabMaterial.Screen
            name="Bills"
            component={Bills}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="file" color={color} size={24} />
              ),
            }}
          />

          <TabMaterial.Screen
            name="Account"
            component={Account}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="user" color={color} size={24} />
              ),
            }}
          />
        </TabMaterial.Navigator>
      </SafeAreaView>
    );
  }
}
