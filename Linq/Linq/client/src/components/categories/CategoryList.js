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
  Badge,
} from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import NewCategoryForm from "./NewCategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditCategoryForm from "./EditCategoryForm";

export default function CategoryList() {
  const { categories, deleteCategory, getCategories } = useContext(
    CategoryContext
  );

  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

  const [collapseState, setCollapseState] = useState(null);
  const [categoryEdit, setCategoryEdit] = useState(null);

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

  function ControlCollapse() {
    switch (collapseState) {
      case "add":
        //display NewForm if add button clicked
        return <NewCategoryForm toggle={setCollapseState} />;
      case "edit":
        //display EditForm if edit button clicked - takes CATEGORY as argument
        return (
          <EditCategoryForm category={categoryEdit} toggle={setCollapseState} />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <Container>
        <span>
          <h1 className="m-3 text-center">My Categories</h1>
        </span>
        <Button
          className="m-3"
          name="add"
          onClick={() => setCollapseState("add")}
        >
          Add Category
        </Button>
        <Collapse isOpen={collapseState}>
          <ControlCollapse />
        </Collapse>
        <Row className="d-flex">
          {categories.map((category) => (
            <Card
              key={category.id}
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
                  <Badge>{category.isPublic ? "Public" : "Private"}</Badge>
                </CardTitle>
                <Row className="">
                  <Button
                    className="ml-1"
                    outline
                    size="sm"
                    color="secondary"
                    name="edit"
                    onClick={() => {
                      setCollapseState("edit");
                      setCategoryEdit(category);
                    }}
                  >
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
