import APIKit from "./APIKit";
import { API_END_POINTS } from "../utils/const/API";

class APIService {

    login          = (payload) => {
        
        return APIKit.post(API_END_POINTS.userlogin, payload);
    };

    userRegister   = (payload) => {
        
        return APIKit.post(API_END_POINTS.userRegister, payload);
    };

    facebooklogin = (payload) => {
        return APIKit.post(API_END_POINTS.userFacebookLogin, payload);
    }
}

export default APIService;