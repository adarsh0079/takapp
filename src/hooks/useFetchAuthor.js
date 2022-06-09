import { useEffect, useState } from "react";
import axios from "axios";

const useFetchAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response
        if (process.env.NODE_ENV == "production") {
          response = await axios.get(`https://takappbackend.herokuapp.com/authors`)
        } else {
          response = await axios.get("/authors");
        }
        setAuthors(response.data.authors)
      } catch (err) { }
    })();
  }, []);

  return authors;
};
export default useFetchAuthor