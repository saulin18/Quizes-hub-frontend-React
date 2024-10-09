import { useNavigate, useParams } from 'react-router-dom';
import { useSolutionsStore } from '../store/solutions';
import { useMutation } from '@tanstack/react-query';
import { deleteSolutionRequest } from '../api/solutions';
import { toast } from 'sonner';
import { useState } from 'react';
import Loader from '../components/Loader';

function DeleteSolution() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 
    const { solutions, deleteSolution } = useSolutionsStore();
    const [isLoading, setIsLoading] = useState(false);


    const deleteSolutionMutation = useMutation({
        mutationFn: (solution_id: number) => deleteSolutionRequest(solution_id),
        onSuccess: (response) => {
            deleteSolution(response)
            toast.success("Solución eliminada con éxito!");
            navigate("/quizes/");
        },
        onError: (error) => {
            toast.error("Error al eliminar la solución.");
            setIsLoading(false);
            console.log(error);
        }
    });

    const handleDelete = () => {
        if (id) {
            setIsLoading(true);
            deleteSolutionMutation.mutate(Number(id)); 
        }
    };

    if (isLoading) {
        return <Loader />;
    }


    return (
        <div>
            <h3 className="text-center text-3xl font-bold">Delete Solution</h3>
            <button 
                onClick={handleDelete} 
                disabled={isLoading} 
                className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
            >
                Eliminar {solutions.find(solution => solution.id === Number(id))?.content}
            </button>
        </div>
    );
}

export default DeleteSolution;
