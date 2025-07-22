import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  //Global state - get the cities out of the CityContext using
  // custom hook defined there (useCities())
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // accessing the data:
  const mapLat = Number(searchParams.get("lat"));
  const mapLng = Number(searchParams.get("lng"));

  // sync mapPosition with mapLat n mapLng so that when we click on Back btn
  // the pin will keep positionen on the last city. So whenever that values
  // changes, mapPosition will also the and store and retain the new values:
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  //new effect to cync with my current position:
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {/* type = class? */}
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading" : "Get My Position"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>{city.notes}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap({});
  //recebe como param. a posição e o zoom level (opcional)
  map.setView(position);
  return null;
}

// navigate to the form URL
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      //check the obj:
      console.log(e);

      //passing data through URL/ query
      navigate(`form?lat=${e.latlng.lat}&lng${e.latlng.lng}`);
    },
  });
}

export default Map;
