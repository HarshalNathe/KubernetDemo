'use strict'

var config = require("config");
var Employee = require('../models/employee');

/** Add new employee */

exports.post = function addEmployee(headers, args, res) {

  var newEmployee = new Employee({
    firstName: args.firstName,
    lastName: args.lastName,
    contact: args.contact,
    address: args.address,
    age: args.age,
    isActive: args.isActive
  });

  newEmployee.save(function (error, employee) {
    if (error) {
      res.status(401).json(error);
    }
    return res.json(employee);
  });
};

/** get details of employee through employeeID */

exports.get = function fetchEmployee(headers, args, res) {

  var pageOptions = {
    skip: args.skip.value || 0,
    limit: args.limit.value || 50
  };

  if (pageOptions.limit > 1000) {
    let response = {
      status: 'fail',
      error: {
        category: 'REQUESTED RANGE NOT SATISFIABLE',
        message: 'The requested limit range is not valid it should be less than 1000.'
      }
    }
    return res.status(404).json(response);
  } else {
    Employee.find().skip(pageOptions.skip)
      .limit(pageOptions.limit)
      .sort({
        createdAt: 'desc'
      })
      .exec(function (error, searchedEmployee) {
        if (error) {
          res.status(401).json(error);
        }
        Employee.count({}, function (countErr, count) {
          if (countErr) {
            throw countErr;
          }
          let finalData = [];
          let employee = JSON.stringify(searchedEmployee);
          let employees = JSON.parse(employee);
          employees.forEach(element => {
            delete element.__v;
            finalData.push(element);
          });
          var response = {
            meta: {
              status: 'ok',
              tableTotal: count,
              skip: pageOptions.skip,
              onThisPage: searchedEmployee.length,
              totalPages: Math.ceil(count / pageOptions.limit)
            },
            employee: finalData
          };
          return res.json(response);
        })

      });
  }
};

/** Update specific employee through employeeID */

exports.edit = function modifyEmployee(headers, args, res) {

  var payload = {
    id: args.id,
    firstName: args.firstName,
    lastName: args.lastName,
    contact: args.contact,
    address: args.address
  }
  var options = {
    new: true
  };
  Employee.findByIdAndUpdate({
    _id: payload.id
  }, payload, options, function (err, employee) {
    if (err)
      res.send(err);
    res.json({
      status: 200,
      message: 'Employee updated',
      updatedData: employee
    });
  });
};

/** Delete employee through employeeID */

exports.delete = function deleteEmployeeById(headers, args, res) {

  Employee.remove(args.employeeId.value, function (error, employee) {
    if (error) {
      res.status(401).json(error);
    }
    res.json({
      status: 200,
      message: 'Employee deleted'
    });
  });
};