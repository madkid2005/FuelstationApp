
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Button } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment-jalaali';

// تنظیم زبان تقویم برای شمسی
LocaleConfig.locales['fa'] = {
  monthNames: [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ],
  monthNamesShort: [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ],
  dayNames: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  dayNamesShort: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  today: 'امروز'
};
LocaleConfig.defaultLocale = 'fa';

const JalaliCalendar = ({ selectedDate, onDateChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(selectedDate);

  const onDayPress = (day) => {
    // تبدیل تاریخ میلادی به شمسی
    const formattedDate = moment(day.dateString, 'YYYY-MM-DD').locale('fa').format('jYYYY/jMM/jDD');
    setSelected(formattedDate);
    onDateChange(formattedDate);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={selected}
          placeholder="انتخاب تاریخ"
          editable={false}
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={moment(selected, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')}
              markedDates={{ [moment(selected, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')]: { selected: true, marked: true, selectedColor: 'blue' } }}
              onDayPress={onDayPress}
              theme={{
                calendarBackground: 'white',
                dayTextColor: 'black',
                todayTextColor: 'blue',
                selectedDayBackgroundColor: 'blue',
                selectedDayTextColor: 'white'
              }}
            />
          </View>
          <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>بستن</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white',
  },
  input: {
    padding: 10,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default JalaliCalendar;
