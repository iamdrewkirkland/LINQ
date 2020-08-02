import React, { useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { LinkContext } from "../../providers/LinkProvider.js";
import BootstrapTable from "react-bootstrap-table-next";
import MissingLinks from "../links/MissingLinks.js";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function CategoryDetail({ category }) {
  const { links, getLinks } = useContext(LinkContext);

  //GetPublicCategoryLinks(`${this.props.params.username}`, `${this.props.params.category}`) = useContext(LinkContext)
  //${this.props.params.username}
  //${this.props.params.category}

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line
  }, []);

  // Setting the name and associated values of the table head
  const columns = [
    {
      dataField: "favorite",
      text: "Favorite?",
      sort: true,
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
    },
    {
      dataField: "url",
      text: "URL",
      sort: true,
    },
    {
      dataField: "createDate",
      text: "Date Added",
      sort: true,
    },
  ];

  // Setting the values of the table rows
  const data = [];

  links.map((link) => {
    if (link.categoryId === category.id) {
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
        category: `${link.category ? link.category.name : ""}`,
        title: link.title,
        url: link.url,
        createDate: moment(link.createDate).format("llll"),
      };
      data.push(currentLink);
    }
  });

  return (
    <>
      <Container>
        <span>
          <h1 className="m-3 text-center">{category.name}</h1>
        </span>

        {links.length > 0 ? (
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            bootstrap4={true}
            condensed={true}
            hover={true}
            noDataIndication={"Add a link to get started!"}
          />
        ) : (
          <MissingLinks />
        )}
      </Container>
    </>
  );
}
