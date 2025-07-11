import styles from "./CityItem.module.css";

function CityItem({ city }) {
  //take a look at the shape of the object to destructure it:
  console.log(city);
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
    </li>
  );
}

export default CityItem;
