import axios from "axios";
import { AsyncStorage } from 'react-native';
import BaseUrl from "./BaseUrl";

export default class UserService {
   baseUrl = BaseUrl + "/users";

   getAll() {
      return axios.get(this.baseUrl + "/getAll");
   }

   getAllWithLocations() {
      return axios.get(this.baseUrl + "/getAllUsersWithLocations");
   }

   searchByUsernameOrEmail(usernameOrEmail) {
      return axios.get(this.baseUrl + "/searchByUsernameOrEmail?username=" + usernameOrEmail);
   }

   uploadImage(formData) {
      const config = {
         headers: {
            "content-type": "multipart/form-data"
         }
      };
      console.log('dataaa: ')
      console.log(formData)
      return axios.post(this.baseUrl + "/uploadImage", formData);
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