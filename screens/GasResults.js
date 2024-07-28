import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import moment from 'moment-jalaali';

const GasResults = ({ results }) => {
  const [currentTime, setCurrentTime] = useState('');

  const handleButtonClick = () => {
    const now = moment();
    const formattedTime = now.format('HH:mm:ss');
    const formattedDate = now.format('jYYYY/jMM/jDD');
    setCurrentTime(`تاریخ: ${formattedDate} - ساعت: ${formattedTime}`);
  };

  const generatePDF = async () => {
    const nozzlesHtml = results.MadkidXG.map((_, index) => `
      <p>نازل ${index + 1}:</p>
      <p>شروع دوره: ${results.MadkidXG[index]}</p>
      <p>پایان دوره: ${results.MadkidYG[index]}</p>
    `).join('');

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              padding: 20px;
            }
            .container {
              flex-grow: 1;
              padding: 20px;
              background-color: #fff;
            }
            .header {
              background-color: #ffc107;
              padding: 10px;
              margin-bottom: 10px;
              writing-direction: rtl;

            }
            .header-text {
              writing-direction: rtl;

              color: #000;
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
              color: #ffc107;
              text-align: center;
            }
            .button {
              background-color: #ffc107;
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header" style="dir:rtl;">
              <p class="header-text">نام جایگاه: ${results.names}</p>
              <p class="header-text">کنترل کننده: ${results.namesboos}</p>
              <p class="header-text">دوره کنترل: از ${results.startDateJS} تا ${results.endDateJS}</p>
              <p class="header-text">تاریخ بازدید: ${results.formattedDateJV}</p>
              <p class="header-text">ساعت: ${results.formattedTimeJV}</p>
            </div>
            <div class="table">
              <p class="section-header">گزارش عملیات گاز</p>
              <p class="cell-text">ابتدای دوره: ${results.allgazs}</p>
              <p class="cell-text">رسید: ${results.receivedGazJV}</p>
              ${results.tanksGasG && results.tanksGasG.length > 0 ? results.tanksGasG.map((_, index) => `
                <div class="row">
                  <p class="cell-text">مخزن ${index + 1}: ${results.tanksGasG[index]}</p>
                </div>
              `).join('') : ''}
              <p class="cell-text">جمع مخازن: ${results.finalGasQuantity}</p>
              <div class="row">
                <div class="cell"><p class="cell-text">فروش</p></div>
                <div class="cell"><p class="cell-text">انتها دوره</p></div>
                <div class="cell"><p class="cell-text">ابتدا دوره</p></div>
                <div class="cell"><p class="cell-text">نازل</p></div>
              </div>
              ${results.MadkidXG && results.MadkidXG.length > 0 ? results.MadkidXG.map((_, index) => `
                <div class="row">
                  <p class="cell">${results.MadkidZG[index]}</p>
                  <div class="cell"><p class="cell-text">${results.MadkidYG[index]}</p></div>
                  <div class="cell"><p class="cell-text">${results.MadkidXG[index]}</p></div>
                  <div class="cell"><p class="cell-text">${index + 1}</p></div>
                </div>
              `).join('') : ''}
              <div class="totals">
                <div class="row">
                  <div class="cell"><p class="cell-text">کل فروش مکانیکی گاز: ${results.totalMechanicalSalesGas}</p></div>
                </div>
                <div class="row">
                  <div class="cell"><p class="cell-text">کل فروش الکترونیکی گاز طبق گزارش سامانه: ${results.electrogazJV}</p></div>
                </div>
                <div class="row">
                  <div class="cell"><p class="cell-text">مقدار سرک / کسری گاز: ${results.shortageOrSurplusGas} ${results.vaziatGaz}</p></div>
                </div>
                <div class="row">
                  <div class="cell"><p class="cell-text">مقدار مغایرت مکانیکی و الکترونیکی گاز: ${results.HG}</p></div>
                </div>
              </div>
            </div>
            <p class="cell-text">امضا: تاریخ گزارش:</p>
          </div>
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
        <Text style={styles.sectionHeader}>گزارش عملیات گاز</Text>
        <Text style={styles.cellText}>ابتدای دوره : {results.allgazs}</Text>
        <Text style={styles.cellText}>رسید : {results.receivedGazJV}</Text>
        {results.tanksGasG && results.tanksGasG.length > 0 && results.tanksGasG.map((_, index) => (
          <View key={`tanksGasG-${index}`} style={[styles.row, styles.rowReverse]}>
            <Text style={styles.cellText}>مخزن {index + 1}:</Text>
            <Text style={styles.cellText}>{results.tanksGasG[index]}</Text>
          </View>
        ))}
        <Text style={[styles.cellText, styles.paddintb]}>جمع مخازن : {results.finalGasQuantity}</Text>

        <View style={styles.row}>
          <View style={styles.cell}><Text style={styles.cellText}>فروش</Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>انتها دوره </Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>ابتدا دوره </Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>نازل </Text></View>
        </View>
        {results.MadkidXG && results.MadkidXG.length > 0 && results.MadkidXG.map((_, index) => (
          <View key={`MadkidXG-${index}`} style={styles.row}>
            <Text style={styles.cell}>{results.MadkidZG[index]}</Text>
            <View style={styles.cell}><Text style={styles.cellText}>{results.MadkidYG[index]}</Text></View>
            <View style={styles.cell}><Text style={styles.cellText}>{results.MadkidXG[index]}</Text></View>
            <View style={styles.cell}><Text style={styles.cellText}>{index + 1}</Text></View>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش مکانیکی گاز: {results.totalMechanicalSalesGas}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش الکترونیکی گاز طبق گزارش سامانه: {results.electrogazJV}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار سرک / کسری گاز: {results.shortageOrSurplusGas} {results.vaziatGaz}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار مغایرت مکانیکی و الکترونیکی گاز: {results.HG}</Text></View>
          </View>
        </View>
      </View>
      <Text style={[styles.cellText, styles.paddintt]}>امضا: تاریخ گزارش:</Text>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={generatePDF}>
          <Text style={styles.buttonText}>ساخت PDF</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    padding: 20,
    color: '#000',
  },
  header: {
    backgroundColor: '#ffc107',
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  paddintt: {
    paddingTop: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffc107',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffc107',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
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
  paddintb: {
    paddingBottom: 10,
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
});

export default GasResults;
