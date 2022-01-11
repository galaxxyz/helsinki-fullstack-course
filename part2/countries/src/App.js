import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ info }) => {
  return (
    <div>
      <p>{info.name.common}</p>
      <>
        {info.capital.map((c) => (
          <p key={c}>{c}</p>
        ))}
      </>
      <p>{info.area}</p>
      <img src={info.flags.png} alt="" />
    </div>
  );
};

const CountryHidden = ({ info }) => {
  const [hidden, setHidden] = useState(true);

  const infoToShow = hidden ? info.name.common : <Country info={info} />;

  return (
    <div>
      {infoToShow}
      <button onClick={() => setHidden(!hidden)}>
        {hidden ? "show" : "hide"}
      </button>
    </div>
  );
};

const Display = ({ countries }) => {
  if (countries.length === 0) return "Start entering the name of a country";
  else if (countries.length === 1) return <Country info={countries[0]} />;
  else if (countries.length <= 10)
    return countries.map((country) => (
      <CountryHidden info={country} key={country.name.common} />
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
