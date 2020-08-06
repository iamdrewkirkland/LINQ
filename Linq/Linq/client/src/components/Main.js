import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Badge,
  CardColumns,
  CardLink,
  Jumbotron,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { CategoryContext } from "../providers/CategoryProvider";
import { LinkContext } from "../providers/LinkProvider";
import { Link } from "react-router-dom";

export default function Main() {
  const { categories, getCategories } = useContext(CategoryContext);
  const { links, getLinks } = useContext(LinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
    getLinks().then(() => setIsLoading(false));

    // eslint-disable-next-line
  }, []);

  function MainDisplay() {
    if (categories.length === 0 && !isLoading) {
      return (
        <Jumbotron>
          <h1>Welcome to LINQ!</h1>
          <p className="lead">
            You must be new. As you add links and categories they will appear
            here.
          </p>
          <hr className="my-1" />
          <p /> Categories are sorted by favorite status and will display the
          title of the links they contain. You can click the detail button
          (arrow) to see a detail view of the category and it's links.
          <p>
            Any categories that are marked as public can be accessed by the
            category detail link. Check out this public category for an example:{" "}
            <a
              href="http://localhost:3000/iamdrewkirkland/Programming%20Links"
              target="blank"
            >
              http://localhost:3000/iamdrewkirkland/Programming%20Links
            </a>
          </p>
        </Jumbotron>
      );
    }
    return (
      <Row className="d-flex">
        <CardColumns>
          {categories.map((category) => {
            return (
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
                      <Link
                        to={`/${category.userProfile.username}/${category.name}`}
                      >
                        <Button
                          className="ml-auto"
                          target="blank"
                          outline
                          size="sm"
                        >
                          <FontAwesomeIcon size="sm" icon={faExternalLinkAlt} />
                        </Button>
                      </Link>
                    </h3>

                    <Badge color="info">
                      {category.isPublic ? "Public" : "Private"}
                    </Badge>
                  </CardTitle>

                  {links.map((link) => {
                    if (link.categoryId === category.id) {
                      return (
                        <CardLink key={link.id} href={link.url} target="blank">
                          {link.title}
                        </CardLink>
                      );
                    }
                    return null;
                  })}
                </CardBody>
              </Card>
            );
          })}
        </CardColumns>
      </Row>
    );
  }

  return (
    <>
      <Container>
        <span>
          <h1 className="m-3 text-center">Home</h1>
        </span>
        <MainDisplay />
      </Container>
    </>
  );
}
