import {
  Dimensions,
  PixelRatio,
  StatusBar,
} from 'react-native';
export const fonts = {
  openSansLight3: 'OpenSans-Light',
  openSansRegular4: 'OpenSans-Regular',
  openSansMedium5: 'OpenSans-Medium',
  openSansSemi6: 'OpenSans-SemiBold',
  openSansBold7: 'OpenSans-Bold',
  openSansExtraBold9: 'OpenSans-ExtraBold',
};
export const strongRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
export const strongRegexEmail = /[^a-zA-Z0-9@.]/g;
export const strongRegexpass = /\s/g;
export const strongRegexName = /[^a-zA-Z ]/g;
export const strongRegexGST = /[^a-zA-Z0-9 ]/g;
export const strongRegexMobile = /[^0-9]/g;
export const strongRegexUsername = /[^a-zA-Z0-9]/g;
export const strongCombine =  /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\| ,.<>\/?~`]/g;

export const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight
  : 0;
export const topViewHeight = 70;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const getFontSize = (size: number) => {
  return size
};

