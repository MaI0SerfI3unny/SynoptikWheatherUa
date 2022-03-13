import React,{useState,useEffect} from 'react'
import Svg, { Path } from "react-native-svg"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native'
import Home from './pages/Home'
import List from './pages/List'
import * as Location from 'expo-location';

const Stack = createStackNavigator()

export default function App() {
  const [currentCity,setCurrentCity] = useState([])
  const [location, setLocation] = useState(null);
  const [rerender,setRerender] = useState(false)

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let location = await Location.getCurrentPositionAsync({});
        setCurrentCity({
        lat:location.coords.latitude, lon:location.coords.longitude});
        setRerender(!rerender)
      })();
    }, []);
 // console.log(location)

  return (
  <NavigationContainer>
      <Stack.Navigator
       screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home">
            {props => <Home {...props}
               currentCity={currentCity}
               setRerender={setRerender}
               rerender={rerender}
            />}
        </Stack.Screen>
        <Stack.Screen name="List">
            {props => <List {...props}
            setRerender={setRerender}
            rerender={rerender}
            setCurrentCity={setCurrentCity}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

LogBox.ignoreLogs(['Remote debugger']);