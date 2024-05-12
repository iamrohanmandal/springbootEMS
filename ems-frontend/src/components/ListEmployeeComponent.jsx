// import { useState } from "react"
import { useState, useEffect } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
const ListEmployeeComponent = () => {
  // const dummyData = [
  //     {
  //         "id": "1",
  //         "firstName": "Sachin",
  //         "lastName": "Tendulkar",
  //         "email": "sachin10@cricket.com"
  //     },
  //     {
  //         "id": "2",
  //         "firstName": "Ms",
  //         "lastName": "Dhoni",
  //         "email": "dhoni7ricket.com"
  //     },
  //     {
  //         "id": "3",
  //         "firstName": "Virat",
  //         "lastName": "Kohli",
  //         "email": "virat18@cricket.com"
  //     },
  // ]

  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees(){
    listEmployees()
    .then((response) => {
      setEmployees(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }
  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }
  function romoveEmployee(id) {
    console.log(id);
    deleteEmployee(id).then((response) => {
getAllEmployees();
    }).catch(error =>{
      console.error(error);
    })
    // navigator(`/delete-employee/${id}`);
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // dummyData.map(employee =>
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    className="btn btn-warning mb-2"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => romoveEmployee(employee.id)}
                    style={{marginLeft: '10px'}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
