import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ListContext } from "../App";

function ViewEmp() {
  const { employeeList, setEmployeeList } = useContext(ListContext);
  const [viewData, setViewData] = useState();
  const { id } = useParams();
  console.log("ID: ", id);

  useEffect(() => {
    if (id) {
      console.log("Empl: ", employeeList);
      const filtered = employeeList?.filter(
        (emp, index) => emp.employeeId === id
      );
      console.log("Filter: ", filtered);
      setViewData(filtered[0]);
    }
  }, [id]);
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-12 px-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h4 className="m-0">Employee View</h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Education</th>
                    <th scope="col">Address</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Joining Date</th>
                    <th scope="col">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td>{viewData?.employeeName}</td>
                    <td>{viewData?.employeeId}</td>
                    <td>{viewData?.employeeDesignation}</td>
                    <td>{viewData?.employeeEmail}</td>
                    <td>{viewData?.employeeEducation}</td>
                    <td>{viewData?.employeeAddress}</td>
                    <td>{viewData?.employeeSalary}</td>
                    <td>{viewData?.employeeJoiningDate}</td>
                    <td>{viewData?.employeeName}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmp;
