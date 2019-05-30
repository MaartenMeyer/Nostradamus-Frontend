export default class Company{
    static from (json){
      try {
        let object = json;

        return new Company(object.data);
      } catch(_){
        return null;
      }
    }

    constructor(companyId, branches){
      this.id = companyId;
      this.branches = branches;
    }

    get companyId(){
      return this.id;
    }

    get branches(){
      return this.branches;
    }
  }