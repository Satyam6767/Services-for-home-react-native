import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';

export default function ProfileScreen() {
    const { user } = useUser();

    return user && (
        <View style={styles.container}>
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
                    <View>
                        <Text style={{ color: Colors.WHITE, fontFamily: 'outfit-bold' }}>Welcome,</Text>
                        <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit' }}>{user?.fullName}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    profileMainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    }
});
