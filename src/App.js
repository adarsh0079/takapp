import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef, Fragment } from "react";
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
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV == "production") {
          var res = await axios.post(`https://takappbackend.herokuapp.com/article/get-filtered`, filterObj)
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
        <div className="flex-container">

          <p className=" font-bold text-2xl cursor-pointer" onClick={() => navigate("/profile")}>

            Hi User
          </p>
        </div>

        <p className="text-2xl">Welcome</p>
      </div>
      <div>
        <div className="search-field">
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="8.80516" cy="8.8055" rx="7.49046" ry="7.49047" stroke="#200E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.0148 14.4043L16.9515 17.3333" stroke="#200E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <input
            className=" input-box border-2 p-2 w-[100%] rounded-2xl"
            placeholder="Search"
            type="text"
            value={filterObj.searchText}
            onChange={handleChangeText}
          />
        </div>

        <div className="flex justify-between ">
          <p
            onClick={() => {
              setViewSortBy(true);
            }}
            className="cursor-pointer sort-filter-by"
          >
            Sort By <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.46386 4.53291L4.42509 2.56311L6.38632 4.53291C6.46594 4.61318 6.56066 4.67689 6.66502 4.72037C6.76939 4.76385 6.88133 4.78624 6.99439 4.78624C7.10745 4.78624 7.21939 4.76385 7.32375 4.72037C7.42812 4.67689 7.52284 4.61318 7.60246 4.53291C7.68273 4.45329 7.74644 4.35857 7.78992 4.2542C7.8334 4.14984 7.85579 4.0379 7.85579 3.92484C7.85579 3.81178 7.8334 3.69984 7.78992 3.59548C7.74644 3.49111 7.68273 3.39639 7.60246 3.31677L5.03316 0.747472C4.95354 0.6672 4.85882 0.603486 4.75445 0.560006C4.65009 0.516526 4.53815 0.494141 4.42509 0.494141C4.31203 0.494141 4.20009 0.516526 4.09572 0.560006C3.99136 0.603486 3.89664 0.6672 3.81702 0.747472L1.24772 3.31677C1.08645 3.47804 0.99585 3.69677 0.99585 3.92484C0.99585 4.15291 1.08645 4.37164 1.24772 4.53291C1.40899 4.69418 1.62772 4.78478 1.85579 4.78478C2.08386 4.78478 2.30259 4.69418 2.46386 4.53291ZM6.38632 8.45537L4.42509 10.4252L2.46386 8.45537C2.384 8.37552 2.2892 8.31218 2.18487 8.26896C2.08054 8.22575 1.96872 8.2035 1.85579 8.2035C1.74286 8.2035 1.63104 8.22575 1.5267 8.26896C1.42237 8.31218 1.32757 8.37552 1.24772 8.45537C1.16787 8.53523 1.10452 8.63002 1.06131 8.73436C1.01809 8.83869 0.99585 8.95051 0.99585 9.06344C0.99585 9.17637 1.01809 9.28819 1.06131 9.39253C1.10452 9.49686 1.16787 9.59166 1.24772 9.67151L3.81702 12.2408C3.89664 12.3211 3.99136 12.3848 4.09572 12.4283C4.20009 12.4718 4.31203 12.4941 4.42509 12.4941C4.53815 12.4941 4.65009 12.4718 4.75445 12.4283C4.85882 12.3848 4.95354 12.3211 5.03316 12.2408L7.60246 9.67151C7.76373 9.51024 7.85432 9.29151 7.85432 9.06344C7.85432 8.83537 7.76373 8.61664 7.60246 8.45537C7.44119 8.2941 7.22246 8.2035 6.99439 8.2035C6.76632 8.2035 6.54759 8.2941 6.38632 8.45537Z" fill="#B3B3B3" />
            </svg>

          </p>
          <p
            onClick={() => {
              setViewFilterOptions(true);
            }}
            className="cursor-pointer sort-filter-by"
          >
            Filter<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9 0H2.1C1.54304 0 1.0089 0.221249 0.615076 0.615076C0.221249 1.0089 1.26615e-07 1.54304 1.26615e-07 2.1V2.919C-0.000100245 3.20806 0.0594764 3.49403 0.175 3.759V3.801C0.273896 4.02568 0.413974 4.22986 0.588 4.403L4.9 8.687V13.3C4.89976 13.419 4.92984 13.536 4.98741 13.6401C5.04497 13.7442 5.12812 13.8319 5.229 13.895C5.3404 13.964 5.46894 14.0004 5.6 14C5.70958 13.9993 5.81747 13.973 5.915 13.923L8.715 12.523C8.83044 12.4648 8.92751 12.3758 8.99547 12.2659C9.06343 12.1559 9.0996 12.0293 9.1 11.9V8.687L13.384 4.403C13.558 4.22986 13.6981 4.02568 13.797 3.801V3.759C13.9222 3.4961 13.9913 3.21004 14 2.919V2.1C14 1.54304 13.7787 1.0089 13.3849 0.615076C12.9911 0.221249 12.4569 0 11.9 0ZM7.903 7.903C7.83812 7.96841 7.78679 8.04598 7.75196 8.13126C7.71712 8.21655 7.69946 8.30787 7.7 8.4V11.466L6.3 12.166V8.4C6.30053 8.30787 6.28287 8.21655 6.24804 8.13126C6.2132 8.04598 6.16187 7.96841 6.097 7.903L2.387 4.2H11.613L7.903 7.903ZM12.6 2.8H1.4V2.1C1.4 1.91435 1.47375 1.7363 1.60502 1.60502C1.7363 1.47375 1.91435 1.4 2.1 1.4H11.9C12.0856 1.4 12.2637 1.47375 12.395 1.60502C12.5262 1.7363 12.6 1.91435 12.6 2.1V2.8Z" fill="#B2B2B2" />
            </svg>

          </p>
        </div>
      </div>
      <div>
        {articles?.map((article) => {
          return (
            <Fragment>
              <div key={article._id} className="h-[130px]  flex  p-3">
                <img className="w-[40%] block rounded-2xl" src={article.image} />
                <div className="w-[60%]  h-[100%] px-1">
                  <div>
                    <div className="flex-container-tech">
                      <p>{article.technology}</p>
                      <svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
                      </svg>

                      <p className="margin-left">{timeAgo(article.updatedAt)} ago</p>
                    </div>
                  </div>
                  <div>
                    <p className="para text-xs">"{article.title}"</p>
                    <small>by <span>{article.author}</span></small>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>



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
                {techs?.map((tech) => (
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
                {authors?.map((author) => (
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
