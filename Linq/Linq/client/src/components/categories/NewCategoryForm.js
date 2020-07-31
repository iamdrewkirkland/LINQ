import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import Toggle from "react-toggle";
import { CategoryContext } from "../../providers/CategoryProvider";

export default function NewCategoryForm() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const { addCategory } = useContext(CategoryContext);

  function toggleFavorite() {
    setFavorite(!favorite);
  }
  function togglePublic() {
    setIsPublic(!isPublic);
  }

  function submitLink(e) {
    e.preventDefault();

    // establish a new link object for submission
    const netCategory = {
      name: name,
      color: color,
      isFavorite: favorite,
      isPublic: isPublic,

    };
    debugger;

    addLink(newLink);
  }

  return (
    <>
      <Container className="m-3">
        <h4>add a new category</h4>
        <Form className="pt-2" onSubmit={submitLink}>
          <FormGroup>
            <Label for="form--title">Title</Label>
            <Input
              required
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
              required
              type="url"
              name="title"
              id="form--url"
              value={url}
              onInput={(e) => setUrl(e.target.value)}
              placeholder="http://www.someURL.com"
            />
            <FormText color="muted">
              Your link needs to include the HTTP prefix (http:// or https://)
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="form--category">Category</Label>
            <Input
              type="select"
              name="category"
              id="form--category"
              placeholder="select a category"
              defaultValue={0}
              onChange={(e) => {
                if (e.target.value !== "0") {
                  setCategoryId(e.target.value);
                } else {
                  setCategoryId(null);
                }
              }}
            >
              {" "}
              <option value={0}>Select Category</option>
              {categories.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </Input>
            <FormText color="muted">
              You do not need to choose a category - you can edit this later
            </FormText>
          </FormGroup>
          <FormGroup>
            <Toggle
              id="form--favorite"
              name="isFavorite"
              value={favorite}
              onChange={toggleFavorite}
            />
            <FormText color="muted">Toggle to set link as favorite</FormText>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
}
