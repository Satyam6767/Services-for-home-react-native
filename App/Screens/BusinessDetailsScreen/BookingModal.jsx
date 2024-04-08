import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import {useUser} from '@clerk/clerk-expo'
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import moment from 'moment';

export default function BookingModal({ businessId, hideModal }) {
  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const {user} = useUser();
 

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ':00AM'
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ':00PM'
      });
    }
    setTimeList(timeList);
  }


  const createNewBooking =()=>{
    if(!selectedTime|| !selectedDate)
    {
      ToastAndroid.show('Please select date and time',ToastAndroid.LONG)

      return;
    }
    const data ={
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress.emailAddress,
      time:selectedTime,
      date:moment(selectedDate).format('DD-MM-YYYY') ,
      note:note, 
      businessId: businessId

 
    }
    GlobalApi.createBooking(data).then(resp=>{
      console.log("Resp", resp)
      ToastAndroid.show('Booking Created successfully',ToastAndroid.LONG)
      hideModal()
    })
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={{ padding: 20 }}>
      <TouchableOpacity style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
      }}
        onPress={hideModal}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
        <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>Booking</Text>
      </TouchableOpacity>

      <Heading text={'Select date:'} />
      <View style={styles.calenderContainer}>
        <CalendarPicker
          onDateChange={setSelectedDate}
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Colors.BLACK}
          todayTextStyle={{ color: Colors.WHITE }}
          selectedDayColor={Colors.PRIMARY}
          selectedDayTextColor={Colors.WHITE}
          customDatesStyles={[{
            date: selectedDate,
            style: {
              backgroundColor: Colors.PRIMARY,
              borderRadius: 15,
            },
            textStyle: {
              color: Colors.WHITE,
            },
          }]}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Heading text={'Select Time Slot:-'} />
        <FlatList
          data={timeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={{ marginRight: 10 }}
              onPress={() => setSelectedTime(item.time)}
            >
              <Text style={[selectedTime == item.time ?
                styles.selectedTime : styles.unselectedTime]}>
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>



      <View style={{ paddingTop: 20 }}>
        <Heading text={"Any suggestion"} />
        <TextInput placeholder='Note'
          numberOfLines={4} multiline={true}
          style={styles.noteTextArea}
          onChange={(text) => setNote(text)} />
      </View>

      <TouchableOpacity style={{marginTop:15}}
      onPress={()=>createNewBooking()}
      >
        <Text style={styles.confirmbtn}
        >Confirm & Book</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Colors.GREY,
    padding: 20,
    borderRadius: 15,
  },

  selectedTime: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY, // Corrected property name
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE
  },
  unselectedTime: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY, // Corrected property name
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 20,
    fontSize: 16,
    fontFamily: 'outfit',
    borderColor: Colors.Primary_LIGHT

  },
  confirmbtn: {
    textAlign: "center",
    fontFamily: 'outfit-medium',
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    borderRadius: 99,
    padding: 13, 
    elevation:2
  }
});
