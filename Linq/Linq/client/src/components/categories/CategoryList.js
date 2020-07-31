import React, { useContext, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
} from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";

export default function CategoryList() {
  const { categories, deleteCategory, getCategories } = useContext(
    CategoryContext
  );
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container className="d-flex">
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
      </Container>
    </>
  );
}
