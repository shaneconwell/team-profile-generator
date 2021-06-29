const index = require("../index");
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email, "Manager");
    this.officeNumber = officeNumber;
  }
  getOfficeNum() {
    return this.officeNumber;
  }
  getRole() {
    return this.role;
  }

}


module.exports = Manager;
