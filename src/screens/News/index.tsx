import React, { useState, useEffect, FormEvent, useRef } from "react";
import axios from "axios";

const url = "http://hn.algolia.com/api/v1/search?query=";
export const News = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}${query}`, {});
      setResults(res.data.hits);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    getResults();
    focusOnInput();
  };

  const handleClearSearch = () => {
    setQuery("");
    focusOnInput();
  };

  const focusOnInput = () => {
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div>
      <h2>Hook News</h2>
      <form onSubmit={handleSearch}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">search</button>
        <button type="button" onClick={handleClearSearch}>
          clear
        </button>
      </form>
      {loading ? (
        <div>Loading results...</div>
      ) : (
        <ul>
          {results.map((result: any) => (
            <li key={result.objectId}>
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};
