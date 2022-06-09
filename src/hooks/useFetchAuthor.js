import { useEffect, useState } from "react";
import axios from "axios";

const useFetchAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("/authors");
        console.log(response)
        setAuthors(response.data.authors)
      } catch (err) {}
    })();
  },[]);

  return authors;
};
export default useFetchAuthor