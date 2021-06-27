const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const employeeArray = []

const questions = [
    {
      type: "input",
      message: "What is the employee’s name?",
      name: "name",
      default: "Tommy",
    },
    {
      type: "input",
      message: "What is the employee’s ID number?",
      name: "id",
      default: "3",
    },
    {
      type: "input",
      message: "What is the employee’s email address?",
      name: "email",
      default: "intern@penn.com",
    },
    {
    type: "list",
    message: "Select team member's role",
    choices: ["Engineer","Intern","Manager"],
    name: "role"
    }
];

function newEmployee() {
    return inquirer.prompt(questions)
      .then(function ({name,id,email,role}){
        let newEmployee;
        newEmployee = new Employee(
          name,
          id,
          email,
          role,
        );
        console.log(newEmployee);

        
        if (role === "Manager") {
        //   console.log(role);
            return inquirer.prompt(
                {
                type: "input",
                message: "What is the managers’s office number?",
                name: "officeNumber",
                default: "215",
                }
                )
            .then(function (data){
                let newManager = new Manager(name,id,email,role,data.officeNumber);
                employeeArray.push(newManager);
                // console.log(employeeArray);
                doNext();
            });
            
        } else if (role === "Engineer") {
            
            return inquirer.prompt(
                {
                type: "input",
                message: "What is the engineer’s github username?",
                name: "github",
                default: "shaneconwell",
                }
                )
            .then(function (data){
                let newEngineer = new Engineer(name,id,email,role,data.github);
                employeeArray.push(newEngineer);
                // console.log(employeeArray);
                doNext();
            });
        } else if(role === "Intern") {
            console.log(role);
            return inquirer.prompt(
                {
                type: "input",
                message: "What is the intern's school?",
                name: "school",
                default: "University of Penn",
                }
                )
            .then(function (data){
                let newIntern = new Intern(name,id,email,role,data.school);
                employeeArray.push(newIntern);
                // console.log(employeeArray);
                doNext();
            });
        }


      });
      
  }

function doNext(){
    inquirer.prompt(
        {
        type: "list",
        message: "Would you like to add another employee?",
        name: "answer",
        choices: ['Yes', 'No'],
        }
        )
    .then(function (data){

        if (data.answer === 'Yes') {
            newEmployee();
        } 
        else {
            generateHTML();
        }
})
}
function generateHTML() {
  console.log(employeeArray);
  console.log("HTML");
}

newEmployee();
