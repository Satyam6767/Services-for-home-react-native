import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { Fontisto } from '@expo/vector-icons';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
    const param = useRoute().params;
    const [business, setBusiness] = useState(param.business);
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // console.log(param?.business)
    }, [param]);

    const handleSendMessage = () => {
        Linking.openURL(`mailto:${business.email}?subject=Message%20from%20App`);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity
                    style={styles.backBtnContainer}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </TouchableOpacity>
                <Image
                    source={{ uri: business?.images?.url }}
                    style={styles.image}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{business?.name}</Text>
                    <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
                    <Text style={styles.about}><Ionicons name="call-outline" size={16} color={Colors.PRIMARY} /> {business?.about}</Text>
                    <Text style={styles.email}><Fontisto name="email" size={17} color={Colors.PRIMARY} /> {business?.email}</Text>
                    <View style={styles.addressContainer}>
                        <Entypo name="location-pin" size={20} color={Colors.PRIMARY} />
                        <Text style={styles.address}>{business?.address}</Text>
                    </View>
                    <Text style={styles.me}>About Me</Text>
                    <Text style={styles.lorem}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada magna a lorem tristique, vel eleifend mi venenatis. Integer a libero sit amet turpis accumsan ultricies. Cras vitae vestibulum est. Sed auctor, lacus id viverra hendrerit, purus risus hendrerit eros, in varius magna turpis nec velit. Nulla sed dolor non felis rhoncus laoreet vel vel ex. Nunc vitae orci sit amet eros viverra hendrerit. Duis vestibulum tristique eros, in tincidunt lectus ullamcorper eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus auctor nulla id purus hendrerit, vel commodo sem ullamcorper. Aenean vitae nisl est. Fusce nec pharetra nisi. Aliquam non mi est. Phasellus aliquam eros in turpis vehicula, in hendrerit justo scelerisque. Phasellus nec aliquam libero.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.messageBtn} onPress={handleSendMessage}>
                    <Text style={styles.btnText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookingBtn} onPress={() => setShowModal(true)}>
                    <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType='slide' visible={showModal}>
                <BookingModal businessId={business.id} hideModal={() => setShowModal(false)} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    backBtnContainer: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 10,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 30,
    },
    infoContainer: {
        padding: 20,
    },
    name: {
        fontFamily: "outfit-bold",
        fontSize: 30,
        color: Colors.PRIMARY,
        marginBottom: 10,
    },
    me: {
        fontFamily: "outfit-medium",
        fontSize: 18,
        color: Colors.PRIMARY,
        marginBottom: 10,
    },
    contactPerson: {
        fontFamily: "outfit-medium",
        color: Colors.SECONDARY,
        fontSize: 22,
        marginBottom: 10,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    address: {
        fontSize: 18,
        color: Colors.DARK_GREY,
        marginLeft: 10,
        marginBottom: 10,
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 18,
        color: Colors.DARK_GREY,
        marginBottom: 10,
    },
    about: {
        fontSize: 20,
        color: Colors.DARK_GREY,
        marginBottom: 10,
    },
    lorem: {
        fontSize: 16,
        color: Colors.DARK_GREY,
        marginBottom: 20,
        lineHeight: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 8
    },
    messageBtn: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingVertical: 12,
        marginRight: 10,
    },
    bookingBtn: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingVertical: 12,
        marginLeft: 10,
    },
    btnText: {
        fontFamily: 'outfit-medium',
        color: Colors.WHITE,
        fontSize: 16,
        textAlign: 'center',
    },
});
