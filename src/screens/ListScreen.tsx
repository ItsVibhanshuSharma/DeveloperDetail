import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';
  import React  from 'react';
import { useScreenDimensions } from '../shared/theme/ScreenDimensionsContext';
  export default function ListScreen({navigation, routes}: any) {
    const {screenWidth} = useScreenDimensions();
   
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:'red'
      },
     
    });
    return (
      <View style={styles.container}>
     
      </View>
    );
  }
  