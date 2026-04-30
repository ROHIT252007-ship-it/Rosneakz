import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import font from '../../style/font'
import { headingType } from '../types/headingType'
import { useAppTheme } from '../../../shared/hooks/theme'

const Heading = ({
  title,
   subtitle
}:headingType) => {
  const theme=useAppTheme()
  return (
    <View style={styles.container}>
      <Text style={[styles.maintext,{color:theme.darkText}]}>{title}</Text>
      <Text style={styles.secondtext}>{subtitle}</Text>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
     maintext: {
        fontFamily: font.airmedium,
        fontSize: 28,
        textAlign:'center'
    },
    secondtext: {
      textAlign:'center',
      marginTop:7,
        fontFamily: font.airblack,
        fontSize: 16,
        color: "#9d9d9d",
        lineHeight: 24,
    },
})