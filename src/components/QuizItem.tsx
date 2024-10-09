import { Card, CardContent, Typography } from '@mui/material';
import { Quiz } from '../types-d';
import { Link } from 'react-router-dom';

interface QuizItemProps {
  quiz: Quiz;
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  const winningSolution = quiz.solutions.find(solution => solution.id === quiz.winner_solution);

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {quiz.description}
        </Typography>

        {winningSolution && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Solución Ganadora: {winningSolution.content}
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

