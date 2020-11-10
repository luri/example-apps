import Page from "../../../boiler/js/components/page.js";
import { register } from "../../../core/js/lib/luri.js";
import { smoothie } from "../../../core/js/lib/util.js";
import Todo from "../components/todo.js";
import TodoModel from "../models/todo.js";

export default class HomePage extends Page {

  titlex() {
    return "Todos example app";
  }

  listenersx() {
    return {
      "add-todo": this.addTodox
    }
  }

  addTodox(data) {
    data.completed = false;

    let model = new TodoModel(data);
    model.id = Date.now(); // pretty much random

    smoothie(new Todo(model), this.firstChild, this);
  }

  async datax() {
    return TodoModel.all();
  }

  contentx(models) {
    return models.map(model => {
      return new Todo(model);
    })
  }

  propsx() {
    return {
      class: "home-page flex-1 mt-2",
      data: {
        notodos: "No todos, add some!"
      }
    }
  }
}

register(HomePage);