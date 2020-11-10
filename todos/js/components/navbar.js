import { Component, register } from "../../../core/js/lib/luri.js";
import AddTodo from "./add-todo.js";


export default class Navbar extends Component() {
  

  constructx() {
    return {
      id: "navbar",
      class: "text-center bg-indigo-800",
      html: [
        {
          class: "py-8 text-4xl font-bold text-gray-300 opacity-75",
          style: "font-family: sans-serif;",
          html: "Todos example app"
        },
        new AddTodo
      ]
    }
  }
}
register(Navbar);
