import React, { useState, useEffect } from "react";

function Tool() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    fetch(`https://api.github.com/users/${searchText}/repos`)
      .then((response) => response.json())
      .then((data) => {
        const result = data.filter((item) => {
          return (
            item && item.name && item.name.toLowerCase().includes(searchText)
          );
        });
        setFiltered(result);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (event.target.value === "") {
      setFiltered([]);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Enter a your name"
        />

        {filtered.length > 0 ? (
          <div className="result">
            <ul>
              {filtered.map((item) => (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                  <p>Languages: {item.language}</p>
                  <p>Stars: {item.stargazers_count}</p>
                  <p>Watchers: {item.watchers_count}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Tool;
