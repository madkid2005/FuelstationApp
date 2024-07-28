import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import * as Print from 'expo-print';
import moment from 'moment-jalaali';

const FuelResults = ({ results }) => {
  const [currentTime, setCurrentTime] = useState('');

  const handleButtonClick = () => {
    const now = moment();
    const formattedTime = now.format('HH:mm:ss');
    const formattedDate = now.format('jYYYY/jMM/jDD');
    setCurrentTime(`تاریخ: ${formattedDate} - ساعت: ${formattedTime}`);
  };

  const generatePDF = async () => {
    const nozzlesHtml = results.MadkidXF.map((_, index) => `
      <p>نازل ${index + 1}:</p>
      <p>شروع دوره: ${results.MadkidXF[index]}</p>
      <p>پایان دوره: ${results.MadkidYG[index]}</p>
    `).join('');

    const htmlContent = `
      <html>
        <body>
          <h1>گزارش جایگاه بنزین</h1>
          <p>نام جایگاه: ${results.names}</p>
          <p>نام کنترل کننده: ${results.namesboos}</p>
          <p>ابتدای دوره بنزین: ${results.allfuels}</p>
          <p>دوره رسید: ${results.receivedFuelJV}</p>
          <p>کل فروش الکترونیکی بنزینطبق سامانه: ${results.electrofuelJV}</p>
          <p>جمع مخازن بنزین: ${results.finalFuelQuantity}</p>
          <p>مقدار فروش مکانیکی هر نازل بنزین: ${results.mechanicalSalesPerNozzleFuel.join(', ')}</p>
          <p>کل فروش مکانیکی دوره نازل‌های بنزین: ${results.totalMechanicalSalesFuel}</p>
          <p>کل موجودی بنزین: ${results.totalFuel}</p>
          <p>کل فراورده بنزینخارج شده دوره از جایگاه: ${results.totalProductFuelOut}</p>
          <p>بعد از فروش باید موجود باشد - بنزین: ${results.afterSalesFuel}</p>
          <p>تفاوت موجودی و فروش بنزین: ${results.shortageOrSurplusFuel > 0 ? `-${results.shortageOrSurplusFuel}` : results.shortageOrSurplusFuel}</p>
          <p>کسری مجاز بنزین: ${results.allowableShortageFuel}</p>
          <p>کسری غیرمجاز بنزین: ${results.illegalShortageFuel}</p>
          ${nozzlesHtml}
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
      <View style={styles.header}>
        <Text style={styles.headerText}>نام جایگاه : {results.names}</Text>
        <Text style={styles.headerText}>کنترل کننده : {results.namesboos}</Text>
        <Text style={styles.headerText}>دوره کنترل : از {results.startDateJS} تا {results.endDateJS}</Text>
        <Text style={styles.headerText}>تاریخ بازدید : {results.formattedDateJV}</Text>
        <Text style={styles.headerText}>ساعت : {results.formattedTimeJV}</Text>
      </View>

      <View style={styles.table}>
        <Text style={[styles.sectionHeader, styles.highlightedText]}>گزارش عملیات بنزین</Text>
        
          <Text style={styles.cellText}>ابتدای دوره : {results.allfuels}</Text>
       <Text style={styles.cellText}>رسید : {results.receivedFuelJV}</Text>
       
       {results.tanksFuelF && results.tanksFuelF.length > 0 && results.tanksFuelF.map((_, index) => (
          <View key={`tanksFuelF-${index}`} style={[styles.row, styles.rowReverse]}>
            <Text style={styles.cellText}>مخزن {index + 1}:</Text>
            <Text style={styles.cellText}>{results.tanksFuelF[index]}</Text>
          </View>
        ))}
        <Text style={[styles.cellText, styles.paddintb ]}>جمع مخازن : {results.finalFuelQuantity}</Text>

          <View style={styles.row}>
          <View style={styles.cell}><Text style={styles.cellText}>فروش</Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>انتها دوره </Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>ابتدا دوره </Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>نازل </Text></View>
        </View>
{results.MadkidXF && results.MadkidXF.length > 0 && results.MadkidXF.map((_, index) => (
  <View key={`MadkidXF-${index}`} style={styles.row}>
    <Text style={styles.cell}>{results.MadkidZF[index]}</Text>

    <View style={styles.cell}><Text style={styles.cellText}> {results.MadkidYF[index]}</Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>{results.MadkidXF[index]}</Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>{index + 1}</Text></View>
  </View>
))}


        <View style={styles.totals}>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش مکانیکی بنزین: {results.totalMechanicalSalesFuel}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش الکترونیکی بنزینطبق گزارش سامانه: {results.electrofuelJV}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار سرک / کسری بنزین: {results.shortageOrSurplusFuel} {results.vaziatFuel}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کسری غیر مجاز بنزین: {results.illegalShortageFuel}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار مغایرت مکانیکی و الکترونیکی بنزین: {results.HF}</Text></View>
          </View>
        </View>
      </View>
     <Text style={[styles.cellText, styles.paddintt]}>                امضا:                                   تاریخ گزارش:                                </Text>

      
      <View style={styles.buttonContainer}>
        <Button title="ساخت PDF" onPress={generatePDF} color="#ff3333" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer:{
    padding: 20,
  },
  header: {
    backgroundColor: '#ff3333',
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff3333',
    textAlign: 'center',
  },
row: {
    flexDirection: 'row',
    writingDirection: 'rtl', // Ensure the row's text direction is right-to-left
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  cellText: {
    fontSize: 14,
    textAlign: 'right',
    writingDirection: 'rtl', // Ensure the cell's text direction is right-to-left
  },
  nozzleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nozzleText: {
    fontSize: 14,
  },
  totals: {
    marginTop: 10,
  },
  totalRow: {
    fontSize: 14,
    marginBottom: 5,
  },
  timeContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  timeText: {
    fontSize: 16,
    textAlign: 'right',
  },
  backgroundred: {
    backgroundColor: '#fff333',
  },
  paddintb:{
    paddingBottom: 10, 

  },
  paddintt:{
    paddingTop: 10, 

  },
});

export default FuelResults;
