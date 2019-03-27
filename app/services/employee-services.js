'use strict'

var Employee = require('../models/employee');
var mysql = require('mysql');
var faker = require('faker');

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

/** get details of employee from MySQL DB */

/// FYI: use Q npm for getting count

exports.mysqlGet = function mysqlEmpGet(headers, args, res) {
  var pageOptions = {
    skip: args.skip.value || 0,
    limit: args.limit.value || 50
  };

  var pool = mysql.createPool({
    connectionLimit: 10,
    host: '104.197.185.183',
    user: 'node',
    password: 'Lexicon2019!',
    database: 'NodeJS'
  });

  let query = `SELECT * FROM Employee ORDER BY CREATED_AT LIMIT ${pageOptions.limit} OFFSET ${pageOptions.skip};`;
  let countQuery = `SELECT COUNT(*) as counts FROM Employee;`;

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
    pool.query(query, function (error, results, fields) {
      if (error) {
        throw error;
      }
      pool.query(countQuery, function (error, countResults, fields) {
        if (error) {
          throw error;
        }
        var response = {
          meta: {
            status: 'ok',
            tableTotal: countResults[0].counts,
            skip: pageOptions.skip,
            onThisPage: results.length,
            totalPages: Math.ceil(countResults[0].counts / pageOptions.limit)
          },
          employee: results
        };
        return res.json(response);
      });
    });
  }
}

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
        Employee.countDocuments({}, function (countErr, count) {
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

/** Explicitly generating error for failuar */

exports.error = function error(headers, args, res) {
  process.exit(1);
  res.json();
};

/** No I/O calls API for performance testing */

exports.noio = function mysqlEmpGet(headers, args, res) {

  let noIoResponce = [];

  for (let i = 0; i < 100; i++) {
    let employeeFaker = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
      address: faker.address.city(),
      country: faker.address.country(),
      avtar: faker.image.imageUrl()
    };
    noIoResponce.push(employeeFaker);
  }

  res.json(noIoResponce);
}