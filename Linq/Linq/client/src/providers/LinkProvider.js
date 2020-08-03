import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const LinkContext = React.createContext();

export const LinkProvider = (props) => {
  const [links, setLinks] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const apiUrl = "/api/link";

  const getLinks = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setLinks)
    );
  };

  const getCategoryLinks = (username, categoryName) => {
    return fetch(`${apiUrl}/${username}/${categoryName}`, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    });
  };

  const getCategoryLinksAuth = (username, categoryName) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${username}/${categoryName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error();
        })
    );
  };

  const getLinkById = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );

  const addLink = (link) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(link),
      }).then(getLinks)
    );

  const deleteLink = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getLinks)
    );

  const editLink = (link) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${link.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(link),
      }).then(getLinks)
    );

  return (
    <LinkContext.Provider
      value={{
        links,
        setLinks,
        getLinks,
        getLinkById,
        addLink,
        editLink,
        deleteLink,
        getCategoryLinks,
        getCategoryLinksAuth,
      }}
    >
      {props.children}
    </LinkContext.Provider>
  );
};
