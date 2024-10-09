
import { QueryFunction } from "@tanstack/react-query";
import { authAxios, axi } from "./useAxios";
import { QuizSolution } from "../types-d";
import { QueryFunctionContext } from '@tanstack/react-query';

export const getQuizSolutionsRequest: QueryFunction<QuizSolution[]> = async ({ queryKey }: QueryFunctionContext) => {
  const quizId = queryKey[1] as string; 
  const response = await axi.get(`/get-solutions/${quizId}`);
  return response.data;
};


export const createSolutionRequest = async (quiz_id: number, content: string) => {
  const response = await authAxios.post(`/quizes/solutions/${quiz_id}`, { content });
  return response.data;
};

export const deleteSolutionRequest = async (solution_id: number): Promise<QuizSolution> => {
  const response = await authAxios.delete(`/quizes/solutions/delete/${solution_id}`);
  return response.data; 
};

