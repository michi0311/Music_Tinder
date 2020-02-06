export class Person {
  name: string;
  mail: string;
  infotext: string;
  password: string;

  constructor(name: string,
              mail: string,
              infotext: string,
              password: string) {
    this.name = name;
    this.infotext = infotext;
    this.mail = mail;
    this.password = password;
  }
}


