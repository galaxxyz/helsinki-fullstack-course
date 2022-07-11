interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const height_m = height / 100;
  const BMI = weight / (height_m * height_m);
  if (BMI < 16) {
    return 'Underweight (Severe thinness)';
  } else if (BMI < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (BMI < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (BMI < 25) {
    return 'Normal (healthy weight)';
  } else if (BMI < 30) {
    return 'Overweight (Pre-obese)';
  } else if (BMI < 35) {
    return 'Obese (Class I)';
  } else if (BMI < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
