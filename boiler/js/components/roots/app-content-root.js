import ContentRoot from "../../../../core/js/components/content-root.js";
import { register } from "../../../../core/js/lib/luri.js";
import { smoothie } from "../../lib/util.js";
import ErrorView from "../error.js";
import Loader from "../loader.js";

export default class AppContentRoot extends ContentRoot {

  loaderx() {
    return new Loader;
  }

  errorx(thrown) {
    return new ErrorView(thrown);
  }

  async renderx(content) {
    return smoothie(content, this.getCurrentContentx());
  }

}

register(AppContentRoot);