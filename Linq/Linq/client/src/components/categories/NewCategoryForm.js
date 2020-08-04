import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";
import Toggle from "react-toggle";
import { CategoryContext } from "../../providers/CategoryProvider";
import { SketchPicker } from "react-color";

export default function NewCategoryForm({ toggle }) {
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

    addCategory(newCategory)
      .then(() => {
        setName("");
        setColor("");
        setFavorite(false);
        setIsPublic(false);
      })
      .then(() => toggle(null));
  }

  return (
    <>
      <Container className="m-3 p-3 border rounded">
        <h4 className="text-center">Add New Category</h4>
        <Form className="pt-2" onSubmit={submitLink}>
          <Row>
            <Col>
              <FormGroup>
                <Label for="categoryForm--name">Name</Label>
                <Input
                  required
                  type="text"
                  name="name"
                  id="categoryForm--name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cats, Cats, and More Cats"
                />
                <FormText color="muted">
                  Enter a short, descriptive name for your new category
                </FormText>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>Color</Label>
                <SketchPicker
                  disableAlpha={true}
                  color={isColor}
                  onChangeComplete={(e) => {
                    setColor(e.hex);
                  }}
                />
                <FormText color="muted">
                  Choose a color to easily identify this category
                </FormText>
              </FormGroup>
            </Col>
            <Col>
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
                <FormText color="muted">
                  Toggle to set category as public
                </FormText>
              </FormGroup>
            </Col>
          </Row>

          <Button type="submit" color="primary">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
