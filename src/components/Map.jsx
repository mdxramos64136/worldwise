import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  // accessing the data:
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(`Testando lat: ${lat}`);
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h2>{lat}</h2>
      <h2>{lng}</h2>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        change position
      </button>
    </div>
  );
}

export default Map;
