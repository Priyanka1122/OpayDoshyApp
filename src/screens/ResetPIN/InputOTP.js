import React from 'react'
import {View,Dimensions} from 'react-native'
import TextView from 'comp/TextView'
import R from 'res/R'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export default class InputOTP extends React.Component{
    render(){
        return(
            <KeyboardAwareScrollView>
                <View style={{height:Dimensions.get("window").height-80}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <TextView textValue={`We’ve texted a code to ${this.props.mobileNumProp}`} textStyle={{color:R.color.lightgrey,fontSize:16,textAlign:'center',}}/>
                        <TextView textValue={" - enter it below to reset your PIN."} textStyle={{color:R.color.lightgrey,fontSize:16,textAlign:'center',}}/>
                    </View>
                    <View style={{flex:3,width:'100%',alignItems:'center'}}>
                        <OTPInputView
                            style={{width:250, height: 100,paddingHorizontal:10}}
                            pinCount={4}
                            secureTextEntry={true}
                            KeyboardType={"number-pad"}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            // onCodeChanged = {code => { this.setState({code})}}
                            autoFocusOnLoad
                            codeInputFieldStyle={{
                                width: 50,
                                height: 60,
                                borderWidth: 2 ,
                                borderRadius:15,
                                borderColor:"#bbbbbb",
                                alignItems:'center',
                                fontSize:20,
                                color:R.color.lightgrey
                            }}
                            codeInputHighlightStyle={{
                                color:R.color.appTheme,
                                fontSize:20,
                                borderColor: R.color.appTheme,
                            }}
                            onCodeFilled = {(inpCode => this.props.pinInputProp(inpCode))}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}