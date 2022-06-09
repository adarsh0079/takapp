import { useEffect, useState } from "react";
import axios from "axios";

const useFetchAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let authors = await axios.get("/authors");
      } catch (err) {}
    })();
  });

  return authors;
};
