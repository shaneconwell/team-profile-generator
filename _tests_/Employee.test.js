const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("getInfo", () => {
    it("should create an employee when passed values", () => {
      let employee = new Employee("Shane", "25", "sconwell.dev@gmail.com");
      expect(employee.getName()).toMatch("Shane");
      expect(employee.getId()).toMatch("25");
      expect(employee.getEmail()).toMatch("sconwell.dev@gmail.com");
      expect(employee.getRole()).toMatch("Employee");
    });
  });
});
