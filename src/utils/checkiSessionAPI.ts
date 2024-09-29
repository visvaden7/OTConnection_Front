import axios from "axios";
import { API_ENDPOINT } from "../const/constant.ts";
import {ResponseSessionCheckResponse} from "../@types/api.ts";



const checkSessionAPI = async () => {
  try {
    const response = await axios.get<ResponseSessionCheckResponse>(`${API_ENDPOINT}/auth/session-check`, { withCredentials: true });
    // console.log(">>>>response", response.data.isLoggedIn);
    // console.log(">>>>>data", response.data.user);
    return response.data.isLoggedIn ? response.data.user : null;
  } catch (error) {
    console.log("Session check failed", error);
  }
};



export default checkSessionAPI;

