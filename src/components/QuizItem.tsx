import { Card, CardContent, Typography } from '@mui/material';
import { Quiz } from '../types-d';
import { Link } from 'react-router-dom';

interface QuizItemProps {
  quiz: Quiz;
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  const winningSolution = quiz.solutions.find(solution => solution.id === quiz.winner_solution);

  return (
    <Card sx={{ marginBottom: 2, paddingBottom: 2, boxShadow: 4, maxHeight: 550, width: 350, justifyContent: 'center' }}>
      <CardContent  className="max-w-[35rem]">
        <Typography variant="h5" component="div" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <b>{quiz.description}</b>
        </Typography>

        {winningSolution && (
          <Typography variant="body2" color="text.secondary" gutterBottom paddingBottom={4}>
            Solución Ganadora: <br/> <b>{winningSolution.content}</b>
          </Typography>
        )}
      </CardContent>

      
      
      <Link to={`/quizes/solutions/${quiz.id}`} className="text-center text-xl ml-2 font-bold text-primary-800">
        Create Solution
      </Link>
    </Card>
  );
};

export default QuizItem;

