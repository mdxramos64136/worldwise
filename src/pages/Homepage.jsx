import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";
function Homepage() {
  return (
    <div className="test">
      <PageNav />
      <AppNav />
      <h1>Wordwise Homepage</h1>
      <Link to="/app">Go to the App</Link>
    </div>
  );
}

export default Homepage;
