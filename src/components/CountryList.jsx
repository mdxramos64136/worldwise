/** IMPORTANT: If you use the Google Chrome or the Edge browser, you might need
    to install the extension 'Country Flag Fixer' to see the flags properly */

import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  // if there is not items...
  if (!cities.length) {
    return (
      <Message message="Add your first country by clickin on a country on the map" />
    );
  }

  // city/cur = current city
  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country)) {
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   } else return arr;
  // }, []);

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <div>
      <ul className={styles.countriesList}>
        {countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
