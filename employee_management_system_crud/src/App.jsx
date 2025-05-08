import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmp from "./components/AddEmp";
import ViewEmp from "./components/ViewEmp";
import ListEmp from "./components/ListEmp";
import { createContext, useState } from "react";

const ListContext = createContext();

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  return (
    <>
      <ListContext.Provider value={{ employeeList, setEmployeeList }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListEmp />} />
            <Route path="/add-emp" element={<AddEmp />} />
            <Route path="/view-emp/:id" element={<ViewEmp />} />
          </Routes>
        </Router>
      </ListContext.Provider>
    </>
  );
}

export { ListContext };
export default App;
