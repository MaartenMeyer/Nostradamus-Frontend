import JwtDecode from 'jwt-decode'

export default class User{
  static from (token){
    try {
      let object = JwtDecode(token);
      return new User(object.data);
    } catch(_){
      return null;
    }
  }

  constructor({ UserId}){
    this.id = UserId;
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