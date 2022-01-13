import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState({
    main: { temp: "" },
    wind: { speed: "" },
  });
  const APIkey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(
    () =>
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${APIkey}&units=metric`
        )
        .then((response) => {
          setCurrentWeather(response.data.list[0]);
          console.log(response.data.list[0]);
        }),
    []
  );

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>
        <b>temperature: </b>
        {currentWeather.main.temp} Celsius
      </p>
      <p>
        <b>wind: </b>
        {currentWeather.wind.speed} m/s
      </p>
    </div>
  );
};

const Country = ({ info }) => {
  return (
    <div>
      <h3>{info.name.common}</h3>
      <>
        {info.capital.map((c) => (
          <p key={c}>Capital: {c}</p>
        ))}
      </>
      <p>Area: {info.area}</p>
      <p>Population: {info.population}</p>
      <img src={info.flags.png} alt="" />
      <Weather city={info.capital[0]} />
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

const SearchResult = ({ countries, filter }) => {
  if (!filter) return <p>Start entering the name of a country</p>;
  else if (countries.length === 0) return <p>No matching countries found</p>;
  else if (countries.length === 1) return <Country info={countries[0]} />;
  else if (countries.length <= 10)
    return countries.map((country) => (
      <CountryHidden info={country} key={country.name.common} />
    ));
  else return <p>Too many matches, specify another filter</p>;
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
      <SearchResult countries={countriesToShow} filter={filter} />
    </div>
  );
};

export default App;
