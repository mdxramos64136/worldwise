/*eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

/////////////////////////////////////////////////////////////////////////
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  //[] load on mount/ initial render:
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was a error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
} //CitiesProvider

// Creating a custom hook to consume the data:
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the PostProvider.");
  return context;
}

export { CitiesProvider, useCities };
