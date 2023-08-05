// Importing important packages
const express = require("express");

// Using express and routes
const app = express();
const employeeRoute = express.Router();

// Employee module which is required and imported
let employeeModel = require("../Model/Employee");

// To Get List Of Employees
employeeRoute.route("/").get(function (req, res) {
  employeeModel
    .find()
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      console.log(err);
    });
});

// To Add New Employee
employeeRoute.route("/addEmployee").post(function (req, res) {
  let employee = new employeeModel(req.body);
  employee
    .save()
    .then((game) => {
      res.status(200).json({ employee: "Employee Added Successfully" });
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

// To Get Employee Details By Employee ID
employeeRoute.route("/editEmployee/:id").get(function (req, res) {
  let id = String(req.params.id);

  employeeModel
    .findById(id)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      console.log(err);
    });
});

// To Update The Employee Details
employeeRoute.route("/updateEmployee/:id").post(function (req, res) {
  employeeModel
    .findById(req.params.id)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send("Unable To Find Employee With This Id");
      }
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.email = req.body.email;
      employee.phone = req.body.phone;

      employee
        .save()
        .then((emp) => {
          res.json("Employee Updated Successfully");
        })
        .catch((err) => {
          res.status(400).send("Unable To Update Employee");
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// To Delete The Employee
employeeRoute.route("/deleteEmployee/:id").get(function (req, res) {
  employeeModel
    .findByIdAndRemove({ _id: req.params.id })
    .then((employee) => {
      res.json("Employee Deleted Successfully");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = employeeRoute;
