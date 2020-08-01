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
  Collapse,
  Row,
  Badge,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CategoryContext } from "../providers/CategoryProvider";

export default function Main() {
  const { categories, getCategories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
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
                  <Badge>{category.isPublic ? "Public" : "Private"}</Badge>
                </CardTitle>
              </CardBody>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}
