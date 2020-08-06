import React, { useContext, useState } from "react";
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
import { LinkContext } from "../../providers/LinkProvider";

export default function EditLinkForm({ categories, link, toggle }) {
  const { editLink } = useContext(LinkContext);

  // Setting initial state to the existing values of the link
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [categoryId, setCategoryId] = useState(
    link.categoryId ? link.categoryId : 0
  );
  const [favorite, setFavorite] = useState(link.isFavorite);

  // Function to change toggle
  //causes "Too Many Re-renders" error without this helper function

  function toggleFavorite() {
    setFavorite(!favorite);
  }

  function submitLink(e) {
    e.preventDefault();

    // spread current link properties that are not included on form (date, id)
    let updateLink = { ...link };

    //setting updated values
    updateLink.title = title;
    updateLink.url = url;
    updateLink.isFavorite = favorite;
    updateLink.categoryId = categoryId;

    //check if the category has been left blank
    if (categoryId === 0) {
      updateLink.categoryId = null;
    }
    editLink(updateLink).then(() => toggle(null));
  }

  return (
    <>
      <Container className="m-3 p-3 border rounded">
        <Button close onClick={() => toggle(null)} />
        <h4 className="text-center">Edit Category</h4>
        <Form className="pt-2" onSubmit={submitLink}>
          <FormGroup>
            <Label for="form--title">Title</Label>
            <Input
              required
              type="text"
              name="title"
              id="form--title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setUrl(e.target.value)}
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
              value={categoryId}
              onChange={(e) => {
                if (e.target.value !== "0") {
                  setCategoryId(e.target.value);
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
              checked={favorite}
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
