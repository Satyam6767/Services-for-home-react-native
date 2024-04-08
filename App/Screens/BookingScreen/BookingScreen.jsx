import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PageHeading from '../../Components/PageHeading';
import { useUser } from '@clerk/clerk-expo';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem';

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then((resp) => {
      setBookingList(resp.bookings);
      setLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={bookingList}
          onRefresh={getUserBookings}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListItem
              business={item?.businessList}
              booking={item}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatListContainer: {
    marginTop: 10,
  },
});
