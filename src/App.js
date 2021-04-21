import "./App.css";
import Sidenavbar from "./components/sidenavbar/sidenavbar.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
