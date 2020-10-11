import luri, { register } from "../../../core/js/lib/luri.js";
import AppContentRoot from "./app-content-root.js";
import Footer from "./footer.js";
import Navbar from "./navbar.js";

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
    // navigate home when mounted
    // console.log("ROOT", this);
    this.navigatex();
  }

  listenersx() {
    return {
      "logged-in": () => this.navigatex(),
      "logged-out": () => this.navigatex(),
      "hash-change": this.navigatex,
    }
  }

  getContentRootElementx() {
    return this.children[1];
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

  navigatex(route = window.location.hash.substring(1)) {
    return super.navigatex(route).then(page => {
      if (page) {
        luri.emit("page-rendered", route, page);
      }

      return page;
    });
  }

  renderx(content) {
    return super.renderx(content).then(content => {
      try {
        this.titlex(content.titlex());
      } catch (e) {
        this.titlex(undefined);
      }
      return content;
    });
  }

  onScroll() {
    luri.emitTo([this.firstChild], "app-scroll", this.scrollTop)
  }

  constructx() {
    return {
      class: "flex flex-col h-full w-full bg-gray-900 text-gray-500 overflow-y-auto overflow-x-hidden",
      html: [
        new Navbar(),
        {
          class: "flex justify-center flex-1 pt-16",
          html: new (this.blankContentx()),
        },
        new Footer()
      ]
    };
  }
}

register(Application);

/**
 * Global navigation event listener
 */
window.onhashchange = function (event) {
  luri.emit("hash-change", window.location.hash.substring(1), event);
}

window.hash = Application.hash;