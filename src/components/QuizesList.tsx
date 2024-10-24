import { useQuizesStore } from '../store/quizes';
import { getQuizesRequest, updateQuizByWinnerRequest } from '../api/quizes';
import { getQuizSolutionsRequest, deleteSolutionRequest } from '../api/solutions'; 
import Loader from '../components/Loader';
import QuizItem from '../components/QuizItem';
import { Quiz, QuizSolution } from '../types-d'; 
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SolutionItem from './SolutionItem';
import { useSolutionsStore } from '../store/solutions';
import { useNavigate } from 'react-router-dom';

const QuizList: React.FC = () => {
  const { quizes, updateQuizeByWinnerSolution } = useQuizesStore();
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);                
  const [showSolutions, setShowSolutions] = useState(false);

  const { isLoading: isLoadingQuizzes, error: quizError, data: quizzesData } = useQuery<Quiz[], Error>({
    queryKey: ['quizes'],
    queryFn: getQuizesRequest,
  });
  
  const { solutions, deleteSolution } = useSolutionsStore();
  const navigate = useNavigate();

  const updateQuizByWinner = async (quiz_id: number, winner_solution_id: number) => {
    const updatedQuiz = await updateQuizByWinnerRequest(quiz_id, winner_solution_id);
    updateQuizeByWinnerSolution(updatedQuiz.id, winner_solution_id);
    navigate(0)
    
};


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
      navigate(0)
      
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

  if (solutionsError) {
    return <p>Error al cargar las soluciones: {solutionsError.message}</p>;
  }

  return (
    <>
      <div>
        {quizzesToMap.map((quiz: Quiz) => (
          <div key={quiz.id} onClick={() => setSelectedQuizId(quiz.id)}>
            <QuizItem quiz={quiz} />
           
            
            <button onClick={() => setShowSolutions(true)} className="text-red-500 mb-4">
             Ver soluciones
            </button>
            {selectedQuizId === quiz.id && isLoadingSolutions && <Loader />}
            {selectedQuizId === quiz.id && solutionsError && <p>Error al cargar las soluciones</p>}
            {selectedQuizId === quiz.id && showSolutions && solutionsToMap && (
              <div>
                 
                {solutionsToMap.map(solution => (
                  <div key={solution.id}>
                    <SolutionItem solution={solution} />
                    { quiz.winner_solution === solution.id && <p className='text-primary-800'>Esta es la solución ganadora: {solution.content}</p>}
                    <button onClick={() => handleDelete(solution)} className="text-primary-500 mx-4 my-5 bg-slate-600 border-none rounded-lg px-4">
                      Eliminar Solución
                    </button>
                    <button onClick={() => updateQuizByWinner(quiz.id, solution.id)} className="text-primary-500 mx-4 my-5 bg-slate-600 border-none rounded-lg px-4">
                      Elige una solución ganadora
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