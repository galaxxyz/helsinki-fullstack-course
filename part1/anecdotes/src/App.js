import React, { useState } from "react";

const Header = ({ text }) => <h2>{text}</h2>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ text, votes }) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomNewNumber = (max, current) => {
    let random = current;
    do {
      random = getRandomNumber(max);
    } while (random === current);
    return random;
  };

  const getUpdatedVotes = (votes, selected) => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    return updatedVotes;
  };

  const [selected, setSelected] = useState(getRandomNumber(anecdotes.length));
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const mostPopular = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button
        text="vote"
        onClick={() => setVotes(getUpdatedVotes(votes, selected))}
      />
      <Button
        text="next anecdote"
        onClick={() =>
          setSelected(getRandomNewNumber(anecdotes.length, selected))
        }
      />
      <Header text="Anecdote with the most votes" />
      <Anecdote text={anecdotes[mostPopular]} votes={votes[mostPopular]} />
    </div>
  );
};

export default App;
