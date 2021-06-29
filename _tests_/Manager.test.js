const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("getInfo", () => {
    it("should create an intern when passed values", () => {
      let manager = new Manager("Joe", "1","joe.dev@gmail.com", "215");
      expect(manager.getName()).toMatch("Joe");
      expect(manager.getId()).toMatch("1");
      expect(manager.getEmail()).toMatch("joe.dev@gmail.com");
      expect(manager.getRole()).toMatch("Manager");
      expect(manager.getOfficeNum()).toMatch("215");
    });
  });
});