import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Quiz } from "../types-d";

type State = {
    quizes: Quiz[];
};

type Actions = {
    setQuizes: (quizes: Quiz[]) => void;
    addQuize: (quiz: Quiz) => void;
    updateQuize: (quiz: Quiz) => void;
    updateQuizeByWinnerSolution: (quiz_id: number, winner_solution_id: number) => void;
};

export const useQuizesStore = create(
    persist<State & Actions>(
        (set) => ({
            quizes: [],
            setQuizes: (quizes: Quiz[]) => set(() => ({ quizes })),
            addQuize: (quiz: Quiz) => set((state) => ({ quizes: [...state.quizes, quiz] })),
            updateQuize: (quiz: Quiz) => set((state) => ({
                quizes: state.quizes.map((q) => (q.id === quiz.id ? quiz : q))
            })),
            updateQuizeByWinnerSolution: (quiz_id: number, winner_solution_id: number) => 
                set((state) => ({
                    quizes: state.quizes.map((q) => 
                        q.id === quiz_id ? { ...q, winner_solution: winner_solution_id } : q
                    ),
                })),
        }),
        {
            name: "quizes"
        }
    )
);
