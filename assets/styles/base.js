import {StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
export const colors  = {
  black: '#1E1E24',
  blue: '#424D79',
  blueMedium: "#7B82A1", 
  blueLight:"#AEB3C6",

  yellow: '#FFCF99',
  yellowMedium: "#F5DDC3",
  yellowLight:'#F2E9E4',
  
  grey: '#9A8C98', 
  altGrey:'#C9ADA7',
  
  orange: '#FFBFA0',
  altOrange: '#F6B26C',
  lightBlue: '#D2FDFF', 
  red: '#AF1B3F' 
}

export const padding = {
  xs: 8,
  sm: 12,
  md: 24,
  lg: 36,
  xl: 48
}

export const fonts = {

  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
  primary: 'cabin'
}

const baseStyles = {
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: padding.md
  },
  centeredView:{
    flex:1, 
    flexDirection:'column',
    justifyContent:'center'
  },
  mdPaddingView:{
    paddingHorizontal:15, paddingVertical:15
  },
  lgPaddingView:{
    paddingHorizontal:30, paddingVertical:30
  }
}

export default function createStyles(overrides = {}) {
  return StyleSheet.create({...baseStyles, ...overrides})
}