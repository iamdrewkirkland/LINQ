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

export default function EditCategoryForm({ toggle, category }) {
  const [name, setName] = useState(category.name);
  const [isColor, setColor] = useState(category.color ? category.color : "");
  const [favorite, setFavorite] = useState(category.isFavorite);
  const [isPublic, setIsPublic] = useState(category.isPublic);
  const { editCategory } = useContext(CategoryContext);

  function toggleFavorite() {
    setFavorite(!favorite);
  }
  function togglePublic() {
    setIsPublic(!isPublic);
  }

  function submitCategory(e) {
    e.preventDefault();

    // establish an updated category object for submission
    const updateCategory = {
      id: category.id,
      name: name,
      color: isColor,
      isFavorite: favorite,
      isPublic: isPublic,
    };
    editCategory(updateCategory)
    //   .then(
    //     setName(name),
    //     setColor(isColor),
    //     setFavorite(favorite),
    //     setIsPublic(isPublic)
    //   )
      .then(() => toggle(null));
  }

  return (
    <>
      <Container className="m-3 p-3 border rounded">
        <h4 className="text-center">Edit Category</h4>
        <Form className="pt-2" onSubmit={submitCategory}>
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
                  checked={favorite}
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
                  checked={isPublic}
                  onChange={togglePublic}
                />
                <FormText color="muted">
                  Toggle to set category as public
                </FormText>
              </FormGroup>
            </Col>
          </Row>

          <Button type="submit" color="secondary">
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
}
