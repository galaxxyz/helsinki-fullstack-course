import { useState, useEffect } from "react";
import personService from "./services/persons";

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

const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person)}>delete</button>
    </p>
  );
};

const Phonebook = ({ persons, filter, deletePerson }) => {
  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return personsToShow.map((person) => (
    <Person key={person.name} person={person} deletePerson={deletePerson} />
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(
    () => personService.getAll().then((response) => setPersons(response)),
    []
  );

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const personWithSameName = persons.find(
      (person) => person.name === newName
    );
    const personWithSameNumber = persons.find(
      (person) => person.number === newNumber
    );

    if (personWithSameName) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personWithSameName.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((p) =>
                p.id !== personWithSameName.id ? p : response
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else if (personWithSameNumber) {
      window.alert(
        `${newNumber} is already added to phonebook as ${personWithSameNumber.name}`
      );
    } else {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personService.deletePerson(person.id).then((response) => {
        setPersons(persons.filter((p) => p.id !== response.id));
      });
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
      <Phonebook
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
