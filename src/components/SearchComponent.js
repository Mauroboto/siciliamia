import React, { useEffect } from "react";
import { useState } from "react";
import style from "../components/SearchComponent.module.css";

const SearchComponent = () => {
  const [entries, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const URL = "https://api.publicapis.org/entries";

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data.entries);
    console.log(data.entries);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const result = !search
    ? entries
    : entries.filter((dato) =>
        dato.Description.toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    showData();
  }, []);

  

  return (
    <div>
      <table className={style.tabla}>
        <caption>
          <h1>We have everything about APIs</h1>
          <h2>Just take a look by yourself</h2>
        </caption>

        <thead>
          <tr>
            <th>API name</th>
            <th>Link</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {result.map((user) => (
            <tr>
              <td>{user.API}</td>
              <td>{user.Link}</td>
              <td>{user.Description}</td>
              <td>{user.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.div}>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Is this too much information for you?"
        ></input>
      </div>
      <div className={style.rating}>
        <div className={style.rate}></div>
      </div>
    </div>
  );
};

export default SearchComponent;
