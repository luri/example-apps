
import { register } from "../../../core/js/lib/luri.js";
import apploader from "../components/loader.js";
import Page from "../components/page.js";

export default class LoaderPage extends Page {
  titlex() {
    return "Loading";
  }

  ninjax() {
    return true;
  }

  constructx() {
    return {
      class: "flex justify-center items-center my-24",
      html: apploader()
    };
  }

}

register(LoaderPage);