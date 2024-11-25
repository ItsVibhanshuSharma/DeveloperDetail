import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NavigationService from '../utils/NavigationService';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import TopTabBar from './TopTabBar';
import {ConstantText} from '../shared/constant';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  const style: {} = {
    headerShown: false,
    animation: 'slide_from_right',
  };

  const CommanStack = () => {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={style}
        />
         <Stack.Screen
          name="listScreen"
          component={ListScreen}
          options={style}
        />
      </Stack.Navigator>
    );
  };


  return (
    <NavigationContainer
      ref={navigator => {
        NavigationService.setTopLevelNavigator(navigator);
      }}>
      <CommanStack />
    </NavigationContainer>
  );
}
