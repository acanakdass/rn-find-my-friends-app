import axios from "axios";
import { AsyncStorage } from 'react-native';
import BaseUrl from "./BaseUrl";

export default class LocationService {
   baseUrl = BaseUrl + "/locations";

   getAll() {
      return axios.get(this.baseUrl + "/getAll");
   }

   setLocation(latitude, longitude, userId) {
      var locationObj = { latitude, longitude, userId }
      console.log('obj to send : ')
      console.log(locationObj)
      return axios.post(this.baseUrl + "/createOrUpdate", locationObj);
   }
}