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

// get generated code
export const generateCodeAPI = async (reqBody) => {
    return await commonAPI("POST",`${baseUrl}/generate-code`,reqBody,{})
}

// get replay frames
export const getReplayFramesAPI = async (roomId) => {
    return await commonAPI("GET",`${baseUrl}/replay/${roomId}`,"",{})
}

// delete room 
export const deleteRoomAPI=async(roomId)=>{
    return await commonAPI("DELETE",`${baseUrl}/delete-room/${roomId}`,"",{})
}