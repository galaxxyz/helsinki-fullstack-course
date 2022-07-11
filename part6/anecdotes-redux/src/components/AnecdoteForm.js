import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { manageNotification } from '../reducers/notificationReducer';
import { shortenString } from '../helpers';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(content);
    const notification = shortenString(`You created new: '${content}'`);
    props.manageNotification(notification, 3000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  manageNotification,
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
