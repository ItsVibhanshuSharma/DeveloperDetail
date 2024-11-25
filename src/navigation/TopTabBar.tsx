import React, {useEffect} from 'react';
import {View, Pressable, StyleSheet, Text, BackHandler} from 'react-native';
import {fonts, getFontSize} from '../shared/theme/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useScreenDimensions} from '../shared/theme/ScreenDimensionsContext';

const TopTabBar = ({
  state,
  descriptors,
  navigation,
  name,
  isSelectedName,
}: any) => {
  const {screenWidth} = useScreenDimensions();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      width: screenWidth - 32,
      height: 64,
      backgroundColor: 'blue',
      position: 'absolute',
      bottom: insets.bottom ? insets.bottom : 20,
      alignSelf: 'center',
      borderRadius: 10,
    },
    mainItemContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      borderBottomWidth: 1,
      backgroundColor: 'white',
    },
    titleStyle: {
      color: 'white',
      alignItems: 'center',
      textAlign: 'center',
      width: screenWidth - 32,
      marginStart: 0,
    },
  });

  return (
    <View
      style={{
        marginTop:100
      }}>
     
      <View style={{flexDirection: 'row', width: screenWidth}}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
      
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          return (
            <View key={index} style={[styles.mainItemContainer]}>
              <Pressable
                onPress={() => onPress()}
                style={{
                  height: 45,
                  justifyContent: 'center',
                  width: (screenWidth - 32) / 4,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: getFontSize(15),
                    fontFamily: fonts.openSansMedium5,
                    color: 'blue',
                  }}>
                  {route.name}
                </Text>
                <View
                  style={{
                    borderRadius: 8,
                    width: '100%',
                    backgroundColor: 'blue',
                    height: isFocused ? 3 : 0,
                    position: 'absolute',
                    bottom: 0,
                  }}></View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default TopTabBar;
