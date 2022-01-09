const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => (
    <Part name={part.name} exercises={part.exercises} key={part.name} />
  ));

const Total = ({ parts }) => {
  const number = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <b>total of {number} exercises</b>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
