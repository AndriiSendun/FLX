export class Employee {
  constructor(
    public id: number = new Date().getTime(),
    public firstName: string,
    public lastName: string,
    public age: number,
    public city: string,
    public gender: string,
    public description: string
  ) { }

}
