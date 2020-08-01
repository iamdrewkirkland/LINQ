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
import { SketchPicker } from "react-color";

export default function NewCategoryForm() {
  const [name, setName] = useState("");
  const [isColor, setColor] = useState("");
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
    const newCategory = {
      name: name,
      color: isColor,
      isFavorite: favorite,
      isPublic: isPublic,
    };
    debugger;

    addCategory(newCategory);
  }

  return (
    <>
      <Container className="m-3">
        <h4>add a new category</h4>
        <Form className="pt-2" onSubmit={submitLink}>
          <FormGroup>
            <Label for="categoryForm--name">Name</Label>
            <Input
              required
              type="text"
              name="name"
              id="categoryForm--name"
              value={name}
              onInput={(e) => setName(e.target.value)}
              placeholder="enter a short title for your link"
            />
          </FormGroup>
          <FormGroup>
            <Label for="form--url">Color</Label>
            <SketchPicker
              disableAlpha={true}
              color={isColor}
              onChangeComplete={(e) => {
                setColor(e.hex);
                debugger;
              }}
            />
            {/* <Input
              required
              type="color"
              name="color"
              id="categoryForm--color"
              value={color}
              onInput={(e) => setColor(e.target.value)}
            /> */}
            <FormText color="muted">
              Choose a color to easily identify this category
            </FormText>
          </FormGroup>
          <FormGroup>
              <Toggle
                id="categoryForm--favorite"
                name="isFavorite"
                value={favorite}
                onChange={toggleFavorite}
              />
            <FormText color="muted">
              Toggle to set category as favorite
            </FormText>
          </FormGroup>
          <FormGroup>
            <Toggle
              id="categoryForm--public"
              name="isPublic"
              value={isPublic}
              onChange={togglePublic}
            />
            <FormText color="muted">Toggle to set category as public</FormText>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
}
