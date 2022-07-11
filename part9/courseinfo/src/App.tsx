import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseDescribedPart extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CourseDescribedPart {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}
interface CourseSubmissionPart extends CourseDescribedPart {
  type: 'submission';
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CourseDescribedPart {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const Header = ({ text }: { text: string }) => {
  return <h1>{text}</h1>;
};

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          {part.description}
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          group prjects {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          {part.description}
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          {part.description}
          <br />
          Requirements: {part.requirements.map((r) => `${r}, `)}
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.name} />
    ))}
  </>
);

const Total = ({ parts }: { parts: CoursePart[] }) => (
  <p>
    Number of exercises{' '}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header text={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
