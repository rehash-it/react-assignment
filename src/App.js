import "./App.css";
import Sidenavbar from "./components/sidenavbar/sidenavbar.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./components/users/users.component";
import Organizations from "./components/organizations/organizations.component";
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Sidenavbar />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
