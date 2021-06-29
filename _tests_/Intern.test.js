const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("getInfo", () => {
    it("should create an intern when passed values", () => {
      let intern = new Intern("Bob", "17","sconwell.dev@gmail.com", "University of Penn");
      expect(intern.getName()).toMatch("Bob");
      expect(intern.getId()).toMatch("17");
      expect(intern.getEmail()).toMatch("sconwell.dev@gmail.com");
      expect(intern.getRole()).toMatch("Intern");
      expect(intern.getSchool()).toMatch("University of Penn");
    });
  });
});
