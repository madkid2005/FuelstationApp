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
      <p>پایان دوره: ${results.MadkidYF[index]}</p>
    `).join('');

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              padding: 20px;
              background-color: #fff;
            }
            .header {
              background-color: #ff3333;
              padding: 10px;
              margin-bottom: 10px;
            }
            .header-text {
              color: #fff;
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .table {
              border: 1px solid #000;
              padding: 10px;
            }
            .section-header {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
              color: #ff3333;
              text-align: center;
            }
            .button {
              background-color: #ff3333;
              padding: 5px;
              border-radius: 5px;
              text-align: center;
            }
            .button-text {
              color: #000000;
              font-size: 16px;
            }
            .row {
              display: flex;
              flex-direction: row;
              writing-direction: rtl;
            }
            .cell {
              flex: 1;
              border: 1px solid #000;
              text-align: center;
              padding: 5px;
            }
            .cell-text {
              font-size: 14px;
              text-align: right;
              writing-direction: rtl;
            }
            .totals {
              margin-top: 10px;
            }
            .time-container {
              margin-top: 20px;
              padding: 10px;
              border: 1px solid #000;
              border-radius: 5px;
              background-color: #F0F0F0;
            }
            .time-text {
              font-size: 16px;
              text-align: right;
            }
            .background-red {
              background-color: #fff333;
            }
            .padding-tb {
              padding-bottom: 10px;
            }
            .padding-tt {
              padding-top: 10px;
            }
            .row-reverse {
              flex-direction: row-reverse;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <p class="header-text">نام جایگاه: ${results.names}</p>
            <p class="header-text">کنترل کننده: ${results.namesboos}</p>
            <p class="header-text">دوره کنترل: از ${results.startDateJS} تا ${results.endDateJS}</p>
            <p class="header-text">تاریخ بازدید: ${results.formattedDateJV}</p>
            <p class="header-text">ساعت: ${results.formattedTimeJV}</p>
          </div>
          <div class="table">
            <p class="section-header">گزارش عملیات بنزین</p>
            <p class="cell-text">ابتدای دوره: ${results.allfuels}</p>
            <p class="cell-text">رسید: ${results.receivedFuelJV}</p>
            ${results.tanksFuelF && results.tanksFuelF.length > 0 ? results.tanksFuelF.map((_, index) => `
              <div class="row row-reverse">
                <p class="cell-text">مخزن ${index + 1}: ${results.tanksFuelF[index]}</p>
              </div>
            `).join('') : ''}
            <p class="cell-text padding-tb">جمع مخازن: ${results.finalFuelQuantity}</p>
            <div class="row">
              <div class="cell"><p class="cell-text">فروش</p></div>
              <div class="cell"><p class="cell-text">انتها دوره</p></div>
              <div class="cell"><p class="cell-text">ابتدا دوره</p></div>
              <div class="cell"><p class="cell-text">نازل</p></div>
            </div>
            ${results.MadkidXF && results.MadkidXF.length > 0 ? results.MadkidXF.map((_, index) => `
              <div class="row">
                <p class="cell">${results.MadkidZF[index]}</p>
                <div class="cell"><p class="cell-text">${results.MadkidYF[index]}</p></div>
                <div class="cell"><p class="cell-text">${results.MadkidXF[index]}</p></div>
                <div class="cell"><p class="cell-text">${index + 1}</p></div>
              </div>
            `).join('') : ''}
            <div class="totals">
              <div class="row">
                <div class="cell"><p class="cell-text">کل فروش مکانیکی بنزین: ${results.totalMechanicalSalesFuel}</p></div>
              </div>
              <div class="row">
                <div class="cell"><p class="cell-text">کل فروش الکترونیکی بنزینطبق گزارش سامانه: ${results.electrofuelJV}</p></div>
              </div>
              <div class="row">
                <div class="cell"><p class="cell-text">مقدار سرک / کسری بنزین: ${results.shortageOrSurplusFuel} ${results.vaziatFuel}</p></div>
              </div>
              <div class="row">
                <div class="cell"><p class="cell-text">کسری غیر مجاز بنزین: ${results.illegalShortageFuel}</p></div>
              </div>
              <div class="row">
                <div class="cell"><p class="cell-text">مقدار مغایرت مکانیکی و الکترونیکی بنزین: ${results.HF}</p></div>
              </div>
            </div>
          </div>
          <p class="cell-text padding-tt">امضا: تاریخ گزارش:</p>
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
        <Text style={[styles.cellText, styles.paddingtb]}>جمع مخازن : {results.finalFuelQuantity}</Text>
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
      <Text style={[styles.cellText, styles.paddingtt]}>                امضا:                                   تاریخ گزارش:                                </Text>
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
  paddingtb:{
    paddingBottom: 10, 
  },
  paddingtt:{
    paddingTop: 10, 
  },
});

export default FuelResults;
