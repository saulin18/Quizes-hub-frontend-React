import { useAuthStore } from "../store/auth";
import { authAxios, axi } from "./useAxios";


export const registerRequest = async (username: string, password: string) => {
    try {
         const response = await authAxios.post("/auth/register/", {username, password})
    return response.data;} catch (error) {
        console.log(error);
    }
  
    
};


export const loginRequest = async (username: string, password: string) => {
    try {
        const response = await axi.post('/auth/login/', { username, password });
        
        useAuthStore.getState().setToken(response.data.access, response.data.refresh);
        return response.data;
    } catch (error) {
        console.error("Error en loginRequest:", error);
        throw error; 
    }
};
