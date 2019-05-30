export default class Branch{
  static from (json){
    try {
      let object = json;

      return new Branch(object.data);
    } catch(_){
      return null;
    }
  }

  constructor({ BranchId}){
    this.id = UserId;
  }

  get branchId(){
    return this.id;
  }

  get branchName(){
    return this.branchId;
  }
}