import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse } from "reactstrap";
import { useHistory } from "react-router-dom";
import { LinkContext } from "../../providers/LinkProvider";
import BootstrapTable from "react-bootstrap-table-next";
import NewLinkForm from "./NewLinkForm";
import MissingLinks from "./MissingLinks";

export default function LinkList() {
  const { links, getLinks } = useContext(LinkContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();
  //   const handleLink = () => {history.push(`/userProfiles/list/deactivated`);};

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
    const currentLink = {
      favorite: `${link.isFavorite ? "YES" : "NO"}`,
      category: `${link.category ? link.category.name : "" }`,
      title: link.title,
      url: link.url,
      createDate: link.createDate,
    };
    data.push(currentLink);
  });
  

  return (
    <>
      <div>
        <h2>LINKS GO BRRRRRRRRR</h2>
      </div>
      <section>
        <Button className="m-3" onClick={toggle}>
          Add Link
        </Button>
        <Collapse isOpen={isOpen}>
          <NewLinkForm />
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
      </section>
    </>
  );
}
