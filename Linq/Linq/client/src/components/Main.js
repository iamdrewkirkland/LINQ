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
  CardColumns,
  CardLink,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { CategoryContext } from "../providers/CategoryProvider";
import { LinkContext } from "../providers/LinkProvider";

export default function Main() {
  const { categories, getCategories } = useContext(CategoryContext);
  const { links, getLinks } = useContext(LinkContext);

  useEffect(() => {
    getCategories();
    getLinks();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        <span>
          <h1 className="m-3 text-center">Home</h1>
        </span>
        <Row className="d-flex">
          <CardColumns>
            {categories.map((category) => {
              return (
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
                    {links.map((link) => {
                      if (link.categoryId === category.id) {
                        return (
                          <CardLink href={link.url} target="blank">
                            {link.title}
                          </CardLink>
                        );
                      }
                    })}
                  </CardBody>
                </Card>
              );
            })}
          </CardColumns>
        </Row>
      </Container>
    </>
  );
}
