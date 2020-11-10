import Page from "../../../boiler/js/components/page.js";
import { register } from "../../../core/js/lib/luri.js";

export default class HomePage extends Page {

  titlex() {
    return "Ledger example app";
  }

  contentx(models) {
    return [
      {
        class: "font-bold text-xl",
        html: "Coming soon.."
      }
    ]
  }

  propsx() {
    return {
      class: "flex justify-center items-center",
    }
  }
}

register(HomePage);