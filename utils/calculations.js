import moment from 'moment-jalaali';

export const performCalculations = (data) => {
  const {
    tanksFuel,
    tanksGas,
    receivedFuel,
    receivedGas,
    nozzlesFuel,
    nozzlesGas,
    fuelname,
    boosname,
    allfuel,
    allgaz,
    electrofuel,
    electrogaz,
    startDate,
    endDate,
    formattedDate,
    formattedTime,
  } = data;

  const formattedDateJV = formattedDate;

  const formattedTimeJV = formattedTime;



  const names = fuelname;
  const namesboos = boosname;
  const allfuels = allfuel;
  const allgazs = allgaz;

  const receivedFuelJV = receivedFuel;
  const receivedGazJV = receivedGas;
  const electrofuelJV = electrofuel;
  const electrogazJV = electrogaz;

  const startDateJS = moment(startDate, 'jYYYY/jMM/jDD').format('jYYYY/jMM/jDD');
  const endDateJS = moment(endDate, 'jYYYY/jMM/jDD').format('jYYYY/jMM/jDD');
 
  const mechanicalSalesPerNozzleFuel = nozzlesFuel.map(nozzle => nozzle.endPeriod - nozzle.startPeriod);
  const mechanicalSalesPerNozzleGas = nozzlesGas.map(nozzle => nozzle.endPeriod - nozzle.startPeriod);

  const MadkidYG = nozzlesGas.map(nozzle => nozzle.endPeriod );
  const MadkidXG = nozzlesGas.map(nozzle =>  nozzle.startPeriod);
  const MadkidZG = nozzlesGas.map(nozzle =>  nozzle.result);


  
  const MadkidYF = nozzlesFuel.map(nozzle => nozzle.endPeriod );
  const MadkidXF = nozzlesFuel.map(nozzle =>  nozzle.startPeriod);
  const MadkidZF = nozzlesFuel.map(nozzle =>  nozzle.result);
  const tanksGasG = tanksGas.map(tank => tank.endQuantity );
  const tanksFuelF = tanksFuel.map(tank => tank.endQuantity );



  const totalMechanicalSalesFuel = mechanicalSalesPerNozzleFuel.reduce((total, sale) => total + sale, 0);
  const totalMechanicalSalesGas = mechanicalSalesPerNozzleGas.reduce((total, sale) => total + sale, 0);

  const finalFuelQuantity = tanksFuel.reduce((total, tank) => total + parseFloat(tank.endQuantity), 0);
  const finalGasQuantity = tanksGas.reduce((total, tank) => total + parseFloat(tank.endQuantity), 0);

  const CF = receivedFuelJV + allfuels;
  const CG = receivedGazJV + allgazs;

  const DF = CF - finalFuelQuantity;
  const DG = CG - finalGasQuantity;

  const EF = totalMechanicalSalesFuel - DF;
  const EG = totalMechanicalSalesGas - DG;

  const HG = electrogazJV - totalMechanicalSalesGas ;

  const HF = electrofuelJV - totalMechanicalSalesFuel ;


  

  const vaziatGaz = EG > 0 ? "سرک" : "کسری";

  const vaziatFuel = EF > 0 ? "سرک" : "کسری";

  const girGaz = vaziatGaz === "کسری" ? (totalMechanicalSalesGas * 0.0045) / EG : null;

  const girFuel = vaziatFuel === "کسری" ? (totalMechanicalSalesFuel * 0.0045) / EF : null;

  const totalFuel = parseFloat(allfuel) + parseFloat(receivedFuel);
  const totalGas = parseFloat(allgaz) + parseFloat(receivedGas);

  const totalProductFuelOut = totalFuel - finalFuelQuantity;
  const totalProductGasOut = totalGas - finalGasQuantity;

  const afterSalesFuel = totalFuel - totalMechanicalSalesFuel;
  const afterSalesGas = totalGas - totalMechanicalSalesGas;

  const shortageOrSurplusFuel = finalFuelQuantity - afterSalesFuel;
  const shortageOrSurplusGas = finalGasQuantity - afterSalesGas;

  const allowableShortageFuel = totalMechanicalSalesFuel * 0.0045;
  const illegalShortageFuel = Math.abs(allowableShortageFuel - shortageOrSurplusFuel);

  const allowableShortageGas = totalMechanicalSalesGas * 0.0045;
  const illegalShortageGas = Math.abs(allowableShortageGas - shortageOrSurplusGas);

  return {
    formattedDateJV,
    formattedTimeJV,
    allfuels,
    MadkidYG,
    MadkidXG,
    MadkidZG,
    MadkidZF,
    MadkidYF,
    tanksGasG,
    tanksFuelF,
    MadkidXF,
    startDateJS,
    allgazs,
    girGaz,
    girFuel,
    HG,
    HF,
    CG,
    CF,
    DG,
    DF,
    EF,
    EG,
    endDateJS,
    names,
    electrofuelJV,
    electrogazJV,
    receivedGazJV,
    receivedFuelJV,
    namesboos,
    mechanicalSalesPerNozzleFuel,
    mechanicalSalesPerNozzleGas,
    totalMechanicalSalesFuel,
    totalMechanicalSalesGas,
    finalFuelQuantity,
    finalGasQuantity,
    totalFuel,
    totalGas,
    totalProductFuelOut,
    totalProductGasOut,
    afterSalesFuel,
    afterSalesGas,
    shortageOrSurplusFuel,
    shortageOrSurplusGas,
    allowableShortageFuel,
    illegalShortageFuel,
    allowableShortageGas,
    illegalShortageGas,
    vaziatGaz,
    vaziatFuel,
  };
};
