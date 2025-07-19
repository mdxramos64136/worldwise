import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useCities } from "../contexts/CityContext";

function Map() {
  const navigate = useNavigate();
  //Global state - get the cities out of the CityContext using
  // custom hook defined there (useCities())
  const { cities } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  // accessing the data:
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  //console.log(`Testando lat: ${lat}`);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>{city.notes}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
