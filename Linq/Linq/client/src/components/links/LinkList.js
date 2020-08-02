import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse, Container, Row } from "reactstrap";
import { LinkContext } from "../../providers/LinkProvider";
import BootstrapTable from "react-bootstrap-table-next";
import NewLinkForm from "./NewLinkForm";
import MissingLinks from "./MissingLinks";
import { CategoryContext } from "../../providers/CategoryProvider";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function LinkList() {
  const { links, getLinks } = useContext(LinkContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    getLinks();
    getCategories();
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
    const currentLink = {
      favorite: link.isFavorite ? 
        <FontAwesomeIcon
          icon={faStar}
          size="lg"
          style={{ color: "goldenrod" }}
        />
       : (
        ""
      ),
      category: `${link.category ? link.category.name : ""}`,
      title: link.title,
      url: link.url,
      createDate: moment(link.createDate).format("llll"),
    };
    data.push(currentLink);
  });

  return (
    <>
      <Container>
        <span>
          <h1 className="m-3 text-center">My Links</h1>
        </span>

        <Button className="m-3" onClick={toggle}>
          Add Link
        </Button>
        <Collapse isOpen={isOpen}>
          <NewLinkForm toggle={toggle} categories={categories} />
        </Collapse>
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
