import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Entypo } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'

export default function BusinessListItem({ business, booking }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',
        {
            business:business
        }
        )}>
            {/* <Text>hi</Text> */}
            <Image source={{ uri: business?.images?.url }}
                style={styles.image} 
            />
            <View style={styles.subContainer}>
                <Text style={{fontFamily:'outfit-medium',  fontSize:15}}>{business.contactPerson}</Text>
                {/* <Text style={{fontFamily:'outfit',  fontSize:15}}>{business.about}</Text> */}
                <Text style={{fontFamily:'outfit-bold', fontSize:19}}>{business.name}</Text>
                <Text style={{fontFamily:'outfit', fontSize:15, color:Colors.PRIMARY}}><Entypo name="location-pin" size={20} color={Colors.PRIMARY} />{business.address}</Text>
                {booking?.id?
                <Text style={{fontFamily:'outfit-medium'}}>{booking.date} at {booking.time}</Text>:null}
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    },
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        display:'flex',
        marginBottom: 15,
        flexDirection:'row', 
        gap:1
    },
    subContainer:{
        display:'flex',
        gap:8,
        marginLeft:8

    }
})