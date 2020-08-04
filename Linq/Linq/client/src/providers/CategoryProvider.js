import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const apiUrl = "/api/category";

  const getCategories = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setCategories)
    );
  };

  const getCategoryById = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );

  const addCategory = (category) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      }).then(getCategories)
    );

  const deleteCategory = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getCategories)
    );

  const editCategory = (category) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${category.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }).then(getCategories)
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        getCategories,
        getCategoryById,
        addCategory,
        editCategory,
        deleteCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
