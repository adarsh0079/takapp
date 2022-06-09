import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetchTech from "./hooks/useFetchTech";
import useFetchAuthor from "./hooks/useFetchAuthor";
const mode = {
  apply: "apply",
  reset: "reset",
};
const viewMode = {
  tech: "tech",
  author: "author",
};
function App() {
  const [articles, setArticles] = useState([]);
  const [viewFilerOptions, setViewFilterOptions] = useState(false);
  const [viewSortBy, setViewSortBy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [techsFilter, setTechsFilter] = useState([]);
  const [viewmode, setViewMode] = useState(viewMode.tech);
  const techs = useFetchTech();

  const authors = useFetchAuthor();
  const [authorFilter, setAuthorFilter] = useState([]);
  const handleAuthorFilterChange = (e) => {
    if (e.target.checked === false) {
      setAuthorFilter((prev) => {
        let newarr = prev.filter((tech) => tech !== e.target.name);
        return newarr;
      });
    } else {
      setAuthorFilter((prev) => {
        let newarr = [...prev, e.target.name];
        return newarr;
      });
    }
  };
  const handleAuthorFilterObjChange = (option) => {
    if (option == mode.apply) {
      console.log("inside ");
      setFilterObj((prev) => {
        let newArr = { ...prev, authors: authorFilter };
        return newArr;
      });
    } else {
      setFilterObj((prev) => {
        let newArr = { ...prev, authors: [] };
        return newArr;
      });
      setAuthorFilter([]);
    }
  };
  const navigate = useNavigate();
  const [filterObj, setFilterObj] = useState({
    searchText: "",
    technologies: [],
    authors: [],
    sortBy: -1,
  });
  const handleChangeText = (e) => {
    setFilterObj((prev) => {
      return { ...prev, searchText: e.target.value };
    });
  };
  const handleTechFilterObjChange = (option) => {
    if (option == mode.apply) {
      console.log("inside ");
      setFilterObj((prev) => {
        let newArr = { ...prev, technologies: techsFilter };
        return newArr;
      });
    } else {
      setFilterObj((prev) => {
        let newArr = { ...prev, technologies: [] };
        return newArr;
      });
      setTechsFilter([]);
    }
  };
  const handleTechFilterChange = (e) => {
    if (e.target.checked === false) {
      setTechsFilter((prev) => {
        let newarr = prev.filter((tech) => tech !== e.target.name);
        return newarr;
      });
    } else {
      setTechsFilter((prev) => {
        let newarr = [...prev, e.target.name];
        return newarr;
      });
    }
  };
  const timeAgo = (timeInPast) => {
    let res = "";
    //converting seconds to days
    let totalseconds = (new Date() - new Date(timeInPast)) / 1000;

    let days = Math.floor(totalseconds / (3600 * 24));
    let hours = Math.floor((totalseconds % (3600 * 24)) / 3600);
    let minutes = Math.floor((totalseconds % 3600) / 60);
    let seconds = Math.floor(totalseconds % 60);
    if (days > 0) {
      res = `${days} d`;
    } else if (hours > 0) {
      res = `${hours} h`;
    } else if (minutes > 0) {
      res = `${minutes} m`;
    } else {
      res = `${seconds} s`;
    }
    return res;
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (process.env.REACT_APP_NODE_ENV == "prod") {
          var res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/article/get-filtered`)
        } else {
          var res = await axios.post("article/get-filtered", filterObj);
        }
        setArticles(res.data.articles);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErr(err.response.msg);
      }
    })();
  }, [filterObj]);

  return (
    <div className="w-[375px] p-3 h-[800px] mx-auto border-2 relative">
      <div className="flex justify-between">
        <p className="font-bold text-2xl cursor-pointer" onClick={() => navigate("/profile")}>
          Hi User
        </p>
        <p className="text-2xl">Welcome</p>
      </div>
      <div>
        <input
          className="border-2 p-2 w-[100%] rounded-2xl"
          placeholder="Search"
          type="text"
          value={filterObj.searchText}
          onChange={handleChangeText}
        />
        <div className="flex justify-between ">
          <p
            onClick={() => {
              setViewSortBy(true);
            }}
            className="cursor-pointer"
          >
            Sort By
          </p>
          <p
            onClick={() => {
              setViewFilterOptions(true);
            }}
            className="cursor-pointer"
          >
            Filter
          </p>
        </div>
      </div>
      <div>
        {articles?.map((article) => {
          return (
            <div key={article._id} className="h-[130px]  flex  p-3">
              <img className="w-[40%] block rounded-2xl" src={article.image} />
              <div className="w-[60%]  h-[100%] px-1">
                <div>
                  <p>{article.technology}</p>
                  <p>{timeAgo(article.updatedAt)} ago</p>
                </div>
                <div>
                  <p className="text-xs">{article.title}</p>
                  <small>by {article.author}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`${viewFilerOptions ? "visible" : "hidden"
          } h-[400px] w-[300px] border-2 rounded-3xl p-3 bg-white absolute top-[100px] left-[37.5px]`}
      >
        <div className="h-[50px] flex justify-between">
          <p>Filter By</p>
          <p
            onClick={() => {
              setViewFilterOptions(false);
            }}
            className="cursor-pointer"
          >
            Close
          </p>
        </div>
        <div className="flex border-2 h-[350px]">
          <div className="w-[40%]">
            <p onClick={() => setViewMode(viewMode.tech)} className={`${viewMode.tech == viewmode ? "font-bold" : ""} cursor-pointer`}>Technology</p>
            <p onClick={() => setViewMode(viewMode.author)} className={`${viewMode.author == viewmode ? "font-bold" : ""} cursor-pointer`}>Author</p>
          </div>

          <div className="w-[60%] border-2">
            {viewmode === viewMode.tech && (
              <>
                {techs.map((tech) => (
                  <div key={tech._id}>
                    <input
                      id={tech.technology}
                      type="checkbox"
                      onChange={handleTechFilterChange}
                      name={tech.technology}
                      checked={techsFilter.includes(tech.technology)}
                    />
                    <label htmlFor={tech.technology}>{tech.technology}</label>
                  </div>
                ))}

                <div>
                  <p onClick={() => handleTechFilterObjChange(mode.reset)}>
                    Reset
                  </p>
                  <p onClick={() => handleTechFilterObjChange(mode.apply)}>
                    Apply
                  </p>
                </div>
              </>
            )}
            {viewmode === viewMode.author && (
              <>
                {authors.map((author) => (
                  <div key={author._id}>
                    <input
                      id={author.author}
                      type="checkbox"
                      onChange={handleAuthorFilterChange}
                      name={author.author}
                      checked={authorFilter.includes(author.author)}
                    />
                    <label for={author.author}>{author.author}</label>
                  </div>
                ))}

                <div>
                  <p onClick={() => handleAuthorFilterObjChange(mode.reset)}>
                    Reset
                  </p>
                  <p onClick={() => handleAuthorFilterObjChange(mode.apply)}>
                    Apply
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>


      <div className={`${viewSortBy ? "visible" : "hidden"} rounded-3xl p-3 h-[100px] w-[300px] border-2 bg-white absolute top-[100px] left-[37.5px]`}>
        <div className="flex  justify-between ">
          <p className="text-2xl">Sort By</p>
          <p className="text-xs my-auto cursor-pointer" onClick={() => setViewSortBy(false)}>close</p>
        </div>
        <hr />
        <p className={`cursor-pointer ${filterObj.sortBy === -1 ? "" : "bg-blue-500 text-white"}`} onClick={() => {
          setFilterObj(prev => {
            if (prev.sortBy === -1) {
              return { ...prev, sortBy: 1 };
            }
            return { ...prev, sortBy: -1 }
          })
        }}  >Most recent</p>
      </div>
    </div>
  );
}

export default App;
