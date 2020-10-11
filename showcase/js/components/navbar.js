import { Component, register } from "../../../core/js/lib/luri.js";
import { swap } from "../../../core/js/lib/util.js";

export default class Navbar extends Component() {

  listenersx() {
    return {
      "app-scroll": this.appscrollx,
      "hash-change": this.highlightx,
      "page-rendered": this.highlightx
    }
  }

  appscrollx(top) {
    swap(this, top, "-translate-y-10 hover:translate-y-0");
  }

  highlightx() {
    for (let a of this.children) {
      swap(a, (window.location.hash || "#/home").indexOf(a.hash) === 0, "text-purple-500", "text-gray-400");
    }
  }

  constructx() {
    return {
      class: "flex justify-center items-center fixed top-0 left-0 w-full transition-transform transform duration-300 z-50",
      html: ["About", "Home", "Demos"].map(word => A({
        class: "text-gray-400 px-6 py-4 bg-gray-900 transition-colors duration-500 font-bold hover:bg-gray-800",
        html: word,
        href: hash(`/${word.toLowerCase()}`)
      }))
    }
  }
}

register(Navbar);