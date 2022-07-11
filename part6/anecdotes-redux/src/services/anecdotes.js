import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const responce = await axios.get(baseURL);
  return responce.data;
};

const get = async (id) => {
  const responce = await axios.get(`${baseURL}/${id}`);
  return responce.data;
};

const createNew = async (content) => {
  const anecdot = { content, votes: 0 };
  const responce = await axios.post(baseURL, anecdot);
  return responce.data;
};

const vote = async (id) => {
  const anecdote = await get(id);
  const responce = await axios.patch(`${baseURL}/${id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return responce.data;
};

const anecdotesService = { getAll, createNew, vote };

export default anecdotesService;
