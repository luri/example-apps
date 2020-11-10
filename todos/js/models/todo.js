import Model from "../../../core/js/lib/model.js";


export default class TodoModel extends Model {

  static all() {
    let keys = [];

    for (let key in localStorage) {
      if (key.indexOf("todo-") === 0) {
        keys.push(key.substring(5));
      }
    }
 
    return keys.sort((a, b) => a < b).map(key => {
      return new this(JSON.parse(localStorage.getItem(`todo-${key}`)))
    });
  }

  set(property, value) {
    let id = this.target.id;
    let rv = super.set(property, value);
    
    this.target.id ? this.persist() : this.destroy(id);

    return rv;
  }

  persist() {
    localStorage.setItem(`todo-${this.target.id}`, JSON.stringify(this.target));

    return this;
  }

  destroy(id) {
    localStorage.removeItem(`todo-${id}`);
  }
}