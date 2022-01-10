import { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ countries }) => {
  if (countries.length === 0) return "Start entering the name of a country";
  else if (countries.length === 1) {
    console.log(countries[0]);
    return (
      <div>
        <p>{countries[0].name.common}</p>
        <>
          {countries[0].capital.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </>
        <p>{countries[0].area}</p>
        <img src={countries[0].flags.png} alt="" />
      </div>
    );
  } else if (countries.length <= 10)
    return countries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  else return "Too many matches, specify another filter";
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(
    () =>
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        setCountries(response.data);
        console.log(response.data);
      }),
    []
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <p>debug: {filter}</p>
      <Display countries={countriesToShow} />
    </div>
  );
};

export default App;
