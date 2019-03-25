'use strict'

var employee = require('../services/employee-services');

exports.employeeGet = function (req, res, next) {
  employee.get(req.headers, req.swagger.params, res);
}

exports.employees = function (req, res, next) {
  employee.mysqlGet(req.headers, req.swagger.params, res);
}

exports.employeePut = function (req, res, next) {
  employee.edit(req.headers, req.body, res);
}

exports.employeePost = function (req, res, next) {
  employee.post(req.headers, req.body, res);
}

exports.employeeDelete = function (req, res, next) {
  employee.delete(req.headers, req.swagger.params, res);
}