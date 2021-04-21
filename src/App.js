import './App.css';
import Sidenavbar from './components/sidenavbar/sidenavbar.component';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from './components/users/users.component';

function App() {
  return (
    <div className="App">
     
      <Router>
        <Switch>
        <Sidenavbar/>
          {/* <Route exact path="/" component={Users} /> */}
          <Route path="/users" component={Users} />
          {/* <Route path="/organizations" component={Content} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
