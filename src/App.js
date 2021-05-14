import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./Home/Home";
import Interactive from "./Interactive/Interactive";

export default function App() {
  return (
    <Router>
      <h1 className="name-heading">
        🌳CAMERON ZIMMERMAN🌳
      </h1>
      <div className="main-content">
        <nav className="center">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bio">Bio</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/experience">Experience</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/interactive">
            <Interactive />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
