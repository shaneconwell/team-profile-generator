const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/Employee.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const employeeArray = []
const htmlArray =[]

const starterHTML =`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>My Team</title>
</head>

<body style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
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



const managersQuestions = [
    {
      type: "input",
      message: "Enter the team manager's name:",
      name: "name",
      default: "Tommy",
    },
    {
      type: "input",
      message: "What is the team manager's ID number?",
      name: "id",
      default: "1",
    },
    {
      type: "input",
      message: "What is the team manager’s email address?",
      name: "email",
      default: "manager@penn.com",
    },
    {
        type: "input",
        message: "What is the team managers’s office number?",
        name: "officeNumber",
        default: "215",
    },

];
const engineerQuestions = [
    {
      type: "input",
      message: "Enter the engineer's name:",
      name: "name",
      default: "Phil",
    },
    {
      type: "input",
      message: "What is the engineer's ID number?",
      name: "id",
      default: "2",
    },
    {
      type: "input",
      message: "What is the engineer’s email address?",
      name: "email",
      default: "engineer@penn.com",
    },
    {
        type: "input",
        message: "What is the engineer’s GitHub profile?",
        name: "github",
        default: "shaneconwell",
    },

];

const internQuestions = [
    {
      type: "input",
      message: "Enter the intern's name:",
      name: "name",
      default: "Brandon",
    },
    {
      type: "input",
      message: "What is the interns's ID number?",
      name: "id",
      default: "3",
    },
    {
      type: "input",
      message: "What is the interns’s email address?",
      name: "email",
      default: "intern@penn.com",
    },
    {
        type: "input",
        message: "What school is the intern attending?",
        name: "school",
        default: "University of Penn",
    },

];
const newManager = () => {
    return inquirer.prompt(managersQuestions)
      .then(function ({name,id,email,officeNumber}){
        let newManager = new Manager(name,id,email,officeNumber,);
        employeeArray.push(newManager);
        // console.log(employeeArray);
        doNext();
      });    
}
const newEngineer = () => {
    return inquirer.prompt(engineerQuestions)
      .then(function ({name,id,email,github}){
        let newEngineer = new Engineer(name,id,email,github);
        employeeArray.push(newEngineer);
        // console.log(employeeArray);
        doNext();
      });    
}
const newIntern = () => {
    return inquirer.prompt(internQuestions)
      .then(function ({name,id,email,school}){
        let newIntern = new Intern(name,id,email,school);
        employeeArray.push(newIntern);
        doNext();
      });    
}

function doNext(){
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do next?",
            choices: ["Add an Engineer","Add an Intern","Finish building my team"],
            name: "answer"
            }
        )
    .then(function (data){

        if (data.answer === 'Add an Engineer') {
            newEngineer();
        } 
        else if ( data.answer === 'Add an Intern'){
            newIntern();
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
                                <li class="list-group-item">Email: <a href = "mailto: ${managerEmail}">${managerEmail}</a></li>
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
                                <li class="list-group-item">Email: <a href = "mailto: ${engineerEmail}">${engineerEmail}</a> </li>
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
                                <li class="list-group-item">Email: <a href = "mailto: ${internEmail}">${internEmail}</a></li>
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
    fs.writeFile('./dist/index.html', html, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
}

const starterHTML =`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>My Team</title>
</head>

<body style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
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
newManager();

