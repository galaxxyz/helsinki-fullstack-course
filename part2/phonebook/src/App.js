import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
);

const PesronForm = ({
  onSubmit,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Phonebook = ({ persons, filter }) => {
  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return personsToShow.map((person) => (
    <Person key={person.name} person={person} />
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(
    () =>
      axios
        .get("http://localhost:3001/persons")
        .then((response) => setPersons(response.data)),
    []
  );

  const addPerson = (event) => {
    event.preventDefault();
    const personWithSameName = persons.find(
      (person) => person.name === newName
    );
    const personWithSameNumber = persons.find(
      (person) => person.number === newNumber
    );
    if (personWithSameName) {
      window.alert(`${newName} is already added to phonebook`);
    } else if (personWithSameNumber) {
      window.alert(
        `${newNumber} is already added to phonebook as ${personWithSameNumber.name}`
      );
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PesronForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={filter} />
    </div>
  );
};

export default App;
