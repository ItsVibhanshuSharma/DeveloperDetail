import React, {  useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface ScreenDimensionsProviderProps {
  children: React.ReactNode;
}

const ScreenDimensionsContext = React.createContext({
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height
});
export function useScreenDimensions() {
  const {screenWidth,screenHeight} = useContext(ScreenDimensionsContext);

  if (screenWidth === undefined) {
    throw new Error('useScreenDimensions must be used within a ScreenDimensionsProvider');
  }
  if (screenHeight === undefined) {
    throw new Error('useScreenDimensions must be used within a ScreenDimensionsProvider');
  }
  return  {screenWidth,screenHeight} ;
}

export function ScreenDimensionsProvider({ children }: ScreenDimensionsProviderProps) {
  const [screenWidth, setScreenWidth] = useState<number>(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState<number>(Dimensions.get('window').height);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);

    };

    const dimensionsSubscription = Dimensions.addEventListener('change', updateDimensions);

    return () => {
        dimensionsSubscription.remove();
    };
  }, []);
  const values={screenWidth,screenHeight}
  return (
    <ScreenDimensionsContext.Provider value={values}>
      {children}
    </ScreenDimensionsContext.Provider>
  );
}
