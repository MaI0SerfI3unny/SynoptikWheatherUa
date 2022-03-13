import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from '../assets/logo.png'

const Header = () => {
    return(
            <View style={styles.container}>
              <Image
                style={{width: 80,height: 50}}
                source={logo}
              />
            </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 20,
  }
});

export default Header