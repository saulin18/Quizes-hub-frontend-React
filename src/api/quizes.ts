
import { QueryFunction } from "@tanstack/react-query";
import { Quiz } from "../types-d";
import { authAxios, axi } from "./useAxios";

export const getQuizesRequest: QueryFunction<Quiz[]> = async () => {
  const response = await axi.get('/quizes/');
  return response.data;
};
    
export const createQuizeRequest = async (quiz: { title: string; description: string }): Promise<Quiz> => {
    const response = await authAxios.post("/quizes/create/", quiz);
    return response.data; 
  };
  
  export const updateQuizByWinnerRequest = async (quiz_id: number, winner_solution_id: number): Promise<Quiz> => {
    const response = await authAxios.put(`/quizes/update/${quiz_id}/`, { solution_id: winner_solution_id }); 
    return response.data; 
};
