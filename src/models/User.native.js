import JwtDecode from 'jwt-decode'

export default class User {
    static from(token) {
        try {
            let object = JwtDecode(token);
            localStorage.userId = object.data.UserId;
            return new User(object.data);
        } catch (_) {
            return null;
        }
    }

    constructor({ UserId }) {
        this.id = UserId;
    }

    // constructor({ UserId, UserName }) {
    //     this.id = UserId;
    //     this.name = UserName;
    // }

    get userId() {
        return this.id;
    }

    // get userName() {
    //     return this.name;
    // }
}