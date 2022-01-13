import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Person from "./components/Person";

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

const Phonebook = ({ persons, filter, remove }) => {
  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return personsToShow.map((person) => (
    <Person key={person.id} person={person} remove={remove} />
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(
    () => personService.getAll().then((response) => setPersons(response)),
    []
  );

  const handleRemovedPersonError = () => {
    personService.getAll().then((response) => setPersons(response));
    setErrorMessage(`${newName} was already deleted from server`);
    setTimeout(() => setErrorMessage(null), 5000);
  };
  const handleSuccessPhonebookEditing = (message) => {
    setNewName("");
    setNewNumber("");
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
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
          .update(personWithSameName.id, {
            ...personWithSameName,
            number: newNumber,
          })
          .then((response) => {
            setPersons(
              persons.map((p) =>
                p.id !== personWithSameName.id ? p : response
              )
            );
            handleSuccessPhonebookEditing(`${newName}'s number was changed`);
          })
          .catch(() => handleRemovedPersonError());
      }
    } else if (personWithSameNumber) {
      window.alert(
        `${newNumber} is already added to phonebook as ${personWithSameNumber.name}`
      );
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response));
          handleSuccessPhonebookEditing(`Added ${newName}`);
        });
    }
  };

  const remove = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== response));
        })
        .catch(() => handleRemovedPersonError());
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
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilterChange} />
      <Notification message={errorMessage} color={"red"} />
      <Notification message={successMessage} color={"green"} />
      <h2>Add a new</h2>
      <PesronForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook persons={persons} filter={filter} remove={remove} />
    </div>
  );
};

export default App;
