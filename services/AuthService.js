import axios from "axios";
import { AsyncStorage } from 'react-native';
import BaseUrl from "./BaseUrl";

export default class AuthService {
   baseUrl = BaseUrl + "/auth";

   getAll() {
      return axios.get(this.baseUrl + "/getAll");
   }

   login(username, password) {
      // console.log(username, password)
      // console.log(BaseUrl)
      return axios.post(this.baseUrl + "/login", { "email": username, "password": password });
   }

   register(email, password, firstName, lastName) {
      return axios.post(this.baseUrl + "/register", { "email": email, "password": password, "firstName": firstName, "lastName": lastName });
   }

   setBearerToken(token) {
      AsyncStorage.setItem("token", token);
   }

   getCurrentUserByDetailsByToken(token) {
      const config = {
         headers: {
            "content-type": "multipart/form-data"
         }
      };

      return axios.post(this.baseUrl + "/upload", formData, config);

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