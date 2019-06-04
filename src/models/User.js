import JwtDecode from 'jwt-decode'
import VueCookie from 'vue-cookie';

export default class User{
  static from (token){
    try {
      let object = JwtDecode(token);
      VueCookie.set('user-id', object.data.UserId);
      return new User(object.data);
    } catch(_){
      return null;
    }
  }

  constructor({ UserId, UserName}){
    this.id = UserId;
    this.name = UserName;
  }

  get userId(){
    return this.id;
  }

  get userName() {
    return this.name;
  }
}