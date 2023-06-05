import BlankContent from "../../../core/js/components/contents/blank.js";
import { register } from "../../../../core/js/lib/luri.js";

export default class BlankPage extends BlankContent {

  titlex() {
    return null;
  }

}

register(BlankPage);