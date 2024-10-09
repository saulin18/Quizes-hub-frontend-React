import { useQuizesStore } from '../store/quizes';
import { getQuizesRequest } from '../api/quizes';
import { getQuizSolutionsRequest, deleteSolutionRequest } from '../api/solutions'; 
import Loader from '../components/Loader';
import QuizItem from '../components/QuizItem';
import { Quiz, QuizSolution } from '../types-d'; 
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SolutionItem from './SolutionItem';
import { useSolutionsStore } from '../store/solutions';

const QuizList: React.FC = () => {
  const { quizes } = useQuizesStore();
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const { solutions, deleteSolution } = useSolutionsStore();
  
  const { isLoading: isLoadingQuizzes, error: quizError, data: quizzesData } = useQuery<Quiz[], Error>({
    queryKey: ['quizes'],
    queryFn: getQuizesRequest,
  });

  const { isLoading: isLoadingSolutions, error: solutionsError, data: solutionsData } = useQuery<QuizSolution[], Error>({
    queryKey: ['get-solutions', selectedQuizId],
    queryFn: getQuizSolutionsRequest,
    enabled: !!selectedQuizId,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSolutionRequest,
    onSuccess: (data: QuizSolution) => {
      deleteSolution(data); 
      console.log(data)
    },
  });

  if (isLoadingQuizzes) {
    return <Loader />;
  }

  if (quizError) {
    return <p>Error al cargar los quizzes: {quizError.message}</p>;
  }

  const quizzesToMap = quizzesData as Quiz[] || quizes;
  const solutionsToMap = solutionsData as QuizSolution[] || solutions;

  const handleDelete = (solution: QuizSolution) => {
    deleteMutation.mutate(solution.id); 
    console.log(solution)
  };

  return (
    <>
      <div>
        {quizzesToMap.map((quiz: Quiz) => (
          <div key={quiz.id} onClick={() => setSelectedQuizId(quiz.id)}>
            <QuizItem quiz={quiz} />
            <p>Haz click para ver las soluciones del quiz que seleccionaste</p>
            {selectedQuizId === quiz.id && isLoadingSolutions && <Loader />}
            {selectedQuizId === quiz.id && solutionsError && <p>Error al cargar las soluciones: {solutionsError.message}</p>}
            {selectedQuizId === quiz.id && solutionsData && (
              <div>
                {solutionsToMap.map(solution => (
                  <div key={solution.id}>
                    <SolutionItem solution={solution} />
                    <button onClick={() => handleDelete(solution)} className="text-red-500">
                      Eliminar Solución
                    </button>
                  </div>
                ))}
                
              </div>
            )}
          </div>
        ))}
      </div>
      <Link to="/quizes/create" className="text-center text-xl font-bold text-primary-800">
        Create Quiz
      </Link>
    </>
  );
};

export default QuizList;
