const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const Employee = require("./lib/Employee.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

// const writeFileAsync = util.promisify(fs.writeFile);

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
    choices: ["Manager","Engineer","Intern"],
    name: "role"
    }
];

const newEmployee = () => {
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
            const employees = employeeArray
            generateHTML(employees);
        }
})
}
function generateHTML(employees){
    
    for (let i = 0; i < employees.length; i++) {
        const element = employees[i];

        if (element.role === "Manager"){
            const managerName = element.name;
            const managerId = element.id;
            const managerRole = element.role;
            const managerEmail = element.email;
            const managerOfficeNumber = element.officeNumber;
    
            const managerHTML =
                    `<div class="col-4">
                        <div class="card mx-auto mb-5 bg-light "
                            style="width: 18rem; box-shadow: 8px 8px 10px 1px rgba(0, 0, 0, .2);">
                            <h5 class="card-header bg-primary text-white">${managerName}<br /><br />${managerRole}</h5>
                            <ul class="list-group  my-5 mx-3">
                                <li class="list-group-item">ID: ${managerId} </li>
                                <li class="list-group-item">Email Address:<a href = "mailto: ${managerEmail}">${managerEmail}</a></li>
                                <li class="list-group-item">Office Number: ${managerOfficeNumber}</li>
                            </ul>
                        </div>
                    </div>`;
            htmlArray.push(managerHTML);
        }
        if (element.role === "Engineer"){
            const engineerName = element.name;
            const engineerId = element.id;
            const engineerRole = element.role;
            const engineerEmail = element.email;
            const engineerGithub = element.github;
    
            const engineerHTML =
                    `<div class="col-4">
                        <div class="card mx-auto mb-5 bg-light "
                            style="width: 18rem; box-shadow: 8px 8px 10px 1px rgba(0, 0, 0, .2);">
                            <h5 class="card-header bg-primary text-white">${engineerName}<br /><br />${engineerRole}</h5>
                            <ul class="list-group  my-5 mx-3">
                                <li class="list-group-item">ID: ${engineerId} </li>
                                <li class="list-group-item">Email Address:<a href = "mailto: ${engineerEmail}">${engineerEmail}</a> </li>
                                <li class="list-group-item">Github: <a href = "https://www.github.com/${engineerGithub}" target = "_blank"> ${engineerGithub}</a></li>
                            </ul>
                        </div>
                    </div>`;
            htmlArray.push(engineerHTML);
        }
        if (element.role === "Intern"){
            const internName = element.name;
            const internId = element.id;
            const internRole = element.role;
            const internEmail = element.email;
            const internSchool = element.school;
    
            const internHTML =
                    `<div class="col-4">
                        <div class="card mx-auto mb-5 bg-light"
                            style="width: 18rem; box-shadow: 8px 8px 10px 1px rgba(0, 0, 0, .2);">
                            <h5 class="card-header bg-primary text-white">${internName}<br /><br />${internRole}</h5>
                            <ul class="list-group  my-5 mx-3">
                                <li class="list-group-item">ID: ${internId} </li>
                                <li class="list-group-item">Email Address:<a href = "mailto: ${internEmail}">${internEmail}</a></li>
                                <li class="list-group-item">School: ${internSchool}</li>
                            </ul>
                        </div>
                    </div>`;
            htmlArray.push(internHTML);
        }
    }
    htmlArray.push(closingHTML)

    const joinHTML = htmlArray.join(' ');
    const html = joinHTML.toString();
    fs.writeFile('index.html', html, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
}
const htmlArray =[]
const starterHTML =`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>My Team</title>
</head>

<body>
    <div class="jumbotron jumbotron-fluid bg-danger text-white">
        <div class="container">
            <h1 class="display-4 text-center">My Team</h1>
        </div>
    </div>
    <div class="container ">
                <div class="row d-flex justify-content-evenly">`
const closingHTML =`
</div>
</div>
</body>
</html>`
htmlArray.push(starterHTML)

newEmployee();

