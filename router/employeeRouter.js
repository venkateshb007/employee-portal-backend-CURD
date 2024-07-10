const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

let generateId = () => {
    return uuid.v4();
};

/*
USAGE : GET ALL EMPLOYEES
URL : http://127.0.0.1:5000/employees/
METHOD : GET
FIELDS : NO-FIELDS
*/

router.get("/", (request, response) => {
    fs.readFile(
        path.join(__dirname, "..", "data", "employees.json"),
        "utf-8",
        (err, data) => {
            if (err) throw err;
            let employees = JSON.parse(data);
            response.status(200).json({
                result: employees.length,
                employees: employees,
            });
        }
    );
});

/*
USAGE : GET ALL EMPLOYEES by id
URL : http://127.0.0.1:5000/employees/:id
METHOD : GET
FIELDS : NO-FIELDS
*/

router.get("/:id", (request, response) => {
    let employeeId = parseInt(request.params.id); // Convert the ID to a number
    fs.readFile(
        path.join(__dirname, "..", "data", "employees.json"),
        "utf-8",
        (err, data) => {
            if (err) throw err;
            let employees = JSON.parse(data);
            let selectedEmployee = employees.find(
                (employee) => employee.id === employeeId
            );
            if (selectedEmployee) {
                response.status(200).json(selectedEmployee);
            } else {
                response.status(404).json({
                    error: "Employee not found"
                });
            }
        }
    );
});

/*
USAGE : CREATE AN EMPLOYEES
URL : http://127.0.0.1:5000/employees/
METHOD : Post
FIELDS : NAME , AGE, DESIGNATION ,EMAIL
*/

router.post("/", (request, response) => {
    let newEmployee = {
        id: generateId(),
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        gender: request.body.gender,
        ip_address: request.body.ip_address,
    };
    fs.readFile(
        path.join(__dirname, "..", "data", "employees.json"),
        "utf-8",
        (err, data) => {
            if (err) throw err;
            let employees = JSON.parse(data);
            employees.unshift(newEmployee); // add a new employee to an array
            fs.writeFile(
                path.join(__dirname, "..", "data", "employees.json"),
                JSON.stringify(employees),
                "utf-8",
                (err) => {
                    if (err) throw err;
                    response.status(200).json({
                        result: "employee is created",
                        employee: newEmployee,
                    });
                }
            );
        }
    );
});


/* 

USAGE : Update AN EMPLOYEES
URL : http://127.0.0.1:5000/employees/:id
METHOD : PUT
FIELDS : first_name, last_name, gender, email, ip_address

*/

router.put('/:id', (request, response) => {
    let employeeId = parseInt(request.params.id); // Convert the ID to a number
    let updatedEmployee = {
        id: employeeId,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        gender: request.body.gender,
        ip_address: request.body.ip_address,
        date: new Date(),
    };

    fs.readFile(
        path.join(__dirname, '..', 'data', 'employees.json'),
        'utf-8',
        (err, data) => {
            if (err) throw err;
            let employees = JSON.parse(data);
            let employeeIndex = employees.findIndex(employee => employee.id === employeeId);
            if (employeeIndex !== -1) {
                employees[employeeIndex] = updatedEmployee; // Replace employee at found index

                fs.writeFile(
                    path.join(__dirname, '..', 'data', 'employees.json'),
                    JSON.stringify(employees),
                    'utf-8',
                    (err) => {
                        if (err) throw err;
                        response.status(200).json({
                            result: "Employee is updated",
                            employee: updatedEmployee,
                        });
                    }
                );
            } else {
                response.status(404).json({
                    error: "Employee not found"
                });
            }
        }
    );
});


/* 

USAGE : DELETE AN EMPLOYEES
URL : http://127.0.0.1:5000/employees/:id
METHOD : DELETE
FIELDS : NO-FIELDS

*/


// DELETE endpoint to delete employee by ID
router.delete('/:id', (request, response) => {
    let employeeId = parseInt(request.params.id); // Convert the ID to a number

    fs.readFile(
        path.join(__dirname, '..', 'data', 'employees.json'),
        'utf-8',
        (err, data) => {
            if (err) throw err;
            let employees = JSON.parse(data);
            let employeeIndex = employees.findIndex(employee => employee.id === employeeId);

            if (employeeIndex !== -1) {
                employees.splice(employeeIndex, 1); // Remove the employee at the found index

                fs.writeFile(
                    path.join(__dirname, '..', 'data', 'employees.json'),
                    JSON.stringify(employees),
                    'utf-8',
                    (err) => {
                        if (err) throw err;
                        response.status(200).json({
                            result: "Employee is deleted",
                        });
                    }
                );
            } else {
                response.status(404).json({
                    error: "Employee not found"
                });
            }
        }
    );
});


module.exports = router;