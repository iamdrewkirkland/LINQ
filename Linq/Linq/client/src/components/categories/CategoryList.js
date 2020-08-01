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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

  function confirmDelete(category) {
    const confirm = window.confirm(
      `Are you sure you want to delete the ${category.name} category?`
    );
    if (confirm) {
      deleteCategory(category.id);
    }
  }

  return (
    <>
      <Container>
        <Button className="m-3" onClick={toggle}>
          Add Category
        </Button>
        <Collapse isOpen={isOpen}>
          <NewCategoryForm />
        </Collapse>
        <Row className="d-flex">
          {categories.map((category) => (
            <Card
              className="m-3"
              outline
              style={{ borderColor: `${category.color}` }}
            >
              <CardBody>
                <CardTitle>
                  <h3>
                    {category.name}{" "}
                    {category.isFavorite ? (
                      <FontAwesomeIcon
                        icon={faStar}
                        size="sm"
                        style={{ color: "goldenrod" }}
                      />
                    ) : null}{" "}
                  </h3>
                </CardTitle>
                <CardSubtitle>
                  {category.isPublic ? "Public" : "Private"}
                </CardSubtitle>
                <Row className="">
                  <Button className="ml-1" outline size="sm" color="secondary">
                    <FontAwesomeIcon size="sm" icon={faEdit} />
                  </Button>
                  <Button
                    className="ml-1"
                    outline
                    size="sm"
                    color="danger"
                    onClick={(e) => {
                      e.preventDefault();
                      confirmDelete(category);
                    }}
                  >
                    <FontAwesomeIcon size="sm" icon={faTrash} />
                  </Button>
                </Row>
              </CardBody>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}
