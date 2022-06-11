import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetchTech from "./hooks/useFetchTech";
import useFetchAuthor from "./hooks/useFetchAuthor";
import Home from "./page/Home";
import NewsCard from "./components/NewsCard";
import { ReactComponent as Loading } from "./assets/Loading.svg";
// import { ReactComponent as Profile } from "./assets/Profile.svg";
import Message from "./components/Message";
import Profile from "./page/Profile";

function App() {
  const [message, setMessage] = useState({
    text: "",
    statusCode: "",
  });
  return (
    <div className="w-[375px] h-[800px] mx-auto border-2 relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile setMessage={setMessage} />} />
      </Routes>
      <Message message={message} setMessage={setMessage} />
    </div>
  );
}

export default App;
