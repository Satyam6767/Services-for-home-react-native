import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import {useNavigation} from '@react-navigation/native'

export default function BusinessListItemSmall({business}) {
const navigation = useNavigation()

  return (
    <TouchableOpacity
    onPress={()=>navigation.push('business-detail',{
      business:business
    })}
    
     style={styles.container}>
        {/* <Text>Hi</Text> */}
      <Image source={{uri:business?.images?.url}}
      style={styles.image}
       />
       <View>
        <Text style={{fontSize:17, fontFamily:'outfit-medium'}}>{business?.name}</Text>
        <Text style={{fontSize:13, fontFamily:'outfit'}}>{business?.contactPerson}</Text>
        {/* <Text>{business?.about}</Text> */}
       </View> 
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    image:{
        width:160,
        height:70,
        borderRadius:10
    },
    container:{
        padding:10,
        backgroundColor:Colors.WHITE,
         borderRadius:10

    }
})