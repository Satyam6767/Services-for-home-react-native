import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import PageHeading from '../../Components/PageHeading';

export default function BusinessListByCategoryScreen() {
    const param = useRoute().params;
    const navigation = useNavigation();

    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        param && getBusinessByCategory()
    }, [param]) 
   
        
    const getBusinessByCategory = () => { 
        GlobalApi.getBusinessListByCategory(param.category)
            .then(resp => {
                setBusinessList(resp.businessLists)
            })
    }
    return (
        <View style={{ paddingTop: 30, padding: 20 }}>
            {/* <PageHeading /> */}
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', gap: 10,
                alignItems: 'center'}}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
                <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>{param?.category}</Text>
            </TouchableOpacity>
            
            {businessList?.length>0? <FlatList
                data={businessList}
                style={{marginTop:15}}
                renderItem={({ item, index }) => (
                    <BusinessListItem business={item} />
                )}
            />:
            <Text style={{fontFamily:"outfit-medium", fontSize:20, marginTop:'15%', textAlign:'center'}}>No business found</Text>}
        </View>
    )
}