import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CityList() {
  //consuming the Context:
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  // if there is not items...
  if (!cities.length) {
    return (
      <Message message="Add your first city by clickin on a city on the map" />
    );
  }

  return (
    <div>
      <ul className={styles.CityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    </div>
  );
}

export default CityList;
