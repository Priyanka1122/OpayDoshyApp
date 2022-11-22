import React from 'react'
import TextView from 'comp/TextView'
import {View,TouchableOpacity,Modal} from 'react-native'

const ShowModal =({modalVisibility,setModalVisibility,title,subTitle,})=>{
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibility}
            onRequestClose={setModalVisibility}
        >
            <View style={{flex:1,backgroundColor:"rgba(255,255,255,0.7)",alignItems:'center',justifyContent:'center'}}>
                <View style={{width:"80%",padding:20,backgroundColor:'#EBEBEB',borderRadius:10,overflow: 'hidden',alignItems:'center',justifyContent:'center',}}>
                    <TextView textValue={title} textStyle={{fontSize:17,marginVertical:5}} />
                    <TextView textValue={subTitle} textStyle={{textAlign:'left',fontSize:13,marginVertical:5}} />
                    <View style={{height:1,marginVertical:5,width:'120%',backgroundColor: '#fff',}}/>
                    <TouchableOpacity style={{paddingVertical:5,paddingHorizontal: 10,marginTop:10}} onPress={setModalVisibility}>
                        <TextView textValue={"Okay"} textStyle={{fontSize:17}} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ShowModal