import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import {StyleSheet,Text,View,SafeAreaView,TouchableOpacity,FlatList,TextInput } from 'react-native';
import {storage} from '../storage/storage.js'
import data from '../ua.json'


const List = (props) => {
    const {navigation,setCurrentCity,setRerender,rerender} = props
    const [value, onChangeText] = useState('')
    const change = (value,setCurrentCity) => {
        setCurrentCity({
        lat: value.lat, lon: value.lng})
        navigation.navigate('Home')
        setRerender(!rerender)
    }


    return(
      <SafeAreaView>
        <Header/>
        <Text style={styles.titles}>Список точек</Text>
         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
             <Text style={styles.button}>Back</Text>
         </TouchableOpacity>
         <TextInput
         style={styles.inputs}
         placeholder="Search by name of city ..."
         value={value}
         onChangeText={text => onChangeText(text)}/>
            <FlatList
                data={value.length === 0 ? data : data.filter(el => el.city.toLowerCase().includes(value.toLowerCase()))}
                renderItem={({item}) =>
                <TouchableOpacity onPress={() => change(item,setCurrentCity)}>
                    <View style={{padding: 10}}>
                       <Text style={{fontSize: 18,textTransform: 'uppercase'}}>{item.city}</Text>
                    </View>
                </TouchableOpacity>
                }/>

      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   button:{
     marginTop: 20,
     padding: 10,
     fontSize: 15,
     color: 'white',
     width: 150,
     marginLeft: 10,
     marginBottom: 20,
     textAlign: 'center',
     fontWeight: 'bold',
     backgroundColor: 'blue',
     borderRadius: 10
   },
   titles: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10
   },
   inputs:{
    margin:10,
    padding:10,
    borderWidth: 1
   }
});

export default List