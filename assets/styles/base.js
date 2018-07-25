import {StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
export const colors  = {
  yellow: '#FBE8A6',
  orange: '#F4976C',
  altOrange: '#F6B26C',
  deepBlue: '#303C6C',
  grey: '#B4DFE5', 
  altGrey:'#71B2BF',
  lightBlue: '#D2FDFF' 
}

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'cabin'
}

const baseStyles = {
  pageContainer: {
    flex: 1,
    paddingHorizontal: padding.md
  },
  centeredView:{

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