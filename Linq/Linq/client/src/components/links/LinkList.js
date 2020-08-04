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
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditLinkForm from "./EditLinkForm";

export default function LinkList() {
  const { links, getLinks, deleteLink, editLink } = useContext(LinkContext);
  const { categories, getCategories } = useContext(CategoryContext);

  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

  const [collapseState, setCollapseState] = useState(null);
  const [linkEdit, setLinkEdit] = useState(null);

  useEffect(() => {
    getLinks();
    getCategories();
    // eslint-disable-next-line
  }, []);

  function ControlCollapse() {
    switch (collapseState) {
      case "add":
        //display NewForm if add button clicked
        return (
          <NewLinkForm categories={categories} toggle={setCollapseState} />
        );
      case "edit":
        //display EditForm if edit button clicked - takes CATEGORY as argument
        return (
          <EditLinkForm
            categories={categories}
            link={linkEdit}
            toggle={setCollapseState}
          />
        );
      default:
        return null;
    }
  }

  // Setting the name, associated values, and properties of the table columns
  const columns = [
    {
      dataField: "favorite",
      text: "Favorite?",
      sort: true,
      headerAlign: "center",
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      headerAlign: "center",
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerAlign: "center",
    },
    {
      dataField: "createDate",
      text: "Date Added",
      sort: true,
      headerAlign: "center",
    },
    {
      dataField: "manage",
      text: "Edit / Delete",
      sort: false,
      headerAlign: "center",
    },
  ];

  // Setting the values of the table rows
  const data = [];

  links.map((link) => {
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
      title: (
        <a href={`${link.url}`} target="blank">
          {link.title}{" "}
        </a>
      ),
      createDate: moment(link.createDate).format("llll"),
      manage: (
        <>
          <Button
            className="ml-1"
            outline
            size="sm"
            color="secondary"
            onClick={() => {
              setCollapseState("edit");
              setLinkEdit(link);
            }}
          >
            <FontAwesomeIcon size="sm" icon={faEdit} />
          </Button>
          <Button
            className="ml-1"
            outline
            size="sm"
            color="danger"
            onClick={() => deleteLink(link.id)}
          >
            <FontAwesomeIcon size="sm" icon={faTrash} />
          </Button>
        </>
      ),
    };
    data.push(currentLink);
  });

  return (
    <>
      <Container>
        <span>
          <h1 className="m-3 text-center">My Links</h1>
        </span>

        <Button
          className="m-3"
          color="secondary"
          onClick={() => setCollapseState("add")}
        >
          Add Link
        </Button>
        <Collapse isOpen={collapseState}>
          <ControlCollapse />
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
