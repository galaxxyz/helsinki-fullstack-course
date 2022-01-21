interface ExercisesAnalytics {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface parsingResult {
  target: number;
  days: Array<number>;
}

const parseExercisesArguments = (args: Array<string>): parsingResult => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numbers = args.slice(2).map((n) => {
    if (!isNaN(Number(n))) return Number(n);
    throw new Error('Provided values were not numbers!');
  });

  return {
    target: numbers[0],
    days: numbers.slice(1),
  };
};

const calculateExercises = (
  days: Array<number>,
  target: number
): ExercisesAnalytics => {
  const periodLength = days.length;
  const trainingDays = days.filter((day) => day !== 0).length;
  const average = days.reduce((sum, day) => sum + day, 0) / days.length;
  const success = average >= target;
  const rating =
    trainingDays / periodLength < 0.6
      ? 3
      : trainingDays / periodLength < 0.8
      ? 2
      : 1;

  const ratingDescription =
    rating === 1
      ? 'good job !'
      : rating === 2
      ? 'not too bad but could be better'
      : 'your activity is low';

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { target, days } = parseExercisesArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
