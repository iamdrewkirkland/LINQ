import React from "react";
import { Jumbotron } from "reactstrap";

export default function MissingCategories() {
  return (
    <Jumbotron>
      <h1>Something's Missing...</h1>
      <hr className="my-1" />
      <p className="lead">
        You don't have any categories yet - add some to get started!
      </p>
    </Jumbotron>
  );
}
