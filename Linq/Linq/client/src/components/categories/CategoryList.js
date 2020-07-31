import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Collapse,
  Row,
} from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import NewCategoryForm from "./NewCategoryForm";

export default function CategoryList() {
  const {
    categories,
    deleteCategory,
    editCategory,
    getCategories,
  } = useContext(CategoryContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        <Button className="m-3" onClick={toggle}>
          Add Category
        </Button>
        <Collapse isOpen={isOpen}>
          NEW CATEGORY FORM GOES HERE
        </Collapse>
        <Row className="d-flex">
          {categories.map((category) => (
            <Card className="m-3">
              <CardBody>
                <CardTitle>
                  <h4>{category.name}</h4>
                </CardTitle>
                <CardSubtitle>
                  Category View: {category.isPublic ? "Public" : "Private"}
                </CardSubtitle>
                {category.isFavorite ? (
                  <CardText> Favorite Category</CardText>
                ) : null}
                <Button outline size="sm">
                  Edit
                </Button>
                <Button outline size="sm">
                  Delete
                </Button>
              </CardBody>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}
