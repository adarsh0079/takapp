import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetchTech from "./hooks/useFetchTech";
import useFetchAuthor from "./hooks/useFetchAuthor";
import NewsCard from "./components/NewsCard";
import { ReactComponent as Loading } from './assets/Loading.svg'
import { ReactComponent as Profile } from './assets/Profile.svg'
const mode = {
  apply: "apply",
  reset: "reset",
};
const viewMode = {
  tech: "tech",
  author: "author",
};
function App() {
  const navigate = useNavigate();


  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);


  const [viewFilerOptions, setViewFilterOptions] = useState(false);
  const [viewSortBy, setViewSortBy] = useState(false);

  const techs = useFetchTech();
  const authors = useFetchAuthor();

  const [filterObj, setFilterObj] = useState({
    searchText: "",
    technologies: [],
    authors: [],
    sortBy: 1,
  });

  const handleChangeText = (e) => {
    setFilterObj((prev) => {
      return { ...prev, searchText: e.target.value };
    });
  };


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


  const [viewmode, setViewMode] = useState(viewMode.tech);
  const [techsFilter, setTechsFilter] = useState([]);
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

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setArticles([])
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
        <div className="flex-container cursor-pointer">
          <div className="px-1  rounded-[100%] bg-blue-100"><Profile /></div>
          <p className=" font-bold text-2xl " onClick={() => navigate("/profile")}>
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
      <div className="h-[700px] overflow-auto">
        {loading && <Loading />}
        {articles?.map((article) => {
          return <NewsCard article={article} />
        })}
      </div>

      <div
        className={`${viewFilerOptions ? "visible" : "hidden"
          } h-[400px] w-[300px] border-2 rounded-3xl p-3 bg-white absolute top-[100px] left-[37.5px]`}
      >
        <div className="h-[35px] flex justify-between">
          <p className="text-[#525298]">Filter By</p>
          <p
            onClick={() => {
              setViewFilterOptions(false);
            }}
            className="cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4099 9.00019L16.7099 2.71019C16.8982 2.52188 17.004 2.26649 17.004 2.00019C17.004 1.73388 16.8982 1.47849 16.7099 1.29019C16.5216 1.10188 16.2662 0.996094 15.9999 0.996094C15.7336 0.996094 15.4782 1.10188 15.2899 1.29019L8.99994 7.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L7.58994 9.00019L1.28994 15.2902C1.19621 15.3831 1.12182 15.4937 1.07105 15.6156C1.02028 15.7375 0.994141 15.8682 0.994141 16.0002C0.994141 16.1322 1.02028 16.2629 1.07105 16.3848C1.12182 16.5066 1.19621 16.6172 1.28994 16.7102C1.3829 16.8039 1.4935 16.8783 1.61536 16.9291C1.73722 16.9798 1.86793 17.006 1.99994 17.006C2.13195 17.006 2.26266 16.9798 2.38452 16.9291C2.50638 16.8783 2.61698 16.8039 2.70994 16.7102L8.99994 10.4102L15.2899 16.7102C15.3829 16.8039 15.4935 16.8783 15.6154 16.9291C15.7372 16.9798 15.8679 17.006 15.9999 17.006C16.132 17.006 16.2627 16.9798 16.3845 16.9291C16.5064 16.8783 16.617 16.8039 16.7099 16.7102C16.8037 16.6172 16.8781 16.5066 16.9288 16.3848C16.9796 16.2629 17.0057 16.1322 17.0057 16.0002C17.0057 15.8682 16.9796 15.7375 16.9288 15.6156C16.8781 15.4937 16.8037 15.3831 16.7099 15.2902L10.4099 9.00019Z" fill="#979797" />
            </svg>

          </p>
        </div>
        <hr />
        <div className="flex h-[350px]">
          <div className="w-[40%] tech-auth">
            <p onClick={() => setViewMode(viewMode.tech)} className={`${viewMode.tech == viewmode ? "font-bold" : ""} cursor-pointer`}>Technology</p>
            <p onClick={() => setViewMode(viewMode.author)} className={`${viewMode.author == viewmode ? "font-bold" : ""} cursor-pointer`}>Author</p>
          </div>

          <div className="w-[60%] tech-auth-menu">
            {viewmode === viewMode.tech && (
              <>
                {techs?.map((tech) => (
                  <div className="chckboxes" key={tech._id}>
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

                <div className="reset-apply-btns">
                  <button className="reset" onClick={() => handleTechFilterObjChange(mode.reset)}>
                    Reset
                  </button>
                  <button className="apply" onClick={() => handleTechFilterObjChange(mode.apply)}>
                    Apply
                  </button>
                </div>
              </>
            )}
            {viewmode === viewMode.author && (
              <>
                {authors?.map((author) => (
                  <div className="chckboxes" key={author._id}>
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

                <div className="reset-apply-btns">
                  <button className="reset" onClick={() => handleAuthorFilterObjChange(mode.reset)}>
                    Reset
                  </button>
                  <button className="apply" onClick={() => handleAuthorFilterObjChange(mode.apply)}>
                    Apply
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>


      <div className={`${viewSortBy ? "visible" : "hidden"} rounded-3xl p-3  w-[300px] border-2 bg-white absolute top-[100px] left-[37.5px]`}>
        <div className="flex mb-[10px]  justify-between ">
          <p className=" sort-by text-2xl">Sort By</p>
          <p className="text-xs my-auto cursor-pointer" onClick={() => setViewSortBy(false)}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4099 9.00019L16.7099 2.71019C16.8982 2.52188 17.004 2.26649 17.004 2.00019C17.004 1.73388 16.8982 1.47849 16.7099 1.29019C16.5216 1.10188 16.2662 0.996094 15.9999 0.996094C15.7336 0.996094 15.4782 1.10188 15.2899 1.29019L8.99994 7.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L7.58994 9.00019L1.28994 15.2902C1.19621 15.3831 1.12182 15.4937 1.07105 15.6156C1.02028 15.7375 0.994141 15.8682 0.994141 16.0002C0.994141 16.1322 1.02028 16.2629 1.07105 16.3848C1.12182 16.5066 1.19621 16.6172 1.28994 16.7102C1.3829 16.8039 1.4935 16.8783 1.61536 16.9291C1.73722 16.9798 1.86793 17.006 1.99994 17.006C2.13195 17.006 2.26266 16.9798 2.38452 16.9291C2.50638 16.8783 2.61698 16.8039 2.70994 16.7102L8.99994 10.4102L15.2899 16.7102C15.3829 16.8039 15.4935 16.8783 15.6154 16.9291C15.7372 16.9798 15.8679 17.006 15.9999 17.006C16.132 17.006 16.2627 16.9798 16.3845 16.9291C16.5064 16.8783 16.617 16.8039 16.7099 16.7102C16.8037 16.6172 16.8781 16.5066 16.9288 16.3848C16.9796 16.2629 17.0057 16.1322 17.0057 16.0002C17.0057 15.8682 16.9796 15.7375 16.9288 15.6156C16.8781 15.4937 16.8037 15.3831 16.7099 15.2902L10.4099 9.00019Z" fill="#979797" />
          </svg>
          </p>
        </div>
        <hr />
        <p className={` sort-by-pop-up rounded-tl-lg rounded-tr-lg rounded-br-lg cursor-pointer p-2 ${filterObj.sortBy === -1 ? "bg-blue-500 !text-white" : ""}`} onClick={() => {
          setFilterObj(prev => {
            console.log(prev)
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
