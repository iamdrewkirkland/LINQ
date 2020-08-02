import React from "react";
import { Jumbotron } from "reactstrap";

export default function MissingLinks() {
  return (
    <Jumbotron>
      <h1>Uh oh!</h1>
      <hr className="my-1" />
      <p className="lead">
        You don't have any links yet - add some to get started!
      </p>
    </Jumbotron>
  );
}
