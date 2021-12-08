import axios from "axios";
import { AsyncStorage } from 'react-native';
import BaseUrl from "./BaseUrl";

export default class UserService {
   baseUrl = BaseUrl + "/users";

   getAll() {
      return axios.get(this.baseUrl + "/getAll");
   }
   getCurrentUser(token) {
      const config = {
         headers: {
            "Authorization": "Bearer " + token
         }
      };

      return axios.get(this.baseUrl + "/getCurrentUser", config);
   }
}