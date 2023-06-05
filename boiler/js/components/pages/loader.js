import { register } from "../../../../core/js/lib/luri.js";
import Page from "../page.js";
import loader from "../../lib/loader.js";

export default class LoaderPage extends Page {
  titlex() {
    return "Loading..";
  }

  ninjax() {
    return true;
  }

  constructx() {
    return {
      class: "flex justify-center items-center my-24",
      html: loader()
    };
  }

}

register(LoaderPage);
