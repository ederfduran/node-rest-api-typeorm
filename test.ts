function BaseEntity(ctr: Function) {
    ctr.prototype.id = Math.random();
    ctr.prototype.created = new Date().toLocaleString("es-ES");
  }

@BaseEntity
class User {
  constructor(public name: string) {}
}

@BaseEntity
class City {
  constructor(public zicode: string) {}
}

let user = new User("dany");
let ny = new City("RD");
//City and User classes has the id and created property ;)
console.log(ny);
console.log(user);