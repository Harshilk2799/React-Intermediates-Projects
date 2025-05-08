import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ListContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

function AddEmp() {
  const { employeeList, setEmployeeList } = useContext(ListContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const { state } = useLocation();
  console.log("State: ", state, "Emp ID: ", state?.emp_id);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    employeeName: "",
    employeeId: "",
    employeeDesignation: "",
    employeeEmail: "",
    employeeEducation: "",
    employeeAddress: "",
    employeeSalary: "",
    employeeJoiningDate: "",
    employeePerformance: "Normal",
  });

  function handleChange(e) {
    // console.log(e.target)
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isUpdate) {
      setEmployeeList([...employeeList, formValue]);
      console.log("Employee Data: ", employeeList);
      setFormValue({
        employeeName: "",
        employeeId: "",
        employeeDesignation: "",
        employeeEmail: "",
        employeeEducation: "",
        employeeAddress: "",
        employeeSalary: "",
        employeeJoiningDate: "",
        employeePerformance: "Normal",
      });
    } else {
      const updating = employeeList?.map((emp) => {
        console.log("EMP: ", emp);
        return emp.employeeId === state?.emp_id
          ? { ...emp, ...formValue }
          : emp;
      });
      console.log("UPdateing: ", updating);
      setEmployeeList(updating);
      setIsUpdate(false);
      navigate("/");
    }
  }

  useEffect(() => {
    if (state?.data) {
      setIsUpdate(true);
      setFormValue({ ...state?.data });
    }
  }, [state?.data]);
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="m-0">Add Employee</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-3">
                    <label htmlFor="employeeName" className="fs-6">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      id="employeeName"
                      value={formValue?.employeeName}
                      onChange={handleChange}
                      placeholder="Employee Name"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeeId" className="fs-6">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      id="employeeId"
                      value={formValue?.employeeId}
                      onChange={handleChange}
                      placeholder="Employee ID"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeeDesignation" className="fs-6">
                      Employee Designation
                    </label>
                    <input
                      type="text"
                      id="employeeDesignation"
                      value={formValue?.employeeDesignation}
                      onChange={handleChange}
                      placeholder="Employee Designation"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeeEmail" className="fs-6">
                      Employee Email
                    </label>
                    <input
                      type="email"
                      id="employeeEmail"
                      value={formValue?.employeeEmail}
                      onChange={handleChange}
                      placeholder="Employee Email"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeeEducation" className="fs-6">
                      Employee Education
                    </label>
                    <input
                      type="text"
                      id="employeeEducation"
                      value={formValue?.employeeEducation}
                      onChange={handleChange}
                      placeholder="Employee Education"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeeAddress" className="fs-6">
                      Employee Address
                    </label>
                    <input
                      type="text"
                      id="employeeAddress"
                      value={formValue?.employeeAddress}
                      onChange={handleChange}
                      placeholder="Employee Address"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeeSalary" className="fs-6">
                      Employee Salary
                    </label>
                    <input
                      type="text"
                      id="employeeSalary"
                      value={formValue?.employeeSalary}
                      onChange={handleChange}
                      placeholder="Employee Salary"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeeJoiningDate" className="fs-6">
                      Employee Joining Date
                    </label>
                    <input
                      type="date"
                      id="employeeJoiningDate"
                      value={formValue?.employeeJoiningDate}
                      onChange={handleChange}
                      placeholder="Employee Joining Date"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="employeePerformance" className="fs-6">
                      Employee Performance
                    </label>
                    <select
                      className="form-control"
                      id="employeePerformance"
                      value={formValue?.employeePerformance}
                      onChange={handleChange}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Average">Average</option>
                      <option value="Excellent">Excellent</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                      {isUpdate ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmp;
