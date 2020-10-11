import ErrorContent from "../../../core/js/components/contents/error.js";
import { register } from "../../../core/js/lib/luri.js";

export default class ErrorPage extends ErrorContent {
  titlex() {
    return "Error";
  }
}
register(ErrorPage);