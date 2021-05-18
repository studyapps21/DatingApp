import { User } from './users';

export class Userparams {

  gender: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive'

  constructor(user: User) {
    this.gender = user.gender === 'female' ? 'male' : 'female';
    // this.minAge = 18;
    // this.maxAge = 99;
    // this.pageNumber = 1;
    // this.pageSize = 5;
  }
}
