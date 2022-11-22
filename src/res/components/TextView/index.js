import React from 'react'
import {View,Text} from 'react-native'
import R from 'res/R'
const TextView = ({
    textValue,
    textStyle,
    lines
})=>{
    return(
        <Text numberOfLines={lines} allowFontScaling={true} style={[textStyle,{}]}>
            {textValue}
        </Text>
    )
} 

export default TextView