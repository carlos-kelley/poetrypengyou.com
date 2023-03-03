import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import PoemSelectPage from "../PoemSelectPage/PoemSelectPage";
import PoemPage from "../PoemPage/PoemPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);


  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/poemselect */}
          <Redirect
            exact
            from="/"
            to="/poemselect"
          />

          <Route
            exact
            path="/poemselect"
          >
            <PoemSelectPage />
          </Route>

          <Route exact path="/poem/:number">
            <PoemPage />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
