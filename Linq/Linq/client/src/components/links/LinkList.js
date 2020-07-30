import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { LinkContext } from "../../providers/LinkProvider";
import Link from "./Link";


import BootstrapTable from "react-bootstrap-table-next";
export default function LinkList() {
  const { links, getLinks } = useContext(LinkContext);

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
  const data = [];

  // Setting the values of the table rows
  links.map((link) => {
    const currentLink = {
      favorite: `${(link.isFavorite) ? "YES" : "NO" }`,
      category: link.category.name,
      title: link.title,
      url: link.url,
      createDate: link.createDate,
    };
    debugger
    data.push(currentLink);
  });

  return (
    <>
      <div>
        <h2>Links Go Brrrrr</h2>
      </div>
      <section>
        <Button className="m-3" onClick="">
          ADD LINK
        </Button>
        <BootstrapTable keyField="id" data={data} columns={columns} />

        {/* <ListGroup horizontal>
          <h5>Favorite</h5>
          <h5>Title</h5>
          <h5>URL</h5>
          <h5>Category</h5>
          <h5>Date Added</h5>
        </ListGroup>
        <ListGroup horizontal>
          {links.map((link) => (
          <Link key={link.id} link={link} columns={columns} />
        ))}
        </ListGroup> */}
      </section>
    </>
  );
}
