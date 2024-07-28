import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Results = ({ route, navigation }) => {
  const { formData } = route.params;

  // مثال محاسبات
  const calculateResults = () => {
    const fuelNozzleSales = formData.fuelNozzleSales.map(nozzle => nozzle.end - nozzle.start);
    const gasNozzleSales = formData.gasNozzleSales.map(nozzle => nozzle.end - nozzle.start);

    // سایر محاسبات را انجام دهید

    return {
      fuelNozzleSales,
      gasNozzleSales,
      // سایر نتایج
    };
  };

  const results = calculateResults();

  const handleCreatePdf = async () => {
    let options = {
      html: `<h1>نتایج</h1><p>${JSON.stringify(results)}</p>`,
      fileName: 'Results',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>نتایج:</Text>
        <Text>مقدار فروش مکانیکی هر نازل گاز: {results.fuelNozzleSales.join(', ')}</Text>
        <Text>مقدار فروش مکانیکی هر نازل بنزین: {results.gasNozzleSales.join(', ')}</Text>
        {/* نمایش سایر نتایج */}

        <Button title="ایجاد PDF" onPress={handleCreatePdf} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default Results;
