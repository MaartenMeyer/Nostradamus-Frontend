import JwtDecode from 'jwt-decode'

export default class User{
  static from (token){
    try {
      let object = JwtDecode(token);
      console.log(object);
      return new User(object);
    } catch(_){
      return null;
    }
  }

  constructor({ user_id}){
    this.id = user_id;
  }

  // constructor({ user_id, userName, accountType}){
  //   this.id = user_id;
  //   this.userName = userName;
  //   this.accountType = accountType;
  // }

  get userId(){
    return this.id;
  }
}