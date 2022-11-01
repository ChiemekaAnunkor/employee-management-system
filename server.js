const textArt = require("./assets/textArt.js");
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;

const inquirer = require("inquirer");
console.log(textArt);

const app = express();

//handle express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" hello");
});

//connect to our db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_manager",
});

// Query database

// db.query("SELECT * FROM position", function (err, results) {
//   console.table(results);
// });

// inquirer
//   .prompt([
//     {
//       type: "list",
//       message: " what would you like",
//       name: "choices",
//       choices: [ "department",new inquirer.Separator(), "whatver"],
//     },
//   ])
//   .then();
//instantiate inquirer lopp

inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));

const questions = [
  {
    type: "list",
    name: "choice",
    message: "What would you like todo?",
    choices: [
      "view all department",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "exit",
    ],
  },
  {
    type: "loop",
    name: "department",
    message: "Add another Department?",
    when: (results) => results.choice === "add a department",
    questions: [
      {
        type: "input",
        name: "addDepartment",
        message: "what is the department name",
      },
    ],
  },
  {
    type: "loop",
    name: "role",
    message: "Add another role?",
    when: (results) => results.choice === "add a role",
    questions: [
      {
        type: "input",
        name: "roleTitle",
        message: "what is the title of the  role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "what is the salary of the role? (include decimal)",
      },
      {
        type: "input",
        name: "roleDId",
        message: "what is the department Id? (number only)",
      },
    ],
  },
  {
    type: "loop",
    name: "employee",
    message: "Add another Employee?",
    when: (results) => results.choice === "add an employee",
    questions: [
      {
        type: "input",
        name: "firstName",
        message: "what is the employees first name ",
      },
      {
        type: "input",
        name: "lastName",
        message: "what is the employees last name ",
      },
      {
        type: "input",
        name: "managerId",
        message: "what is the employee managers id ",
      },
      {
        type: "input",
        name: "roleId",
        message: "what is the employee role id ",
      },
    ],
  },
  {
    type: "loop",
    name: "updateEmployee",
    message: "update an Employee?",
    when: (results) => results.choice === "update an employee role",
    questions: [
      {
        type: "input",
        name: "roleId",
        message: "what is the employees role id ",
      },
      {
        type: "input",
        name: "employeeId",
        message: "what is the employees id ",
      },
    ],
  },
];

function getAnswers() {
  return inquirer.prompt(questions).then((answers) => {
    if (answers.choice == "view all department") {
      db.query("SELECT * FROM department", function (err, results) {
        console.log("\n");
        console.table(results);
      });
    } else if (answers.choice == "view all roles") {
      db.query("SELECT * FROM positions", function (err, results) {
        console.log("\n");

        console.table(results);
      });
    } else if (answers.choice == "view all employees") {
      db.query("SELECT * FROM employee", function (err, results) {
        console.log("\n");
        console.table(results);
      });
    } else if (answers.choice == "add a department") {
      console.log("\n");
      const sql = `INSERT INTO department (names)
      VALUES (?)`;
      const result = [answers.department[0].addDepartment];
      db.query(sql, result, function (err, results) {});
      db.query("SELECT * FROM department", function (err, results) {
        console.log("\n");
        console.table(results);
      });
    } else if (answers.choice == "add a role") {
      const result = {
        title: answers.role[0].roleTitle,
        salary: Number(answers.role[0].roleSalary),
        department_id: Math.floor(answers.role[0].roleDId),
      };

      const sql = `INSERT INTO positions SET ?`;
      console.log(result);

      db.query(sql, result, function (err, results) {});

      db.query("SELECT * FROM positions", function (err, results) {
        console.log("\n");
        console.table(results);
      });
    } else if (answers.choice == "add an employee") {
      console.log("\n");
      const sql = `INSERT INTO employee  SET ?`;
      const result = {
        first_name: answers.employee[0].firstName,
        last_name: answers.employee[0].lastName,
        manager_id: answers.employee[0].managerId,
        roles_id: answers.employee[0].roleId,
      };

      console.log(result);
      db.query(sql, result, function (err, results) {});

      db.query("SELECT * FROM employee", function (err, results) {
        console.log("\n");
        console.table(results);
      });
    } else if (answers.choice == "update an employee role") {
      console.log("\n");
      const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
      const result = [
        answers.updateEmployee[0].roleId,
        answers.updateEmployee[0].employeeId,
      ];

      console.log(result);
      db.query(sql, result, function (err, results) {});

      db.query("SELECT * FROM employee", function (err, results) {
        console.log("\n");
        console.table(results);
      });
    }

    if (answers.choice === "exit") {
      console.log(" \npress CTRL + C to exit the terminal \n");

      return answers;
    } else {
      return getAnswers();
    }
  });
}

getAnswers()
  .then()
  .catch((error) => {});

//defualt response for any other request (not found)
app.use((req, res) => {
  res.status(404).end();
});
