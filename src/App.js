import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
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
