import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createSolutionRequest } from '../api/solutions';
import { toast } from 'sonner';
import { useSolutionsStore } from '../store/solutions';
import { useQuizesStore } from '../store/quizes';

const CreateSolution = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setSolutions } = useSolutionsStore(); 
  const { quizes } = useQuizesStore();

  const createSolutionMutation = useMutation({
    mutationFn: (content: string) => createSolutionRequest(Number(id), content),
    onSuccess: (response) => {
      console.log(response, response.data)
      setSolutions(response.data);
      toast.success("Solución creada con éxito!");
      navigate("/quizes/");
    },
    onError: () => {
      toast.error("Hubo un error, intenta de nuevo");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content') as string;
    createSolutionMutation.mutate(content);
    addSolutionToAQuiz({ content, id: Number(id) });

  };

  const addSolutionToAQuiz = ({ content, id }: { content: string; id: number }) => {
    const solution  = { content, id, quiz_id: Number(id) };
    const quiz = quizes.find(quiz => quiz.id === Number(id));
    if (quiz) {
      quiz.solutions.push(solution);

    }
  };

  return (
    <div>
      <h3 className="text-center text-3xl font-bold">Create Solution</h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center justify-center'>
        <label className='text-primary-800' htmlFor="content">Content</label>
        <textarea id="content" name="content" required></textarea>
        <button type="submit">Create Solution</button>
      </form>
    </div>
  );
};

export default CreateSolution;
