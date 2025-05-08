import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ListContext } from "../App";

function ListEmp() {
  const { employeeList, setEmployeeList } = useContext(ListContext);

  const navigate = useNavigate();

  function handleView(index) {
    navigate(`/view-emp/${index}`);
  }

  function handleDelete(index) {
    console.log("index: ", index);
    console.log("Employee List: ", employeeList);
    const updatedList = employeeList.filter((emp) => emp?.employeeId !== index);
    console.log("Updated List: ", updatedList);
    setEmployeeList(updatedList);
  }

  function handleEdit(emp, emp_id) {
    console.log("EMpt:", emp);
    navigate("/add-emp", { state: { data: emp, emp_id: emp_id } });
  }

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-12 px-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h4 className="m-0">Employee List</h4>
              <NavLink to="/add-emp" className="btn btn-primary">
                Add Emp
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Sr.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Performance</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeList?.map((emp, index) => {
                    return (
                      <tr key={emp?.employeeId} className="text-center">
                        <td>{index + 1}</td>
                        <td>{emp?.employeeName}</td>
                        <td>{emp?.employeeId}</td>
                        <td>{emp?.employeeEmail}</td>
                        <td>{emp?.employeeDesignation}</td>
                        <td>{emp?.employeePerformance}</td>
                        <td className="text-center">
                          <i
                            className="fa-solid fa-eye pe-2 text-primary"
                            onClick={() => handleView(emp?.employeeId)}
                            style={{ cursor: "pointer" }}
                          ></i>
                          <i
                            className="fa-solid fa-pen-to-square pe-2 text-success"
                            onClick={() => handleEdit(emp, emp?.employeeId)}
                            style={{ cursor: "pointer" }}
                          ></i>
                          <i
                            className="fa-solid fa-trash pe-2 text-danger"
                            onClick={() => handleDelete(emp?.employeeId)}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListEmp;
