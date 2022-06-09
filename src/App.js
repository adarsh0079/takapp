import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetchTech from './hooks/useFetchTech';
const mode = {
  apply: "apply",
  reset: "reset",
};
const viewMode={
  tech:"tech",
  author:"author"
}
function App() {
  const [articles, setArticles] = useState([]);
  const [viewFilerOptions, setViewFilterOptions] = useState(false);
  const [viewSortBy, setViewSortBy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [techsFilter, setTechsFilter] = useState([]);
  const [viewmode,setViewMode]=useState(viewMode.tech)
  const techRef=useRef();
  const techs=useFetchTech();
  const navigate = useNavigate();
  const [filterObj, setFilterObj] = useState({
    searchText: "",
    technology: [],
    author: [],
    sortBy: -1,
  });
  const handleChangeText = (e) => {
    setFilterObj((prev) => {
      return { ...prev, searchText: e.target.value };
    });
  };
  const handleTechFilterObjChange = (mode) => {
    console.log("test",techsFilter)
    if (mode === mode.apply) {
      setFilterObj((prev) => {
        let newArr = { ...prev, technology: techsFilter };
        return newArr;
      });
    } else  {
      console.log("inside")
      setFilterObj((prev) => {
        let newArr = { ...prev, technology: [] };
        return newArr;
      });
      setTechsFilter([])
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
        console.log(filterObj, "filterobj");
        let res = await axios.post("article/get-filtered", filterObj);
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
        <p className="font-bold text-2xl" onClick={() => navigate("/profile")}>
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
          >
            Sort By
          </p>
          <p
            onClick={() => {
              setViewFilterOptions(true);
            }}
          >
            Filter
          </p>
        </div>
      </div>
      <div>
        {console.log(articles)}
        {articles?.map((article) => {
          return (
            <div className="h-[130px]  flex  p-3">
              <img className="w-[40%] block rounded-2xl" src={article.image} />
              <div className="w-[60%]  h-[100%] px-1">
                <div>
                  <p>{article.technology}</p>
                  <p>{} ago</p>
                </div>
                <div>
                  <p>{article.title}</p>
                  <small>by {article.author}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`${
          viewFilerOptions ? "visible" : "hidden"
        } h-[400px] w-[300px] border-2 bg-white absolute top-[100px] left-[37.5px]`}
      >
        <div className="h-[50px]">Filter By</div>
        <div className="flex border-2 h-[350px]">
          <div className="w-[40%]">
            <p onClick={() => setViewMode(viewMode.tech)}>Technology</p>
            <p onClick={() => setViewMode(viewMode.author)}>Author</p>
          </div>

          <div className="w-[60%] border-2">
            {viewmode === viewMode.tech && (
              <>
                <div>
                  <input
                    id="tech"
                    type="checkbox"
                    onChange={handleTechFilterChange}
                    name="Tech"
                  />
                  <label for="tech">Tech</label>
                </div>
                <div>
                  <input
                    id="UI"
                    type="checkbox"
                    onChange={handleTechFilterChange}
                    name="UI"
                  />
                  <label for="UI">UI</label>
                </div>
                <div>
                  <input
                    id="Design"
                    type="checkbox"
                    onChange={handleTechFilterChange}
                    name="Design"
                  />
                  <label for="Design">Design</label>
                </div>
                <div>
                  <input
                    id="AI"
                    type="checkbox"
                    onChange={handleTechFilterChange}
                    name="AI"
                  />
                  <label for="AI">AI</label>
                </div>
                <div>
                  <input
                    id="Marketing"
                    type="checkbox"
                    onChange={handleTechFilterChange}
                    name="Marketing"
                  />
                  <label for="Marketing">Marketing</label>
                </div>
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
            {viewmode === viewMode.author && <>
              
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
