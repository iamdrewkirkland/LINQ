import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login.js";
import Register from "./Register.js";
import LinkList from "./links/LinkList";
import CategoryList from "./categories/CategoryList";
import Main from "./Main";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Main /> : <Redirect to="/login" />}
        </Route>

        <Route path="/links">
          {isLoggedIn ? <LinkList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
