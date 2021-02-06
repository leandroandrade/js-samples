module.exports = class User {
    constructor({ name, id, profession, age }) {
        this.name = name;
        this.id = parseInt(id, 10);
        this.profession = profession;
        this.birthDay = new Date().getFullYear() - age;
    }
};
