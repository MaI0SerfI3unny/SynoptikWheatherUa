import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/';
const cityUrl = 'http://localhost:5021/'
const api = "a4d289690a3ddcf1915af745cd680dad"

export  const getData = (setData,lan,lon) => {
        axios.get(`${baseUrl}data/2.5/weather?lat=${lan !== undefined? lan :0}&lon=${lon !== undefined? lon : 0}&appid=${api}`)
           .then((response) => {
               if(response.status === 200){
                  // console.log(response.data);
                   setData(response.data)
               }
           }).catch((err) => {console.log(err)})
         }

export const getList = () => {
         axios.get(`${baseUrl}data/2.5/forecast/daily?lat=48.621025&lon=22.288229&cnt=10&appid=${api}`)
            .then((response) => {
                if(response.status === 200){
                       console.log(response);
                      // setData(response.data)
                }
            }).catch((err) => {console.log(err)})
         }
