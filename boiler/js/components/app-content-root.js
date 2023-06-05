import ContentRoot from "../../../core/js/components/content-root.js";
import { register } from "../../../core/js/lib/luri.js";
import { smoothie } from "../lib/util.js";
import ErrorPage from "./pages/error.js";
import LoaderPage from "./pages/loader.js";

export default class AppContentRoot extends ContentRoot {

  loaderx() {
    return new LoaderPage();
  }

  errorx(thrown) {
    return new ErrorPage(thrown);
  }

  async renderx(content) {
    return smoothie(content, this.getCurrentContentx());
  }

}

register(AppContentRoot);