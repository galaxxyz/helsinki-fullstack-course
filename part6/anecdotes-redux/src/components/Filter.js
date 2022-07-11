import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

export const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value;
    props.setFilter(filter);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter
      <input onChange={handleChange} />
    </div>
  );
};

const ConnectedFilter = connect(null, { setFilter })(Filter);

export default ConnectedFilter;
