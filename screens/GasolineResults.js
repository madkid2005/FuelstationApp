import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import * as Print from 'expo-print';

const GasolineResults = ({ results }) => {
  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>گزارش جایگاه</h1>
          <p>نام جایگاه: ${results.names}</p>
          <p>نام کنترل کننده: ${results.namesboos}</p>
          <p>ابتدای دوره بنزین: ${results.allfuels}</p>
          <p>رسید دوره: ${results.receivedFuelJV}</p>
          <p>کل فروش الکترونیکی بنزین طبق سامانه: ${results.electrofuelJV}</p>
          <p>جمع مخازن بنزین: ${results.finalFuelQuantity}</p>
          <p>مقدار فروش مکانیکی هر نازل بنزین: ${results.mechanicalSalesPerNozzleFuel.join(', ')}</p>
          <p>کل فروش مکانیکی دوره نازل‌های بنزین: ${results.totalMechanicalSalesFuel}</p>
          <p>کل موجودی بنزین: ${results.totalFuel}</p>
          <p>کل فراورده بنزین خارج شده دوره از جایگاه: ${results.totalProductFuelOut}</p>
          <p>بعد از فروش باید موجود باشد - بنزین: ${results.afterSalesFuel}</p>
          <p>تفاوت موجودی و فروش بنزین: ${results.shortageOrSurplusFuel > 0 ? `-${results.shortageOrSurplusFuel}` : results.shortageOrSurplusFuel}</p>
          <p>کسری مجاز بنزین: ${results.allowableShortageFuel}</p>
          <p>کسری غیرمجاز بنزین: ${results.illegalShortageFuel}</p>
        </body>
      </html>
    `;

    try {
      await Print.printAsync({
        html: htmlContent,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.resultText}>نام جایگاه: {results.names}</Text>
      <Text style={styles.resultText}>نام کنترل کننده: {results.namesboos}</Text>
      <Text style={styles.resultText}>دوره کنترل: {results.startDateJS} - {results.endDateJS}</Text>
      <Text style={styles.resultText}>تاریخ بازدید: {results.timeString}</Text>
      <Text style={styles.resultText}>ساعت: {results.timeString}</Text>
      <Text style={styles.resultText}>ابتدای دوره بنزین: {results.allfuels}</Text>
      <Text style={styles.resultText}>رسید دوره: {results.receivedFuelJV}</Text>
      <Text style={styles.resultText}>مخازن:</Text>
      <Text style={styles.resultText}>جمع مخازن بنزین: {results.finalFuelQuantity}</Text>
      <Text style={styles.resultText}>کل فروش الکترونیکی بنزین طبق سامانه: {results.electrofuelJV}</Text>
      
         

      <Text style={styles.resultText}>کل فروش مکانیکی دوره نازل‌های بنزین: {results.totalMechanicalSalesFuel}</Text>
      <Text style={styles.resultText}>کل موجودی بنزین: {results.totalFuel}</Text>
      <Text style={styles.resultText}>کل فراورده بنزین خارج شده دوره از جایگاه: {results.totalProductFuelOut}</Text>
      <Text style={styles.resultText}>بعد از فروش باید موجود باشد - بنزین: {results.afterSalesFuel}</Text>
      <Text style={styles.resultText}>تفاوت موجودی و فروش بنزین: {results.shortageOrSurplusFuel > 0 ? `-${results.shortageOrSurplusFuel}` : results.shortageOrSurplusFuel}</Text>
      <Text style={styles.resultText}>کسری مجاز بنزین: {results.allowableShortageFuel}</Text>
      <Text style={styles.resultText}>کسری غیرمجاز بنزین: {results.illegalShortageFuel}</Text>
      <Button title="ساخت PDF" onPress={generatePDF} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  resultText: {
    fontSize: 14,
    marginBottom: 5,
  },
  nozzleContainer: {
    marginBottom: 10,
  },
});

export default GasolineResults;
