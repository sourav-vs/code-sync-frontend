import { baseUrl } from "./BaseURL";
import commonAPI from "./commonAPI";


// register api
export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${baseUrl}/register`,reqBody,{})
}

// login api
export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${baseUrl}/login`,reqBody,{})
}

// Save room code
export const saveRoomCodeAPI = async (reqBody) => {
  return await commonAPI("POST",`${baseUrl}/room/save`,reqBody,{})
}

// Get Room Code
export const getRoomCodeAPI = async (roomId) => {
  return await commonAPI("GET",`${baseUrl}/room/${roomId}`,"",{})
}