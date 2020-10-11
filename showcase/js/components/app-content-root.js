import ContentRoot from "../../../core/js/components/content-root.js";
import { register } from "../../../core/js/lib/luri.js";
import BlankPage from "../pages/blank.js";
import ErrorPage from "../pages/error.js";
import LoaderPage from "../pages/loader.js";

export default class AppContentRoot extends ContentRoot {

  loaderContentx() {
    return LoaderPage;
  }

  errorContentx() {
    return ErrorPage;
  }

  blankContentx() {
    return BlankPage;
  }
}

register(AppContentRoot);