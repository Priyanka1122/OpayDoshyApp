import React from 'react';
import { View,TextInput } from 'react-native';
export default class Focus extends React.Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
 <TextInput
   ref="first"
   style={{width:100,height:100,borderWidth:1}}
   maxLength={1}
   keyboardType="numeric"
   returnKeyType='next'
   blurOnSubmit={false}
   placeholderTextColor="gray"
   onChangeText={(val) => {
      this.refs['second'].focus()
   }}
  />
  <TextInput
   ref="second"
   style={{width:100,height:100,borderWidth:1}}
   maxLength={1}
   keyboardType="numeric"
   returnKeyType='next'
   blurOnSubmit={false}
   placeholderTextColor="gray"
   onChangeText={(val) => {
     this.refs['third'].focus()
   }}
  />
            </View>
        )
    }
}


<Stack.Screen name="SplashNav" component={SplashNav} />