import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdot } from '../reducers/anecdoteReducer';
import { manageNotification } from '../reducers/notificationReducer';
import { shortenString } from '../helpers';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filteredAnecdotes = useSelector(({ filter, anecdotes }) => {
    return filter
      ? anecdotes.filter((a) => a.content.toLowerCase().indexOf(filter) !== -1)
      : anecdotes;
  });

  const handleVote = (anecdote) => {
    dispatch(voteForAnecdot(anecdote.id));
    const notification = shortenString(`You voted for: '${anecdote.content}'`);
    dispatch(manageNotification(notification, 3000));
  };

  return [...filteredAnecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
