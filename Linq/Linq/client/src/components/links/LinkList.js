import React, { useContext, useEffect } from "react";
import { ListGroup, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { LinkContext } from "../../providers/LinkProvider";
import Link from "./Link";

export default function LinkList() {
  const { links, getLinks } = useContext(LinkContext);
  const history = useHistory();
  //   const handleLink = () => {history.push(`/userProfiles/list/deactivated`);};

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
        <h2>Links Go Brrrrr</h2>
      </div>
      <section>
        <Button onClick="">ADD LINK</Button>
        <ListGroup horizontal>
          <h5>Favorite</h5>
          <h5>Title</h5>
          <h5>URL</h5>
          <h5>Category</h5>
          <h5>Date Added</h5>
        </ListGroup>
        <ListGroup>
          {links.map((link) => (
            <Link key={link.id} link={link} />
          ))}
        </ListGroup>
      </section>
    </>
  );
}
