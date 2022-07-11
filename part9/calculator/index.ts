import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.json({ error: 'malformatted parameters' });
  }
  return res.json({
    height: height,
    weight: weight,
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);
  try {
    if (!(daily_exercises instanceof Array) || isNaN(target))
      throw new Error('Wrong type of the provided arguments!');
    const numbers = daily_exercises.map((n) => {
      if (!isNaN(Number(n))) return Number(n);
      throw new Error('Provided values of daily_exercises were not numbers!');
    });
    return res.json(calculateExercises(numbers, target));
  } catch (error) {
    return res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
