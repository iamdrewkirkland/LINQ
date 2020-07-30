import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
import Toggle from "react-toggle";
export default function NewLinkForm() {
  function handleChange(event) {
    // do something with event.target.checked
  }
  return (
    <>
      <Container className="m-3">
        <h4>add a new link</h4>
        <Form className="pt-2">
          <FormGroup>
            <Label for="form--title">Title</Label>
            <Input
              type="text"
              name="title"
              id="form--title"
              placeholder="enter a short title for your link"
            />
          </FormGroup>
          <FormGroup>
            <Label for="form--url">URL</Label>
            <Input
              type="url"
              name="title"
              id="form--url"
              placeholder="URL goes here"
            />
          </FormGroup>
          <FormGroup>
            <Label for="form--category">Category</Label>
            <Input
              type="select"
              name="category"
              id="form--category"
              placeholder="select a category"
            >
              <option>MAP OVER CATEGORIES HERE</option>
            </Input>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />
              Favorite?
            </Label>
            {/* <Toggle
              id="form--favorite"
              name="isFavorite"
              //   checked={this.state.isFavorite}
              //   value='no'
              //   icons={false}
              //   onChange={this.handleChange}
            /> */}
          </FormGroup>
        </Form>
      </Container>
      ;
    </>
  );
}
