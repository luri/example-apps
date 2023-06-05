import luri, { register } from "../../../../core/js/lib/luri.js";
import AppContentRoot from "../app-content-root.js";

export default class Application extends AppContentRoot {

  /**
   * Generates a hash uri
   * 
   * @param {string} path path of resource
   * @param {any} data query
   */
  static hash(path = window.location.hash.substring(1), data = null) {
    if (data) {
      let string = JSON.stringify(data);

      if (!Application.queryStrictJSON && string[0] === '"') {
        string = string.substring(1, string.length - 1);
      }

      return `#${path}:${string}`;
    }

    return "#" + path;
  }

  connectedCallback() {
    // navigate when mounted
    this.onHashChange();
  }
  
  onHashChange() {
    this.navigatex(Application.hash().substring(1));
  }

  getContentRootElementx() {
    return this.children[0];
  }

  loadx(module) {
    return import(module);
  }

  resolvex(path) {
    return "../pages" + path + ".js"
  }

  titlex(title = "Anonymous") {
    document.title = title;
  }

  renderx(content) {
    return super.renderx(content).then(content => {
      try {
        this.titlex(content.titlex());
      } catch (e) {
        this.titlex();
      }
      return content;
    });
  }

  constructx() {
    return {
      class: "flex flex-col h-full w-full bg-gray-900 text-gray-500 overflow-y-auto overflow-x-hidden",
      html: [
        {
          class: "flex justify-center items-center flex-1",
          html: {},
        },
      ]
    };
  }
}

register(Application);

/**
 * Global navigation event listener
 */
window.onhashchange = function (event) {
  luri.emit("HashChange", window.location.hash.substring(1), event);
}

window.hash = Application.hash;