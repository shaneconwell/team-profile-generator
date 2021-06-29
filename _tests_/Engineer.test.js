const Employee = require("../lib/Employee");
const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("getInfo", () => {
    it("should create an engineer when passed values", () => {
      let employee = new Engineer("Shane", "25", "sconwell.dev@gmail.com","shaneconwell");
      expect(employee.getName()).toMatch("Shane");
      expect(employee.getId()).toMatch("25");
      expect(employee.getEmail()).toMatch("sconwell.dev@gmail.com");
      expect(employee.getRole()).toMatch("Engineer");
      expect(employee.getGithub()).toMatch("shaneconwell");
    });
  });
});
