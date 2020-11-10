import Content from "../../../../core/js/components/content.js";
import { register } from "../../../../core/js/lib/luri.js";
import { ListItem } from "../../styles/common.js";
import BlankPage from "../blank.js";

export default class DemosIndex extends Content {

  animinx(prev) {
    return prev instanceof BlankPage ? super.animinx() : "fadeInLeft";
  }

  animoutx() {
    return "fadeOutLeft"
  }

  itemx(word) {
    return A({
      class: `${ListItem} text-left`,
      href: hash("/demos", word.toLowerCase().replace(/\s/g, "-")),
      html: word
    })
  }

  listx(title, words) {
    return {
      class: "text-left mb-4 mx-4 max-w-sm w-full",
      html: [
        {
          class: "px-4 py-2 bg-gray-800",
          html: title,
        },
        {
          class: "mx-6",
          html: words.map(this.itemx)
        }
      ]
    }
  }

  propsx() {
    return Object.assign(super.propsx(), {
      class: "flex-1"
    });
  }

  contentx() {
    return {
      class: "flex-1 justify-center px-4 flex flex-wrap",
      html: [
        ["Input/Output", ["Controls", "Handling Responses", "Modals"]],
        ["Fetching content", ["Pagination", "Infinite scroll"]],
        ["Access Control", ["Arbitrary rules", "Require login"]],
        ["Error handling", ["Default error", "Custom error"]],
        ["Data", ["Binding"]],
        ["Shadow DOM", ["Shadow Component"]],
        ["Example Apps", ["Apps"]]
      ].map(([title, words]) => this.listx(title, words)),
    }
  }
}

register(DemosIndex);