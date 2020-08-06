import React, { useContext, useEffect, useState } from "react";
import { Container, Jumbotron } from "reactstrap";
import { LinkContext } from "../../providers/LinkProvider.js";
import BootstrapTable from "react-bootstrap-table-next";
import MissingLinks from "../links/MissingLinks.js";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider.js";

export default function CategoryDetail() {
  const { getCategoryLinks, getCategoryLinksAuth } = useContext(LinkContext);
  const { isLoggedIn } = useContext(UserProfileContext);
  const { username, category } = useParams();
  const [categoryLinks, setCategoryLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    isLoggedIn
      ? getCategoryLinksAuth(username, category)
          .then((c) => {
            setCategoryLinks(c);
            setIsLoading(false);
          })
          .catch(() => setErrorMessage("Sorry, there's nothing here."))
      : getCategoryLinks(username, category)
          .then((c) => {
            setCategoryLinks(c);
            setIsLoading(false);
          })
          .catch(() => setErrorMessage("Sorry, there's nothing here."));

    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (errorMessage) {
    return (
      <Container>
        <Jumbotron>
          <h1>Uh oh!</h1>
          <hr className="my-1" />
          <p className="lead">{errorMessage}</p>
        </Jumbotron>
      </Container>
    );
  }

  // Setting the name and associated values of the table head
  const columns = [
    {
      dataField: "favorite",
      text: "Favorite?",
      sort: true,
      headerAlign: 'center'
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerAlign: "center",
      formatter: (title, row) => (
        <a href={`${row.url}`} target="blank">
          {title}
        </a>
      ),
    },
    {
      dataField: "url",
      text: "URL",
      hidden: true,
    },
    {
      dataField: "createDate",
      text: "Date Added",
      sort: true,
      headerAlign: 'center',
      formatter: (date) => moment(date).format("llll")
    },
  ];

  // Setting the values of the table rows
  const data = [];

  categoryLinks.map((link) => {
    if (link.category.name === category) {
      const currentLink = {
        favorite: link.isFavorite ? (
          <FontAwesomeIcon
            icon={faStar}
            size="lg"
            style={{ color: "goldenrod" }}
          />
        ) : (
          ""
        ),
        title: link.title,
        url: link.url,
        createDate: link.createDate,
      };
      data.push(currentLink);
    }
  });

  return (
    <>
      <Container>
        <span>
          <h1 className="m-3 text-center">{category}</h1>
        </span>

        {categoryLinks.length === 0 && !isLoading ? (
          <MissingLinks />
        ) : (
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            bootstrap4={true}
            condensed={true}
            hover={true}
          />
        )}
      </Container>
    </>
  );
}
