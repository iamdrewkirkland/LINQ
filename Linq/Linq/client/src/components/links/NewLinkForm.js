import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
import Toggle from "react-toggle";
import { LinkContext } from "../../providers/LinkProvider";
export default function NewLinkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
    const {addLink} = useContext(LinkContext);

  function submitLink(e) {
    e.preventDefault();
    
    // establish a new link object for submission
    const newLink = {
      title: title,
      url: url,
    };
    addLink(newLink)

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
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              placeholder="enter a short title for your link"
            />
          </FormGroup>
          <FormGroup>
            <Label for="form--url">URL</Label>
            <Input
              type="url"
              name="title"
              id="form--url"
              value={url}
              onInput={(e) => setUrl(e.target.value)}
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
          <Button onClick={submitLink}>Submit</Button>
        </Form>
      </Container>
      ;
    </>
  );
}
