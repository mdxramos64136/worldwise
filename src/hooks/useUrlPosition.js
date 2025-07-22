import { useSearchParams } from "react-router-dom";

//creating a custom hook on top of another custom hook from
//react router (useSearchParams)
export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  // accessing the data:
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  return [lat, lng];
}
