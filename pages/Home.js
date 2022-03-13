import React,{useState,useEffect} from 'react'
import {StyleSheet,Text,View,SafeAreaView,Image,TouchableOpacity } from 'react-native';
import Header from '../components/Header'
import {getData,getList} from '../api/api.js'
import window from '../assets/window.gif'

const Home = (props) => {
  const {navigation,rerender,setRerender,currentCity} = props
  const [data,setData] = useState([])
  const statusConnect = data.length !== 0

  useEffect(() => {
    getData(setData)
    getList()
  },[])

    useEffect(() => {
        if(currentCity.length !== 0){
            getData(setData,currentCity.lat,currentCity.lon)
        }
    },[rerender])
  //  console.log(data)
    return(
     <SafeAreaView>
        <Header/>
         <View style={styles.container_main}>
            <View style={{
            justifyContent: 'center',
            display:'flex',
            alignItems:'center'}}>
               <Image style={{position:'absolute'}} source={window}/>
               <Text style={styles.textName}>{data ? data.name: 'No selected name'}</Text>
               <Text style={styles.celciumContainer}>{statusConnect? (data.main.temp-273.15).toFixed() : null}°C</Text>
            </View>
         </View>

         <View>
            <Text style={styles.additionalContainer}>
                lat: {statusConnect? data.coord.lat: 'no info '} lon: {statusConnect? data.coord.lon: 'no info '}
            </Text>

             <Text style={styles.text}>
             {statusConnect? data.weather[0].main : null}</Text>

             <View style={{padding:15,margin: 15,backgroundColor: '#e5f4f0',borderRadius: 15}}>
             <Text style={{fontSize: 17,fontWeight:'bold'}}>Дополнительные параметры:</Text>
             <Text>Скорость ветра: {statusConnect? data.wind.speed :null} m/s</Text>
             <Text>Видимость: {statusConnect? data.visibility / 1000 :null}km</Text>
             <Text>Влажность: {statusConnect? data.main.humidity : null}%</Text>
             <Text>По чувству:{statusConnect? (data.main.feels_like-273.15).toFixed(2) : null}°C</Text>
             <Text>Давление {statusConnect? data.main.pressure: null }hPa</Text>
             </View>

            <TouchableOpacity onPress={() => navigation.navigate('List')}>
                <Text style={styles.button}>Сменить точку</Text>
            </TouchableOpacity>

         </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  textName:{
    color:'white',
    fontSize:40,
    fontWeight:'bold',
    marginBottom: 30,
    textTransform: "uppercase"
  },
  container_main:{
    justifyContent: 'center',
    display:'flex',
    alignItems:'center',
  },
   backgroundImage:{
       flex: 1,
       width: '100%',
       height:100,
   },
   celciumContainer:{
        padding: 10,
        fontSize:50,
        fontWeight:'bold',
        backgroundColor: 'white',
        borderRadius: 10
   },
   additionalContainer:{
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        marginTop: 100,
        color: 'white',
        fontSize: 15,
        marginBottom: 50
   },
   text:{
       display:'flex',
       textAlign:'center',
       fontSize:20,
       marginBottom:10,
       color: 'black',
       justifyContent:'center'
   },
   button:{
     justifyContent: 'center',
     textAlign:'center',
     marginTop: 40,
     padding: 15,
     fontSize: 15,
     color: 'white',
     fontWeight: 'bold',
     marginRight:100,
     marginLeft:100,
     backgroundColor: 'blue',
     borderRadius: 10
   }
});

export default Home