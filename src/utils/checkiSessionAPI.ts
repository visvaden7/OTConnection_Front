import axios from "axios";
import { User } from "../@types/user";
import { API_ENDPOINT } from "../const/constant.ts";

interface SessionCheckResponse {
  isLoggedIn: boolean;
  user: User;
}

const checkSessionAPI = async () => {
  try {
    const response = await axios.get<SessionCheckResponse>(`${API_ENDPOINT}/auth/session-check`, { withCredentials: true });
    // console.log(">>>>response", response.data.isLoggedIn);
    // console.log(">>>>>data", response.data.user);
    // setIsLoggedIn(response.data.isLoggedIn);
    return response.data.isLoggedIn ? response.data.user : null;
  } catch (error) {
    console.log("Session check failed", error);
  }
};

export default checkSessionAPI;