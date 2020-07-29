import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { LinkProvider } from "./providers/LinkProvider";
import { UserProfileProvider } from "./providers/UserProfileProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <LinkProvider>
          <Header />
          <ApplicationViews />
        </LinkProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
