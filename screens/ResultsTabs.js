import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GasolineResults from './GasolineResults';
import GasResults from './GasResults';

const Tab = createBottomTabNavigator();

const ResultsTabs = ({ route }) => {
  const { results } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen name="نتایج بنزین">
        {() => <GasolineResults results={results} />}
      </Tab.Screen>
      <Tab.Screen name="نتایج گاز">
        {() => <GasResults results={results} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ResultsTabs;
