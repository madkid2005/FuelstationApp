import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker'; // برای انتخاب تاریخ شمسی نیاز به کتابخانه مناسب دارید

const FuelStationForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fuelStationName: '',
    fuelTanksCount: '',
    gasTanksCount: '',
    fuelTankCapacities: [],
    gasTankCapacities: [],
    controlPeriod: { start: '', end: '' },
    initialFuelAmount: '',
    initialGasAmount: '',
    receivedFuelAmount: '',
    receivedGasAmount: '',
    electronicFuelSales: '',
    electronicGasSales: '',
    fuelNozzleSales: [],
    gasNozzleSales: []
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    navigation.navigate('Results', { formData });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>اسم جایگاه سوخت:</Text>
        <TextInput
          style={styles.input}
          value={formData.fuelStationName}
          onChangeText={value => handleInputChange('fuelStationName', value)}
        />

        <Text>تعداد مخازن بنزین:</Text>
        <TextInput
          style={styles.input}
          value={formData.fuelTanksCount}
          keyboardType="numeric"
          onChangeText={value => handleInputChange('fuelTanksCount', value)}
        />

        <Text>تعداد مخازن گاز:</Text>
        <TextInput
          style={styles.input}
          value={formData.gasTanksCount}
          keyboardType="numeric"
          onChangeText={value => handleInputChange('gasTanksCount', value)}
        />

        {/* فیلدهای دیگر فرم را اضافه کنید */}

        <Button title="تایید" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default FuelStationForm;
