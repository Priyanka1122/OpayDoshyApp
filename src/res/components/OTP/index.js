import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native'
import R from 'res/R'


const OTP =({pinLength})=>{
    const [isFocused, setIsFocused] = useState({ focused: true, index: 0 });

    const OTPTextInp =[]
    const inputs = Array(parseInt(pinLength)).fill(0);
    return(
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            {inputs.map((input,index)=>{
                return(
                    <TextInput
                        style={
                            isFocused.focused && index === isFocused.index
                              ? styles.inpStyleFocused
                              : styles.inpStyle
                          }
                        style={[{backgroundColor:'red'},styles.inpStyle]}
                        maxLength={1}
                        onChange={focus}
                        />
                )
            })}
        </View>
    )

    function focus(e) {
        // setOtp(otp.concat(this.value));
        setIsFocused({ focused: true, index: isFocused.index + 1 });
        isFocused.index ? e.focus() : null;
      }
    
    // return(
    //     <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

            
    //         <TextInput
    //             style={[{backgroundColor:'green'},styles.inpStyle]}
    //             maxLength={1}
    //             /> 
    //         <TextInput
    //             style={[{backgroundColor:'pink'},styles.inpStyle]}
    //             maxLength={1}
    //             />
    //         <TextInput
    //             style={[{backgroundColor:'blue'},styles.inpStyle]}
    //             maxLength={1}
    //             />
    //     </View>
    // )
}

const styles = StyleSheet.create({
    inpStyle:{
        padding:15,
        paddingHorizontal:10,
        marginHorizontal:5,
        borderWidth:2,
        borderColor:R.color.lightgrey,
        borderRadius:10,
        textAlign:'center',
        fontSize:16,
        
    },
    inpStyleFocused:{
        padding:15,
        paddingHorizontal:10,
        marginHorizontal:5,
        borderWidth:2,
        borderColor:R.color.appTheme,
        borderRadius:10,
        textAlign:'center',
        fontSize:16,
    }
})

export default OTP