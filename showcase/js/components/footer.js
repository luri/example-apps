import { Component, register } from "../../../core/js/lib/luri.js";

export default class Footer extends Component() {

  ninjax() {
    return true;
  }

  constructx() {
    return {
      class: "py-4 text-center text-gray-600",
      html: [
        "Luri SPA",
        {
          class: "text-sm",
          html: [
            "2020"
          ]
        }
      ]
    }
  }
}

register(Footer);