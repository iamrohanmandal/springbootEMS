// import React from "react";
import { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // function handleFirstname(e){
  //   setFirstName(e.target.value)
  // }
  // function handleLastName(e){
  //   setLastName(e.target.value)
  // }
  // function handleEmail(e){
  //   setEmail(e.target.value)
  // }

  // const handleFirstname = (e) => setFirstName(e.target.value)
  // const handleLastName = (e) => setLastName(e.target.value)
  // const handleEmail = (e) =>   setEmail(e.target.value)

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    if (validateForm()) {
      e.preventDefault();
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees')
        }).catch(error =>{
          console.error(error);
        })
      }
      else{
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator("/employees");
        }).catch(error =>{
          console.error(error);
        })
      }

      

      
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card clo-md-5">
          {/* <h2 className="text-center">Add Employee</h2> */}
          {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group nb-2">
                <label htmlFor="" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group nb-2">
                <label htmlFor="" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group nb-2">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success mt-3"
                onClick={saveOrUpdateEmployee}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
