import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse } from "reactstrap";
import { useHistory } from "react-router-dom";
import { LinkContext } from "../../providers/LinkProvider";
import BootstrapTable from "react-bootstrap-table-next";
import NewLinkForm from "./NewLinkForm";

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
    },
    {
      dataField: "category",
      text: "Category",
    },
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "url",
      text: "URL",
    },
    {
      dataField: "createDate",
      text: "Date Added",
    },
  ];

  // Setting the values of the table rows
  const data = [];

  links.map((link) => {
    const currentLink = {
      favorite: `${link.isFavorite ? "YES" : "NO"}`,
      category: link.category.name,
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
        <BootstrapTable keyField="id" data={data} columns={columns} />
      </section>
    </>
  );
}
