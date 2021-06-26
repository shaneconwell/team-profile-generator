const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee.js')
const Manager = require('./lib/Manager.js')
const Engineer = require('./lib/Engineer.js')
const Intern = require('./lib/Intern.js')

employeeArray = [];

const managerQuestions = [
  {
    type: "input",
    message: "What is the team manager’s name?",
    name: "managerName",
    default: "Shane"
  },
  {
    type: "input",
    message: "What is the team manager’s ID number?",
    name: "managerId",
    default: "1"
  },
  {
    type: "input",
    message: "What is the team manager’s email address?",
    name: "managerEmail",
    default: "sconwell.dev@gmail.com"
  },
  {
    type: "input",
    message: "What is the team manager’s office number?",
    name: "managerOfficeNum",
    default: "215"
  },
  {
    type: "list",
    message: 'What would you like to do next?',
    choices: ['Add an engineer', 'Add an intern', 'Finish building my team'],
    name: "nextStep",
  },

];
const engineerQuestions = [
    {
        type: "input",
        message: "What is the engineer’s name?",
        name: "engineerName",
        default: "Bob"
      },
      {
        type: "input",
        message: "What is the engineer’s ID number?",
        name: "engineerId",
        default: "2"
      },
      {
        type: "input",
        message: "What is the engineer’s email address?",
        name: "engineerEmail",
        default: "sconwell.dev@gmail.com"
      },
      {
        type: "input",
        message: "What is the engineer’s GitHub username?",
        name: "engineerGithub",
        default: "shaneconwell"
      },
      {
        type: "list",
        message: 'What would you like to do next?',
        choices: ['Add an engineer', 'Add an intern', 'Finish building my team'],
        name: "nextStep",
      },
      
]
const internQuestions = [
    {
        type: "input",
        message: "What is the interns’s name?",
        name: "internName",
        default: "Tommy"
      },
      {
        type: "input",
        message: "What is the intern’s ID number?",
        name: "internId",
        default: "3"
      },
      {
        type: "input",
        message: "What is the intern’s email address?",
        name: "internEmail",
        default: "intern@penn.com"
      },
      {
        type: "input",
        message: "What is the intern’s school name?",
        name: "internSchool",
        default: "University of Penn"
      },
      {
        type: "list",
        message: 'What would you like to do next?',
        choices: ['Add an engineer', 'Add an intern', 'Finish building my team'],
        name: "nextStep",
      },

]
function addTeamMember() {
  return inquirer.prompt(managerQuestions)
  .then (function ({managerName,managerId,managerEmail,managerOfficeNum, nextStep}) {
      let newManager;
      newManager = new Manager(managerName,managerId,managerEmail,managerOfficeNum)
      employeeArray.push(newManager);
      if (nextStep === 'Add an engineer'){
                questionEngineer();
            }else{
                generateHTML();
            }

  })

  // .then ((data) =>{

  //     if (data.nextStep === 'Add an engineer'){
  //         questionEngineer(data);

  //     }else if(data.nextStep === 'Add an intern'){
  //         questionIntern(data);
  //     }else{
  //         generateHTML(data);

  //     }
  // });
}
function questionEngineer(){
    return inquirer.prompt(engineerQuestions)
    .then (function ({engineerName,engineerId,engineerEmail,engineerOfficeNum,nextStep}) {
        let newEngineer;
        newEngineer = new Engineer(engineerName,engineerId,engineerEmail,engineerOfficeNum)
        employeeArray.push(newEngineer);
        if (nextStep === 'Finish building my team'){
            generateHTML();}
    })
};

function questionIntern(){
        return inquirer.prompt(internQuestions)
        .then((data) =>{
            if (data.nextStep === 'Add an engineer'){
                questionEngineer(data);
    
            }else if(data.nextStep === 'Add an intern'){
                questionIntern(data);
            }else{
                generateHTML(data);
                
            }
    
        });
}
function generateHTML() {
    console.log(employeeArray);
console.log("HTML");
}





addTeamMember();