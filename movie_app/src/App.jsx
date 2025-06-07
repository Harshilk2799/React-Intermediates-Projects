import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
