import styles from "./City.module.css";

import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CityContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams(); // to fetch the data. It comes from the URL
  console.log(id);
  const { getCity, currentCity, isLoading } = useCities();

  //Por que foi necessário mais um useEffect aqui se já tem
  // um em CityContext pra pegar os dados da API?
  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  /*Important: Hook ALWAYS need to be called in the same order*/
  if (isLoading) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <BackButton />
    </div>
  );
}

export default City;
