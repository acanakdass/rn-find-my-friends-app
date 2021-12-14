import axios from "axios";
import { AsyncStorage } from 'react-native';
import BaseUrl from "./BaseUrl";

export default class FriendsService {
   baseUrl = BaseUrl + "/friends";

   getAll() {
      return axios.get(this.baseUrl + "/getAll");
   }
   getAllFriendsByUserId(userId) {
      return axios.get(this.baseUrl + "/getAllFriends?userId=" + userId);
   }
   getAllFriendRequestsByUserId(userId) {
      return axios.get(this.baseUrl + "/getAllFriendRequests?userId=" + userId);
   }
   acceptFriendRequest(senderId, receiverId) {
      return axios.post(this.baseUrl + "/acceptFriendRequest", { "senderId": senderId, "receiverId": receiverId });
   }
   // getCurrentUser(token) {
   //    const config = {
   //       headers: {
   //          "Authorization": "Bearer " + token
   //       }
   //    };

   //    return axios.get(this.baseUrl + "/getCurrentUser", config);
   // }
}