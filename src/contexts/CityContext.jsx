/*eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

//Reeducer must be a pure function. no api request is allowed.
//So fetch will be put in a separate functio and once data has been received,
//then wil dispatch action to the reducer.
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload, //highlights the newly created city
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknwon action type!");
  }
}

/***************************************************************/
function CitiesProvider({ children }) {
  //destructurind the 'state'
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //[] load on mount/ initial render:
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" }); //replaced setIsLoading
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data }); //replaced setCities(data);
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was a error loading ciities...",
        });
      }
    }
    fetchCities();
  }, []);
  /***************************************************************/
  const getCity = useCallback(
    async function getCity(id) {
      // It avoids calling the API again if the city we want to load is already
      // the current city. Note that the ID is coming from the URL,
      // so we need to convert it to a number.
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was a error loading the city...",
        });
      }
    },
    [currentCity.id]
  );
  /***************************************************************/
  /**
   * The ID will be auto-generated.
   * It's necessary to add the new city to the `cities` state to keep the app state
   * in sync with the UI state (i.e., keep the UI state consistent with the remote state).
   */
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity), // converting to string
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      //data = new city object
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a error creating the city...",
      });
    }
  }
  /***************************************************************/

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a error deleting the city...",
      });
    }
  }
  /***************************************************************/

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
