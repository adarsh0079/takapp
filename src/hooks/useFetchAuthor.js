import { useEffect, useState } from "react";
import axios from "axios";

const useFetchAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response
        if (process.env.REACT_APP_NODE_ENV == "prod") {
          response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/authors`)
        } else {
          response = await axios.get("/authors");
          console.log(response)

        }
        setAuthors(response.data.authors)
      } catch (err) { }
    })();
  }, []);

  return authors;
};
export default useFetchAuthor