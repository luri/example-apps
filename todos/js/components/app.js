import Application from "../../../boiler/js/components/app.js";
import { register } from "../../../core/js/lib/luri.js";
import Navbar from "./navbar.js";

export default class TodoApp extends Application {

  getContentRootElementx() {
    return this.getElementsByClassName("app-root")[0];
  }

  loadx(module) {
    return import(module);
  }

  resolvex(path) {
    return "../pages" + path + ".js"
  }

  constructx() {
    return {
      class: "flex flex-col h-full w-full bg-gray-900 text-gray-500 overflow-y-auto overflow-x-hidden",
      html: [
        new Navbar,
        {
          class: "app-root flex justify-center flex-1",
          html: new (this.blankContentx()),
        },
      ]
    };
  }
}

register(TodoApp);