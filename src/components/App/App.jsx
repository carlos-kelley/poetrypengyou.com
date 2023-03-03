import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import PoemSelectPage from "../PoemSelectPage/PoemSelectPage";
import PoemPage from "../PoemPage/PoemPage";
// import AppUrlListener from "../AppUrlListener";
import TestBackground from "../TestBackground/TestBackground";
import TestRoute from "../TestRoute/TestRoute";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  // Auth functionality is included but not currently used
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
    // </AppUrlListener>
  );
}

export default App;
